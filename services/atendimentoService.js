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

// Lista estatísticas de atendimentos
export const listarEstatisticas = async (usuarioId, { inicio, fim }) => {
  if (!usuarioId) throw new Error("Usuário não informado");
  
  console.log("🔍 Buscando atendimentos para usuário:", usuarioId);
  
  // Construir query com filtro de datas
  const query = { 
    usuario: usuarioId,
    fim: { $exists: true } // Apenas atendimentos finalizados
  };
  
  if (inicio && fim) {
    query.inicio = {
      $gte: new Date(inicio),
      $lte: new Date(fim + 'T23:59:59')
    };
  }
  
  const atendimentos = await Atendimento.find(query)
    .populate("usuario", "nome email")
    .populate("cliente", "nome cnpj")
    .sort({ inicio: -1 })
    .limit(50); // Limitar últimos 50 para performance
  
  console.log("📊 Atendimentos encontrados:", atendimentos.length);
  
  // Calcular estatísticas
  const totalAtendimentos = atendimentos.length;
  let totalHoras = 0;
  const clienteCounts = {};
  
  atendimentos.forEach(atendimento => {
    if (atendimento.fim) {
      const duracao = new Date(atendimento.fim) - new Date(atendimento.inicio);
      totalHoras += duracao;
      
      const clienteNome = atendimento.cliente.nome;
      clienteCounts[clienteNome] = (clienteCounts[clienteNome] || 0) + 1;
    }
  });
  
  const mediaHoras = totalAtendimentos > 0 ? totalHoras / totalAtendimentos : 0;
  const clienteFrequente = Object.keys(clienteCounts).reduce((a, b) => 
    clienteCounts[a] > clienteCounts[b] ? a : b, 'Nenhum'
  );
  
  // Preparar dados para o gráfico (agrupar por dia)
  const graficoData = {};
  atendimentos.forEach(atendimento => {
    const data = new Date(atendimento.inicio).toLocaleDateString('pt-BR');
    graficoData[data] = (graficoData[data] || 0) + 1;
  });
  
  const grafico = Object.keys(graficoData).sort().map(data => ({
    data,
    count: graficoData[data]
  }));
  
  // Adicionar duração calculada a cada atendimento
  const atendimentosComDuracao = atendimentos.map(atendimento => ({
    ...atendimento.toObject(),
    duracao: atendimento.fim ? 
      (new Date(atendimento.fim) - new Date(atendimento.inicio)) : 
      null
  }));
  
  return {
    totalAtendimentos,
    totalHoras,
    mediaHoras,
    clienteFrequente,
    grafico,
    atendimentos: atendimentosComDuracao
  };
};
