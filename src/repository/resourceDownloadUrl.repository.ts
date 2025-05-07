import {Repository} from "typeorm";
import AppDataSource from "../config/mysql.config";
import {ResourceDownloadUrl} from "../entity/resourceDownloadUrl.entity";

const resourceDownloadUrlRepo: Repository<ResourceDownloadUrl> = AppDataSource.getRepository(ResourceDownloadUrl);

export const saveResourceDownloadUrl = async (resourceDownloadUrl: ResourceDownloadUrl) => {
    try {
        return (await resourceDownloadUrlRepo.save(resourceDownloadUrl)).id;
    } catch (error) {
        console.error('Failed to save resource download url:', error);
        throw new Error('Failed to save resource download url to database');
    }
};