import { Request } from "express";
import {uploadStream} from "../service/upload.service";
import {registerResourceDownloadUrl} from "../service/resource.service";
import {isValidResourceId} from "../grpc/management.client";

export const uploadResourceControl = async (req: Request, resourceId: number) => {
    const email = req.user;
    if (!email) throw new Error('Invalid user');
    if (!await isValidResourceId(resourceId)) throw new Error('Invalid resource id');
    const directoryName = 'resources';
    const version = 'v1.0.0';
    const key = await uploadStream(req, resourceId, version, directoryName);
    return await registerResourceDownloadUrl(key, resourceId);
};