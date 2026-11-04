### GestBens - Simplificando a gestão patrimonial

## RESUMO

GestBens - é um sistema desenvolvido para auxiliar organizações de pequeno e médio porte no controle e gerenciamento de seus bens patrimoniais. A plataforma centraliza informações sobre ativos da instituição, permitindo o cadastro, acompanhamento e histórico completo de cada bem ao longo de seu ciclo de vida.
O sistema possibilita controlar a localização dos bens, registrar movimentações entre setores, acompanhar manutenções realizadas e gerenciar usuários com diferentes níveis de acesso. Dessa forma, contribui para uma administração patrimonial mais organizada, segura e transparente.

## 2 OBJETIVO
	
O principal objetivo do GestBens é simplificar a gestão patrimonial das organizações, fornecendo uma ferramenta prática para registrar, localizar, monitorar e manter bens de forma eficiente. Com isso, busca-se reduzir perdas de informações, melhorar a rastreabilidade dos ativos e apoiar a tomada de decisões relacionadas ao patrimônio da instituição.

--------------------------------------------------------------

### Estrutura de pastas e arquivos Front-End GestBens
```
gestbens-front/
│
├── informacoes-projeto/        # documentação extra do projeto (diagramas, notas)
│
├── node_modules/               # dependências instaladas pelo npm
│
├── public/                     # pasta pública usada pelo Vite (assets estáticos)
│
├── src/
│   ├── assets/
│   │   └── img/                # imagens e ícones usados no sistema
│   │
│   ├── components/             # componentes reutilizáveis
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.css     # estilos do menu lateral
│   │   │   └── Sidebar.jsx     # menu lateral fixo
│   │   ├── FormularioBem.jsx   # formulário de Bem (usado em Create/Edit)
│   │   ├── FormularioCategoria.jsx
│   │   ├── FormularioLocalidade.jsx
│   │   ├── FormularioManutencao.jsx
│   │   ├── FormularioMovimentacao.jsx
│   │   └── FormularioUsuario.jsx
│   │
│   ├── contexts/
│   │   └── Auth/
│   │       ├── AuthContext.jsx  # Define o contexto de autenticação
│   │       ├── AuthProvider.jsx # Gerencia usuário, token e autenticação
│   │       ├── index.js         # Exporta o provider e o hook
│   │       └── useAuth.jsx      # Hook para acessar a autenticação
│   │
│   ├── layouts/                 # layouts para páginas públicas e privadas
│   │   ├── PrivateLayout
│   │   │   ├── PrivateLayout.css
│   │   │   └── PrivateLayout.jsx   # usado em Inicio e CRUDs (com Sidebar)
│   │   └── PublicLayout
│   │       └── PublicLayout.jsx    # usado em Login e Cadastro
│   │
│   ├── modules/                # CRUD de cada entidade
│   │   ├── Bem/
│   │   │   ├── Create.jsx  # -> usa FormularioBem.jsx
│   │   │   ├── Edit.jsx    # -> usa FormularioBem.jsx
│   │   │   ├── Index.jsx   # mostra a lista de bens de forma paginada
│   │   │   ├── Show.jsx    # mostra os dados de um bem
│   │   │   └── Status.jsx  # Tela para gerenciar bem entre Ativo/Inativo
│   │   ├── CategoriaBem/
│   │   │   ├── Create.jsx
│   │   │   ├── Delete.jsx
│   │   │   ├── Edit.jsx
│   │   │   ├── Index.jsx
│   │   ├── LocalidadeBem/
│   │   │   ├── Create.jsx
│   │   │   ├── Delete.jsx
│   │   │   ├── Edit.jsx
│   │   │   ├── Index.jsx
│   │   │   └── Show.jsx
│   │   ├── ManutencaoBem/
│   │   │   ├── Create.jsx
│   │   │   ├── Edit.jsx
│   │   │   ├── Index.jsx
│   │   │   └── Show.jsx
│   │   ├── MovimentacaoBem/
│   │   │   ├── Create.jsx
│   │   │   ├── Edit.jsx
│   │   │   ├── Index.jsx
│   │   │   └── Show.jsx
│   │   └── Usuario/
│   │       ├── Create.jsx
│   │       ├── Edit.jsx
│   │       ├── Index.jsx
│   │       ├── Show.jsx 
│   │       └── Status.jsx
│   │
│   ├── pages/                  # páginas principais
│   │   ├── Cadastro
│   │   │   ├── Cadastro.css
│   │   │   └── Cadastro.jsx        # tela de cadastro de novos usuários
│   │   ├── Inicio
│   │   │   └── Inicio.jsx          # dashboard com menu lateral + área principal
│   │   └── Login
│   │       ├── Login.css
│   │       └── Login.jsx           # tela de login
│   │
│   ├── routes
│   │   ├── AdminRoute.jsx
│   │   └── Routes.jsx
│   │
│   ├── services/               # integração com backend (API REST)
│   │   ├── api.js              # configuração base (axios/fetch)
│   │   ├── authService.js
│   │   ├── bemService.js
│   │   ├── categoriaService.js
│   │   ├── localidadeService.js
│   │   ├── manutencaoService.js
│   │   ├── movimentacaoService.js
│   │   └── usuarioService.js
│   │
│   ├── styles/
│   │   ├── forms.css           # estilos específicos de formulários
│   │   ├── global.css          # estilos globais
│   │   ├── modules.css         # estilos dos módulos
│   │   ├── responsividade.css  # media queries e ajustes responsivos
│   │   ├── table.css           # estilos das tabelas
│   │   └── variables.css       # variáveis de cor, fonte, espaçamento
│   │
│   ├── App.jsx                 # componente raiz da aplicação
│   ├── main.css                # importa os css gerais
│   └── main.jsx                # ponto de entrada do React   
│
├── .env
├── .env.example
├── .gitignore                  # arquivos ignorados pelo git
├── eslint.config.js            # regras de lint
├── index.html                  # HTML base do projeto
├── package-lock.json           # lock das dependências
├── package.json                # dependências e scripts
├── README.md                   # documentação do projeto
├── vercel.json                 
└── vite.config.js              # configuração do Vite
```

--------------------------------------------------------------
