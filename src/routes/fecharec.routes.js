import { Router } from "express";
import {methods as fecharecController} from "../controllers/fecharec.controller";

const router = Router();

router.get("/", fecharecController.getFechaRec);

export default router;