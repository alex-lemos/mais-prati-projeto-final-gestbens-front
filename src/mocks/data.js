// src/mocks/data.js

export const usuarios = [
  {
    id: 1,
    nome: "Admin",
    email: "admin@gmail.com",
    senha: "123456",
    is_admin: true,
  },
  {
    id: 2,
    nome: "João Silva",
    email: "joao@gmail.com",
    senha: "123456",
    is_admin: false,
  },
];

export const categorias = [
  { id: 1, nome: "Computadores", descricao: "Equipamentos de TI" },
  { id: 2, nome: "Móveis", descricao: "Mesas, cadeiras e armários" },
  { id: 3, nome: "Equipamentos de Rede", descricao: "Switches, roteadores e cabos" },
  { id: 4, nome: "Periféricos", descricao: "Teclados, mouses e impressoras" },
  { id: 5, nome: "Eletrodomésticos", descricao: "Geladeiras, micro-ondas e cafeteiras" },
  { id: 6, nome: "Veículos", descricao: "Carros, motos e utilitários" },
  { id: 7, nome: "Ferramentas", descricao: "Equipamentos de manutenção e reparo" },
  { id: 8, nome: "Infraestrutura TI", descricao: "Racks, servidores e storages" },
  { id: 9, nome: "Equipamentos de Escritório", descricao: "Projetores, telefones e acessórios" },
  { id: 10, nome: "Equipamentos Industriais", descricao: "Máquinas e empilhadeiras" },
];

export const localidades = [
  { id: 1, nome: "Escritório Central", descricao: "Sede administrativa" },
  { id: 2, nome: "Depósito", descricao: "Armazém de bens" },
  { id: 3, nome: "Filial Norte", descricao: "Unidade regional no norte" },
  { id: 4, nome: "Filial Sul", descricao: "Unidade regional no sul" },
  { id: 5, nome: "Centro de Distribuição", descricao: "Logística e expedição" },
  { id: 6, nome: "Oficina de Manutenção", descricao: "Serviços técnicos e reparos" },
  { id: 7, nome: "Laboratório de TI", descricao: "Testes e desenvolvimento tecnológico" },
  { id: 8, nome: "Armazém Industrial", descricao: "Estoque de máquinas e equipamentos" },
  { id: 9, nome: "Showroom", descricao: "Exposição de produtos" },
  { id: 10, nome: "Estacionamento", descricao: "Área de veículos e transporte" },
];

export const movimentacoes = [
  {
    id: 1,
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
    id: 1,
    data_manutencao: "2024-03-12",
    descricao: "Troca de bateria",
    custo: 450.00,
    usuario_id: 2,
    bem_id: 1,
  },
];

export const bens = [
  {
    id: 1,
    nome: "Notebook Dell",
    descricao: "Computador Core i7, 16GB RAM xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    data_compra: "2024-01-15",
    valor_compra: 5500.00,
    status: "Ativo",
    categoria_id: 1,
    localidade_id: 1,
  },
  {
    id: 2,
    nome: "Mesa de Escritório",
    descricao: "Mesa de madeira",
    data_compra: "2023-05-10",
    valor_compra: 800.00,
    status: "Ativo",
    categoria_id: 2,
    localidade_id: 2,
  },
  {
    id: 3,
    nome: "MacBook Pro 14",
    descricao: "M3 Pro, 18GB RAM",
    data_compra: "2024-02-20",
    valor_compra: 12000.00,
    status: "Manutenção",
    categoria_id: 1,
    localidade_id: 10,
  },
  {
    id: 4,
    nome: "Monitor Dell 27",
    descricao: "UltraSharp 4K",
    data_compra: "2024-03-01",
    valor_compra: 2500.00,
    status: "Ativo",
    categoria_id: 1,
    localidade_id: 6,
  },
  {
    id: 5,
    nome: "Servidor PowerEdge",
    descricao: "Dual Xeon, 128GB RAM",
    data_compra: "2023-11-05",
    valor_compra: 45000.00,
    status: "Manutenção",
    categoria_id: 4,
    localidade_id: 5,
  },
  {
    id: 6,
    nome: "Cadeira Herman Miller",
    descricao: "Modelo Aeron",
    data_compra: "2023-07-12",
    valor_compra: 6500.00,
    status: "Ativo",
    categoria_id: 2,
    localidade_id: 3,
  },
  {
    id: 7,
    nome: "Kit Videoconferência Logitech",
    descricao: "Rally Plus 4K",
    data_compra: "2024-04-01",
    valor_compra: 9000.00,
    status: "Ativo",
    categoria_id: 3,
    localidade_id: 8,
  },
  {
    id: 8,
    nome: "Empilhadeira Elétrica",
    descricao: "1.6T Torre Triplex",
    data_compra: "2023-09-20",
    valor_compra: 75000.00,
    status: "Ativo",
    categoria_id: 5,
    localidade_id: 7,
  },
  {
    id: 9,
    nome: "Projetor Epson",
    descricao: "Laser 5000 lumens",
    data_compra: "2023-08-15",
    valor_compra: 12000.00,
    status: "Ativo",
    categoria_id: 3,
    localidade_id: 8,
  },
  {
    id: 10,
    nome: "Rack 42U",
    descricao: "Infraestrutura TI",
    data_compra: "2023-06-10",
    valor_compra: 3000.00,
    status: "Ativo",
    categoria_id: 4,
    localidade_id: 5,
  },
  // bens 11 a 30 gerados automaticamente
  ...Array.from({ length: 20 }, (_, i) => {
    const id = i + 11;
    return {
      id,
      nome: `Bem ${id}`,
      descricao: `Descrição do bem ${id}`,
      data_compra: "2023-01-01",
      valor_compra: 1000.00 + id * 100,
      status: id % 3 === 0 ? "Manutenção" : id % 2 === 0 ? "Inativo" : "Ativo",
      categoria_id: (id % 5) + 1,
      localidade_id: (id % 10) + 1,
    };
  }),
];
