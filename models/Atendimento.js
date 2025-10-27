import mongoose from "mongoose";

const atendimentoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  inicio: { type: Date, default: Date.now },
  fim: { type: Date },
  observacao: { type: String },
}, { timestamps: true });

export default mongoose.model("Atendimento", atendimentoSchema);
