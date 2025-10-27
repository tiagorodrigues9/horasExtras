import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta";

// Config __dirname no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Registrar usuário
export const register = async ({ nome, email, senha }) => {
  if (!nome || !email || !senha) {
    throw new Error("Todos os campos (nome, email e senha) são obrigatórios");
  }

  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) throw new Error("Email já cadastrado");

  const hashSenha = await bcrypt.hash(senha, 10);
  const usuario = await Usuario.create({ nome, email, senha: hashSenha });
  return usuario;
};

// Login
export const login = async (email, senha) => {
  if (!email || !senha) {
    throw new Error("Email e senha são obrigatórios");
  }

  const usuario = await Usuario.findOne({ email });
  if (!usuario) throw new Error("Usuário não encontrado");

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) throw new Error("Senha inválida");

  const token = jwt.sign(
    { id: usuario._id, nome: usuario.nome, email: usuario.email },
    JWT_SECRET,
    { expiresIn: "8h" }
  );

  return token;
};

// Buscar dados do usuário pelo token
export const getMe = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id).select('-senha');
    
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    return usuario;
  } catch (err) {
    throw new Error("Token inválido");
  }
};

// Atualizar perfil do usuário
export const updateProfile = async (token, { nome, fotoFile }) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const usuario = await Usuario.findById(decoded.id);
    
    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    // Atualizar nome se fornecido
    if (nome) {
      usuario.nome = nome;
    }

    // Atualizar foto se fornecida
    if (fotoFile) {
      usuario.foto = `/uploads/${fotoFile.filename}`;
    }

    await usuario.save();

    // Retornar usuário sem senha
    const { senha: _, ...usuarioSemSenha } = usuario.toObject();
    return usuarioSemSenha;
  } catch (err) {
    throw new Error("Erro ao atualizar perfil: " + err.message);
  }
};
