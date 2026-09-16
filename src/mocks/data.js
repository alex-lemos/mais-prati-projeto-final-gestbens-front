// src/mocks/data.js

export const usuarios = [
  {
    id_usuario: 1,
    nome: "Admin",
    email: "admin@gmail.com",
    senha: "123456",
    is_admin: true,
  },
  {
    id_usuario: 2,
    nome: "João Silva",
    email: "joao@gmail.com",
    senha: "123456",
    is_admin: false,
  },
];

export const categorias = [
  { id_categoria: 1, nome: "Computadores", descricao: "Equipamentos de TI" },
  { id_categoria: 2, nome: "Móveis", descricao: "Mesas, cadeiras e armários" },
];

export const localidades = [
  { id_localidade: 1, nome: "Escritório Central", descricao: "Sede administrativa" },
  { id_localidade: 2, nome: "Depósito", descricao: "Armazém de bens" },
];

export const bens = [
  {
    id_bem: 1,
    nome: "Notebook Dell",
    descricao: "Core i7, 16GB RAM",
    data_compra: "2024-01-15",
    valor_compra: 5500.00,
    status: "ATIVO",
    categoria_id: 1,
    localidade_id: 1,
  },
  {
    id_bem: 2,
    nome: "Mesa de Escritório",
    descricao: "Mesa de madeira",
    data_compra: "2023-05-10",
    valor_compra: 800.00,
    status: "ATIVO",
    categoria_id: 2,
    localidade_id: 2,
  },
];

export const movimentacoes = [
  {
    id_movimentacao: 1,
    data_movimentacao: "2024-02-01",
    observacao: "Transferência para depósito",
    usuario_id: 2,
    bem_id: 1,
    localidade_origem_id: 1,
    localidade_destino_id: 2,
  },
];

export const manutencoes = [
  {
    id_manutencao: 1,
    data_manutencao: "2024-03-12",
    descricao: "Troca de bateria",
    custo: 450.00,
    usuario_id: 2,
    bem_id: 1,
  },
];
