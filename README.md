### Branches usadas no projeto GestBens
- main
    - Branch principal e estável.
    - Usada para deploy e releases.

- develop
    - Branch de desenvolvimento.
    - Recebe merge das features antes de ir para main.


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
│   │   ├── ConfirmDialog.jsx   # popup de confirmação antes de excluir
│   │   ├── FormularioBem.jsx   # formulário de Bem (usado em Create/Edit)
│   │   ├── FormularioCategoria.jsx
│   │   ├── FormularioLocalidade.jsx
│   │   ├── FormularioManutencao.jsx
│   │   ├── FormularioMovimentacao.jsx
│   │   └── FormularioUsuario.jsx
│   │
│   ├── contexts/
│   │   └── AuthContext.jsx     # contexto de autenticação (login/logout, usuário logado)
│   │
│   ├── layouts/                # layouts para páginas públicas e privadas
│   │   ├── PrivateLayout
│   │   │   ├──PrivateLayout.css
│   │   │   └── PrivateLayout.jsx   # usado em Inicio e CRUDs (com Sidebar)
│   │   └── PublicLayout
│   │       ├──PublicLayout.css
│   │       └── PublicLayout.jsx    # usado em Login e Cadastro
│   │
│   ├── mocks/                  # dados falsos para testes antes do backend
│   │
│   ├── modules/                # CRUD de cada entidade
│   │   ├── Bem/
│   │   │   ├── Create.jsx
│   │   │   ├── Delete.jsx
│   │   │   ├── Edit.jsx
│   │   │   ├── Index.jsx
│   │   │   └── Show.jsx
│   │   ├── CategoriaBem/
│   │   │   ├── Create.jsx
│   │   │   ├── Delete.jsx
│   │   │   ├── Edit.jsx
│   │   │   ├── Index.jsx
│   │   │   └── Show.jsx
│   │   ├── LocalidadeBem/
│   │   │   ├── Create.jsx
│   │   │   ├── Delete.jsx
│   │   │   ├── Edit.jsx
│   │   │   ├── Index.jsx
│   │   │   └── Show.jsx
│   │   ├── ManutencaoBem/
│   │   │   ├── Create.jsx
│   │   │   ├── Delete.jsx
│   │   │   ├── Edit.jsx
│   │   │   ├── Index.jsx
│   │   │   └── Show.jsx
│   │   ├── MovimentacaoBem/
│   │   │   ├── Create.jsx
│   │   │   ├── Delete.jsx
│   │   │   ├── Edit.jsx
│   │   │   ├── Index.jsx
│   │   │   └── Show.jsx
│   │   └── Usuario/
│   │       ├── Create.jsx
│   │       ├── Delete.jsx
│   │       ├── Edit.jsx
│   │       ├── Index.jsx
│   │       └── Show.jsx
│   │
│   ├── pages/                  # páginas principais
│   │   ├── Cadastro
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
│   │   ├── responsividade.css  # media queries e ajustes responsivos
│   │   └── variables.css       # variáveis de cor, fonte, espaçamento
│   │
│   ├── App.jsx                 # componente raiz da aplicação
│   ├── main.css                # estilos principais
│   └── main.jsx                # ponto de entrada do React
│   
│
├── .env
├── .env.example
├── .gitignore                  # arquivos ignorados pelo git
├── eslint.config.js            # regras de lint
├── index.html                  # HTML base do projeto
├── package-lock.json           # lock das dependências
├── package.json                # dependências e scripts
├── README.md                   # documentação do projeto
└── vite.config.js              # configuração do Vite
```

--------------------------------------------------------------

Estrutura modelo para os módulos
```
imports ....

export default function ModuloBase({ titulo, destaque, metricas, atalhos }) {
  return (
    <div className="modulo-page">
      <h1>{titulo}</h1>

      {/* container principal */}
      <div className="conteudo-wrapper">
        {/* Conteúdo principal */}
        <div className="conteudo">
          {/* Card de destaque */}
          <div className="card">
            <div className="card-icon">{destaque.icon}</div>
            <div>
              <h2>{destaque.titulo}</h2>
              <span className="valor">{destaque.valor}</span>
            </div>
          </div>

          {/* Cards de métricas */}
          <div className="cards">
            {metricas.map((m, i) => (
              <div className="card" key={i}>
                <div className="card-icon azul">{m.icon}</div>
                <h3>{m.titulo}</h3>
                <span className="valor">{m.valor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Atalhos */}
        <div className="card atalhos">
          <h2>
            <FaBolt /> Atalhos:
          </h2>
          <div className="atalhos-buttons">
            {atalhos.map((a, i) => (
              <NavLink to={a.link} className="atalho-btn verde" key={i}>
                {a.icon} {a.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```