import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET

// Registrar usuário
export const register = async ({ nome, email, senha }) => {
  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) throw new Error("Email já cadastrado");

  const usuario = new Usuario({ nome, email, senha });
  await usuario.save();
  return usuario;
};

// Login
export const login = async (email, senha) => {
  const usuario = await Usuario.findOne({ email });
  if (!usuario) throw new Error("Usuário não encontrado");

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) throw new Error("Senha incorreta");

  // ⚡ Gera token JWT com o ID do usuário
  const token = jwt.sign({ id: usuario._id, email: usuario.email }, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

// Retornar dados do usuário logado
export const getMe = async (token) => {
  if (!token) throw new Error("Token não fornecido");

  const decoded = jwt.verify(token, JWT_SECRET);
  const usuario = await Usuario.findById(decoded.id).select("-senha");
  if (!usuario) throw new Error("Usuário não encontrado");

  return usuario;
};

// Atualizar perfil do usuário
export const updateProfile = async (token, { nome, fotoFile }) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  const usuario = await Usuario.findById(decoded.id);
  if (!usuario) throw new Error("Usuário não encontrado");

  if (nome) usuario.nome = nome;
  if (fotoFile) usuario.foto = fotoFile.path; // ajuste conforme o upload que você usa

  await usuario.save();
  return usuario;
};
