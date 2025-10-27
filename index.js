import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
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
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sem origin (mobile apps, Postman, etc)
    if (!origin) return callback(null, true);
    
    // Permitir em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // Em produção, permitir apenas a URL do Render
    const allowedOrigins = process.env.FRONTEND_URL 
      ? [process.env.FRONTEND_URL, 'https://horasextras.onrender.com']
      : ['https://horasextras.onrender.com'];
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Servir arquivos estáticos do frontend buildado em produção
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "frontend/build");
  console.log("📁 Tentando servir arquivos estáticos de:", buildPath);
  
  // Servir arquivos estáticos com configuração explícita
  app.use(express.static(buildPath, {
    setHeaders: (res, filepath) => {
      // Garantir que arquivos JS tenham o content-type correto
      if (filepath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    }
  }));
  
  console.log("✅ Servindo arquivos estáticos de:", buildPath);
} else {
  // Em desenvolvimento, servir arquivos estáticos da pasta public
  app.use(express.static(path.join(__dirname, "public")));
}

// Rotas de API - prefijo /api para evitar conflito com rotas SPA
app.use("/api/auth", authRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/atendimentos", atendimentoRoutes);
app.use("/api/usuarios", usuarioRoutes);

// Em produção, servir o React app para todas as rotas não-API
if (process.env.NODE_ENV === "production") {
  // Função para servir index.html
  const serveIndex = (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
  };
  
  // Serve index.html para rotas específicas da SPA
  app.get('/', serveIndex);
  app.get('/login', serveIndex);
  app.get('/register', serveIndex);
  app.get('/dashboard', serveIndex);
  app.get('/clientes', serveIndex);
  app.get('/perfil', serveIndex);
  
  // Catch-all - serve index.html para qualquer outro GET request
  app.use((req, res) => {
    serveIndex(req, res);
  });
} else {
  // Em desenvolvimento, manter rotas HTML antigas
  app.get("/", (req, res) => res.sendFile(path.join(__dirname, "views", "login.html")));
  app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "views", "login.html")));
  app.get("/cadastrar", (req, res) => res.sendFile(path.join(__dirname, "views", "cadastrarUsuario.html")));
  app.get("/home", (req, res) => res.sendFile(path.join(__dirname, "views", "home.html")));
  app.get("/dashboard", (req, res) => res.sendFile(path.join(__dirname, "views", "dashboard.html")));
  app.get("/cadastrar-cliente", (req, res) => res.sendFile(path.join(__dirname, "views", "cadastrarCliente.html")));
  app.get("/perfil", (req, res) => res.sendFile(path.join(__dirname, "views", "perfil.html")));
}

// Middleware de tratamento de erro (deve vir por último)
app.use(notFound);
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}`);
});
