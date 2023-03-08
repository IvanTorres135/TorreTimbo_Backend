import { Router } from "express";
import {methods as recibodepaController} from "../controllers/recibodepa.controller";

const router = Router();

router.get("/:dpto", recibodepaController.getRecibodepa);

export default router;