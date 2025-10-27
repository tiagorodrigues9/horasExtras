import * as atendimentoService from "../services/atendimentoService.js";

// Inicia um atendimento
export const iniciarAtendimento = async (req, res) => {
  try {
    const { clienteId } = req.body;
    const usuarioId = req.usuario.id; // vem do middleware de auth

    if (!clienteId) return res.status(400).json({ error: "Cliente não informado" });

    const atendimento = await atendimentoService.iniciarAtendimento(usuarioId, clienteId);
    res.status(201).json(atendimento);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Finaliza um atendimento
export const finalizarAtendimento = async (req, res) => {
  try {
    const { id } = req.params;
    const { observacao, duracao } = req.body;

    if (!id) return res.status(400).json({ error: "ID do atendimento não informado" });

    const atendimento = await atendimentoService.finalizarAtendimento(id, { observacao, duracao });
    res.json(atendimento);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Lista todos os atendimentos do usuário logado
export const listarAtendimentos = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const atendimentos = await atendimentoService.listarAtendimentos(usuarioId);
    res.json(atendimentos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const listarEstatisticas = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    console.log("Dashboard - Usuario ID:", usuarioId);
    const { inicio, fim } = req.query;
    const estatisticas = await atendimentoService.listarEstatisticas(usuarioId, { inicio, fim });
    res.json(estatisticas);
  } catch (err) {
    console.error("Erro ao listar estatísticas:", err);
    res.status(500).json({ error: err.message });
  }
};