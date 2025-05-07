import { Request } from "express";
import {registerGameDownloadUrl} from "../service/game.service";
import {uploadStream} from "../service/upload.service";
import {isValidGameId} from "../grpc/management.client";
import {getUserIdByEmail} from "../grpc/auth.client";

export const uploadGameControl = async (req: Request, gameId: number, version: string) => {
    const email = req.user;
    if (!email) throw new Error('Invalid user');
    const userId = getUserIdByEmail(email);
    if (!await isValidGameId(gameId)) throw new Error('Invalid game id');
    const directoryName = 'games';
    const key = await uploadStream(req, gameId, version, directoryName);
    return await registerGameDownloadUrl(key, gameId, version);
};