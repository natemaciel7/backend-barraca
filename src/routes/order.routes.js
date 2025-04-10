import { Router } from "express";
import { criarPedido, listarPedidos } from "../controllers/order.controller.js";
import autenticarToken from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", autenticarToken, criarPedido);
router.get("/", listarPedidos);

export default router;
