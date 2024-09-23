# CampusCoin React.JS Application

Este é um projeto React desenvolvido para o sistema CampusCoin.

## Instruções

### Executando o Projeto

1. Instale as dependências necessárias com o comando `npm install`.
2. Inicie o servidor de desenvolvimento com o comando `npm run dev`.

- **PORTA do frontend**: 5173
- **PORTA do backend (API)**: 3000

### Adicionar Novo Menu

Para adicionar um novo menu ao projeto:

1. Vá até a pasta principal do projeto e abra o arquivo `menu.js`.
2. Siga o padrão abaixo para adicionar um novo item de menu:

   - `label`: Nome do menu.
   - `path`: Rota para onde o menu irá levar.
   - `icon`: Ícone do menu (opcional, remova essa linha se não quiser usar ícone).

3. Para consultar ícones, acesse o site FontAwesome.

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

- `VITE_API_URL=http://localhost:3000`

### Estrutura do Projeto

- **`src/`**: Contém todos os componentes React, layouts, hooks e páginas.
- **`public/`**: Contém imagens e arquivos estáticos usados na aplicação.
- **`index.html`**: Arquivo principal HTML para a aplicação React.
- **`tailwind.config.js`**: Configurações do Tailwind CSS para o estilo da aplicação.
- **`package.json`**: Gerenciador de dependências e scripts do projeto.

### Scripts

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a build de produção da aplicação.
