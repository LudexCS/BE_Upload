import { Request } from "express";
import {uploadStream} from "../service/upload.service";
import {findResourceDownloadUrl, registerResourceDownloadUrl} from "../service/resource.service";
import {isValidResourceId} from "../grpc/management.client";
import {getUserIdByEmail} from "../grpc/auth.client";
import {checkIfTransacted} from "../grpc/purchase_history.client";

export const uploadResourceControl = async (req: Request, resourceId: number) => {
    const email = req.user;
    if (!email) throw new Error('Invalid user');
    if (!await isValidResourceId(resourceId)) throw new Error('Invalid resource id');
    const directoryName = 'resources';
    const version = 'v1.0.0';
    const key = await uploadStream(req, resourceId, version, directoryName);
    return await registerResourceDownloadUrl(key, resourceId);
};

export const getResourceDownloadUrlControl = async (req: Request, resourceId: number) => {
    const email = req.user;
    if (!email) throw new Error('Invalid user');
    const userId = await getUserIdByEmail(email);
    if(! await checkIfTransacted(userId, resourceId)) {
        throw new Error('You have not transacted this resource');
    }
    return await findResourceDownloadUrl(resourceId);
}