import {Router} from "express";
import {getResourceDownloadUrlControl, uploadResourceControl} from "../controller/resource.controller";

const router: Router = Router();

router.post("/upload/:resourceId", async (req, res) => {
    try {
        const resourceId = parseInt(req.params.resourceId, 10);
        if (isNaN(resourceId)) {
            res.status(400).json({ message: "Invalid resourceId" });
            return;
        }

        const id = await uploadResourceControl(req, resourceId);
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
 * /api/protected/resource/download/{resourceId}:
 *   get:
 *     summary: 리소스 다운로드 URL 조회
 *     description: 리소스 ID를 기반으로 presigned 다운로드 URL을 반환합니다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: resourceId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 다운로드할 리소스의 ID
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
 *         description: 잘못된 요청 (예: 잘못된 resourceId)
 *       500:
 *         description: 서버 오류
 */
router.get("/download/:resourceId", async (req, res) => {
    try {
        const resourceId = parseInt(req.params.resourceId, 10);
        if (isNaN(resourceId)) {
            res.status(400).json({ message: "Invalid resourceId" });
            return;
        }

        const url = await getResourceDownloadUrlControl(req, resourceId);
        res.status(200).json({ url });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({message: error.message});
        } else {
            res.status(500).json({message: "Server Error"});
        }
    }
})

export default router;