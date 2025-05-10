import {getGameDownloadUrl, saveGameDownloadUrl} from "../repository/gameDownloadUrl.repository";
import {GameDownloadUrl} from "../entity/gameDownloadUrl.entity";
import {getPresignedUrl} from "./s3.service";

export const registerGameDownloadUrl = async (key: string, gameId: number, version: string) => {
    const entity = new GameDownloadUrl(gameId, key, version);
    return await saveGameDownloadUrl(entity);
}

export const findGameDownloadUrl = async (gameId: number, version: string) => {
    const key = await getGameDownloadUrl(gameId, version);
    if (!key) throw new Error(`Game file not found for gameId=${gameId}, version="${version}"`);
    return await getPresignedUrl(key);
}