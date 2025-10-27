import express from "express";
import * as usuarioController from "../controllers/usuarioController.js";

const router = express.Router();

// Atualizar perfil
router.put("/perfil/:id", usuarioController.atualizarPerfil);

export default router;
