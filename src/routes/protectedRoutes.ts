import { Router } from "express";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { getProtectedData } from "../controller/protectedController";

const router = Router();

router.get("/protected-data", AuthMiddleware, getProtectedData);

export default router;
