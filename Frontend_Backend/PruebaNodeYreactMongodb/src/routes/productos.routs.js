import { Router } from "express";
import { productos } from "../controllers/productos.controller.js";

const router = Router();

router.get('/productos', productos);

export default router 