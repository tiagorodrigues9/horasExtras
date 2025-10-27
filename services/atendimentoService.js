import Atendimento from "../models/Atendimento.js";

// Inicia um atendimento
export const iniciarAtendimento = async (usuarioId, clienteId) => {
  if (!usuarioId || !clienteId) throw new Error("Usuário ou cliente não informado");

  const atendimento = await Atendimento.create({
    usuario: usuarioId,
    cliente: clienteId,
    inicio: new Date()
  });

  return await Atendimento.findById(atendimento._id)
    .populate("usuario", "nome email")
    .populate("cliente", "nome cnpj");
};

// Finaliza um atendimento
export const finalizarAtendimento = async (id, { observacao }) => {
  if (!id) throw new Error("ID do atendimento não informado");

  const atendimento = await Atendimento.findByIdAndUpdate(
    id,
    { 
      fim: new Date(), 
      observacao: observacao || ""
    },
    { new: true }
  ).populate("usuario", "nome email")
   .populate("cliente", "nome cnpj");

  if (!atendimento) throw new Error("Atendimento não encontrado");

  return atendimento;
};

// Lista atendimentos em aberto de um usuário
export const listarAtendimentos = async (usuarioId) => {
  if (!usuarioId) throw new Error("Usuário não informado");
  
  const atendimentos = await Atendimento.find({ 
    usuario: usuarioId,
    fim: { $exists: false } // Apenas atendimentos sem data de fim
  })
    .populate("usuario", "nome email")
    .populate("cliente", "nome cnpj")
    .sort({ inicio: -1 });

  return atendimentos;
};
