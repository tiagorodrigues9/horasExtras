import * as clienteService from "../services/clienteService.js";

// Listar clientes do usuário logado
export const listarClientes = async (req, res) => {
  try {
    const clientes = await clienteService.listarClientes(req.user.id);
    res.json(clientes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar clientes" });
  }
};

// Criar um novo cliente
export const criarCliente = async (req, res) => {
  try {
    const { nome, endereco, cnpj } = req.body;

    if (!nome || !cnpj) {
      return res.status(400).json({ error: "Nome e CNPJ são obrigatórios" });
    }

    const cliente = await clienteService.criarCliente({ nome, endereco, cnpj }, req.user.id);
    res.status(201).json(cliente);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Atualizar um cliente existente
export const atualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, endereco, cnpj } = req.body;

    if (!id) return res.status(400).json({ error: "ID do cliente é obrigatório" });

    const cliente = await clienteService.atualizarCliente(id, req.user.id, { nome, endereco, cnpj });
    res.json(cliente);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
