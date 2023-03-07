import { Router } from "express";
import {methods as deudasController} from "../controllers/deudas.controller";

const router = Router();

router.get("/:ano/:mes", deudasController.getDeudas);

export default router;