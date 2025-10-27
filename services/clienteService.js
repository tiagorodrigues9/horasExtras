import Cliente from "../models/Cliente.js";

// Listar todos os clientes, ordenados por nome
export const listarClientes = async () => {
  const clientes = await Cliente.find().sort({ nome: 1 });
  return clientes;
};

// Criar um novo cliente
export const criarCliente = async ({ nome, endereco, cnpj }) => {
  if (!nome || !cnpj) throw new Error("Nome e CNPJ são obrigatórios");

  const clienteExistente = await Cliente.findOne({ cnpj });
  if (clienteExistente) throw new Error("Cliente já cadastrado");

  const cliente = await Cliente.create({ nome, endereco, cnpj });
  return cliente;
};

// Atualizar cliente existente
export const atualizarCliente = async (id, { nome, endereco, cnpj }) => {
  if (!id) throw new Error("ID do cliente é obrigatório");

  const cliente = await Cliente.findById(id);
  if (!cliente) throw new Error("Cliente não encontrado");

  if (nome) cliente.nome = nome;
  if (endereco) cliente.endereco = endereco;
  if (cnpj) cliente.cnpj = cnpj;

  await cliente.save();
  return cliente;
};
