import semver from 'semver';
import {Repository} from "typeorm";
import {GameDownloadUrl} from "../entity/gameDownloadUrl.entity";
import AppDataSource from "../config/mysql.config";

const gameDownloadUrlRepo: Repository<GameDownloadUrl> = AppDataSource.getRepository(GameDownloadUrl);

export const saveGameDownloadUrl = async (gameDownloadUrl: GameDownloadUrl) => {
    try {
        return (await gameDownloadUrlRepo.save(gameDownloadUrl)).id;
    } catch (error) {
        console.error('Failed to save game download url:', error);
        throw new Error('Failed to save game download url to database');
    }
};

export const getGameDownloadUrl = async (gameId: number, version: string) => {
    try {
        if (version === 'latest') {
            const all = await gameDownloadUrlRepo.find({ where: { gameId } });
            const latest = all
                .filter(entry => semver.valid(entry.version))
                .sort((a, b) => semver.rcompare(a.version, b.version))[0];
            if (!latest) throw new Error('No valid semver version found');
            return latest.key;
        } else {
            return (await gameDownloadUrlRepo.findOneOrFail({
                where: { gameId, version },
                select: ['key']
            })).key;
        }
    } catch (error) {
        console.error('Failed to get game download url:', error);
        throw new Error('Failed to get game download url from database');
    }
};