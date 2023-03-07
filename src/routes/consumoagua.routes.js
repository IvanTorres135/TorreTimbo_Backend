import { Router } from "express";
import {methods as consumoaguaController} from "../controllers/consumoagua.controller"; 

const router = Router();

router.get("/:ano/:mes", consumoaguaController.getConsumoAgua);

export default router;