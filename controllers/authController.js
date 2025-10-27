import * as authService from "../services/authService.js";

// Registrar usuário
export const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const usuario = await authService.register({ nome, email, senha });

    // Remove senha do retorno
    const { senha: _, ...usuarioSemSenha } = usuario.toObject();
    res.status(201).json(usuarioSemSenha);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const token = await authService.login(email, senha);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Buscar dados do usuário logado
export const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const usuario = await authService.getMe(token);
    res.json(usuario);
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: err.message });
  }
};

// Atualizar perfil do usuário
export const updateProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const { nome } = req.body;
    const fotoFile = req.file;

    const usuario = await authService.updateProfile(token, { nome, fotoFile });
    res.json(usuario);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};