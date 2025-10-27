import express from "express";
import { iniciarAtendimento, finalizarAtendimento, listarAtendimentos } from "../controllers/atendimentoController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Todas as rotas de atendimento precisam de autenticação
router.use(authenticateToken);

router.post("/iniciar", iniciarAtendimento);
router.put("/finalizar/:id", finalizarAtendimento);
router.get("/", listarAtendimentos);

export default router;
