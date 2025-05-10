import {ResourceDownloadUrl} from "../entity/resourceDownloadUrl.entity";
import {getResourceDownloadUrl, saveResourceDownloadUrl} from "../repository/resourceDownloadUrl.repository";
import {getPresignedUrl} from "./s3.service";

export const registerResourceDownloadUrl = async (key: string, resourceId: number) => {
    const entity = new ResourceDownloadUrl(resourceId, key);
    return await saveResourceDownloadUrl(entity);
}

export const findResourceDownloadUrl = async (resourceId: number) => {
    const key = await getResourceDownloadUrl(resourceId);
    if (!key) {
        throw new Error(`Resource file not found for resourceId=${resourceId}`);
    }
    return await getPresignedUrl(key);
}