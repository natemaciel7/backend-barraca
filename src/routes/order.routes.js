import { Router } from "express";
import { criarPedido, listarPedidos } from "../controllers/order.controller.js";
import autenticarToken from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", criarPedido);
router.get("/", listarPedidos); // para a Jura ver os pedidos no painel
router.post("/", autenticarToken, criarPedido);

export default router;
