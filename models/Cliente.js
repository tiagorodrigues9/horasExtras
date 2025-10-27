import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  endereco: { type: String },
  cnpj: { type: String, required: true, unique: true },
  dono: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true } // ⚡ novo campo
}, { timestamps: true });

export default mongoose.model("Cliente", clienteSchema);
