import Cliente from "../models/Cliente.js";

// Listar clientes do usuário logado
export const listarClientes = async (usuarioId) => {
  return await Cliente.find({ dono: usuarioId }).sort({ nome: 1 });
};

// Criar cliente associado ao usuário logado
export const criarCliente = async ({ nome, endereco, cnpj }, usuarioId) => {
  if (!nome || !cnpj) throw new Error("Nome e CNPJ são obrigatórios");

  // Verifica se o cliente já existe para esse usuário
  const clienteExistente = await Cliente.findOne({ cnpj, dono: usuarioId });
  if (clienteExistente) throw new Error("Cliente já cadastrado por você");

  const cliente = await Cliente.create({ nome, endereco, cnpj, dono: usuarioId });
  return cliente;
};

// Atualizar cliente, garantindo que pertence ao usuário logado
export const atualizarCliente = async (id, usuarioId, { nome, endereco, cnpj }) => {
  const cliente = await Cliente.findOne({ _id: id, dono: usuarioId });
  if (!cliente) throw new Error("Cliente não encontrado ou você não tem permissão");

  if (nome) cliente.nome = nome;
  if (endereco) cliente.endereco = endereco;
  if (cnpj) cliente.cnpj = cnpj;

  await cliente.save();
  return cliente;
};
