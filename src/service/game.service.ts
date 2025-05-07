import {saveGameDownloadUrl} from "../repository/gameDownloadUrl.repository";
import {GameDownloadUrl} from "../entity/gameDownloadUrl.entity";

export const registerGameDownloadUrl = async (key: string, gameId: number, version: string) => {
    const entity = new GameDownloadUrl(gameId, key, version);
    return await saveGameDownloadUrl(entity);
}