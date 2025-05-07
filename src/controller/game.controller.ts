import { Request } from "express";
import {registerGameDownloadUrl} from "../service/game.service";
import {uploadStream} from "../service/upload.service";
import {isValidGameId} from "../grpc/management.client";

export const uploadGameControl = async (req: Request, gameId: number, version: string) => {
    if (!await isValidGameId(gameId)) throw new Error('Invalid game id');
    const directoryName = 'games';
    const key = await uploadStream(req, gameId, version, directoryName);
    return await registerGameDownloadUrl(key, gameId, version);
};