import { Router } from "express";
import {methods as generaterecController} from "../controllers/generaterec.controller";

const router = Router();

router.post("/", generaterecController.addGenerateRec);

export default router;