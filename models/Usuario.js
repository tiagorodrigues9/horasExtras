import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  foto: { type: String },
}, { timestamps: true });

// Antes de salvar, criptografa a senha
usuarioSchema.pre("save", async function(next) {
  if (!this.isModified("senha")) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

// Método para comparar senha
usuarioSchema.methods.checarSenha = async function(senha) {
  return await bcrypt.compare(senha, this.senha);
};

export default mongoose.model("Usuario", usuarioSchema);
