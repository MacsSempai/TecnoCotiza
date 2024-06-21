import { Router } from "express";
import { productos, productosId } from "../controllers/productos.controller.js";

const router = Router();

router.get('/productos', productos);

router.get(`/productosid/:id`, productosId);

export default router 