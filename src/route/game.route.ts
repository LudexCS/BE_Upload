import {Router} from "express";
import {getGameDownloadUrlControl, uploadGameControl} from "../controller/game.controller";

const router: Router = Router();

router.post("/upload/:gameId", async (req, res) => {
    try {
        const gameId = parseInt(req.params.gameId, 10);
        if (isNaN(gameId)) {
            res.status(400).json({ message: "Invalid gameId" });
            return;
        }

        const version = typeof req.query.version === "string" ? req.query.version : "v1.0.0";

        const id = await uploadGameControl(req, gameId, version);
        res.status(201).json({ id });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Server Error" });
        }
    }
});

/**
 * @swagger
 * /api/protected/game/download/{gameId}:
 *   get:
 *     summary: 게임 다운로드 URL 조회
 *     description: 게임 ID와 버전을 기반으로 presigned 다운로드 URL을 반환합니다. version이 없으면 latest로 간주합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 다운로드할 게임의 ID
 *       - in: query
 *         name: version
 *         required: false
 *         schema:
 *           type: string
 *         description: 요청할 게임의 버전. 생략 시 최신 버전
 *     responses:
 *       200:
 *         description: Presigned 다운로드 URL 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *       400:
 *         description: 잘못된 요청 (예: 잘못된 gameId)
 *       500:
 *         description: 서버 오류
 */
router.get("/download/:gameId", async (req, res) => {
    try {
        const gameId = parseInt(req.params.gameId, 10);
        if (isNaN(gameId)) {
            res.status(400).json({ message: "Invalid gameId" });
            return;
        }

        const version = typeof req.query.version === "string" ? req.query.version : "latest";

        const url = await getGameDownloadUrlControl(req, gameId, version);
        res.status(200).json({ url });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Server Error" });
        }
    }
})

export default router;