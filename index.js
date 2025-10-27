import express from "express";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js"; 
import usuarioRoutes from "./routes/usuariosRoutes.js";
import atendimentoRoutes from "./routes/atendimentoRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// Config __dirname no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar app e conectar ao MongoDB
const app = express();
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // CSS, JS, imagens

// Rotas de API
app.use("/auth", authRoutes);
app.use("/clientes", clienteRoutes);
app.use("/atendimentos", atendimentoRoutes);

// Rotas de front-end (HTML)
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "views", "login.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "views", "login.html")));
app.get("/cadastrar", (req, res) => res.sendFile(path.join(__dirname, "views", "cadastrarUsuario.html")));
app.get("/home", (req, res) => res.sendFile(path.join(__dirname, "views", "home.html")));
app.get("/dashboard", (req, res) => res.sendFile(path.join(__dirname, "views", "dashboard.html")));
app.get("/cadastrar-cliente", (req, res) => res.sendFile(path.join(__dirname, "views", "cadastrarCliente.html")));
app.get("/perfil", (req, res) => res.sendFile(path.join(__dirname, "views", "perfil.html")));
app.use("/usuarios", usuarioRoutes);

// Middleware de tratamento de erro (deve vir por último)
app.use(notFound);
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}`);
});
