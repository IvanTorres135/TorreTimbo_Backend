import { Router } from "express";
import {methods as datauserController} from "../controllers/datauser.controller";

const router = Router();

router.get("/:dpto", datauserController.getDatauser);

export default router;