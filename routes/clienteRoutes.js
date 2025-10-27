import express from "express";
import { listarClientes, criarCliente } from "../controllers/clienteController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Todas as rotas de cliente precisam de autenticação
router.use(authenticateToken);

router.get("/", listarClientes);   // Listar clientes
router.post("/", criarCliente);    // Criar cliente

export default router;
