import { Request } from "express";
import {findGameDownloadUrl, registerGameDownloadUrl} from "../service/game.service";
import {uploadStream} from "../service/upload.service";
import {isValidGameId} from "../grpc/management.client";
import {getUserIdByEmail} from "../grpc/auth.client";
import {checkIfPurchased} from "../grpc/purchase_history.client";

export const uploadGameControl = async (req: Request, gameId: number, version: string) => {
    const email = req.user;
    if (!email) throw new Error('Invalid user');
    const userId = await getUserIdByEmail(email);
    // userId도 추가해 해당 게임의 판매자가 맞는지 검증 코드 추가 예정
    if (!await isValidGameId(gameId)) throw new Error('Invalid game id');
    const directoryName = 'games';
    const key = await uploadStream(req, gameId, version, directoryName);
    return await registerGameDownloadUrl(key, gameId, version);
};

export const getGameDownloadUrlControl = async (req: Request, gameId: number, version: string) => {
    const email = req.user;
    if (!email) throw new Error('Invalid user');
    const userId = await getUserIdByEmail(email);
    if(! await checkIfPurchased(userId, gameId)) {
        throw new Error('You have not purchased this game');
    }
    return await findGameDownloadUrl(gameId, version);
}