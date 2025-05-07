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