import { Request } from "express";
import {registerGameDownloadUrl, uploadGameStream} from "../service/game.service";

export const uploadGameControl = async (req: Request, gameId: number, version: string) => {
    const key = await uploadGameStream(req, gameId, version);
    return await registerGameDownloadUrl(key, gameId, version);
};