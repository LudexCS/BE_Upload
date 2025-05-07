import {Router} from "express";
import {uploadGameControl} from "../controller/game.controller";

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

export default router;