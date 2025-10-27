import express from "express";
import { listarClientes, criarCliente } from "../controllers/clienteController.js";

const router = express.Router();

router.get("/", listarClientes);   // Listar clientes
router.post("/", criarCliente);    // Criar cliente

export default router;
