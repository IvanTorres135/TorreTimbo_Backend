import { Router } from "express";
import {methods as multasController} from "../controllers/multas.controller";

const router = Router();

router.get("/:ano/:mes", multasController.getMultas);

export default router;