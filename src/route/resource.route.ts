import {Router} from "express";
import {uploadResourceControl} from "../controller/resource.controller";

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

export default router;