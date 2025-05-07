import {ResourceDownloadUrl} from "../entity/resourceDownloadUrl.entity";
import {saveResourceDownloadUrl} from "../repository/resourceDownloadUrl.repository";

export const registerResourceDownloadUrl = async (key: string, resourceId: number) => {
    const entity = new ResourceDownloadUrl(resourceId, key);
    return await saveResourceDownloadUrl(entity);
}