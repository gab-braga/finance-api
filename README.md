# Finance API

## Descrição
Esta API de Finanças foi desenvolvida com Node.js e permite o gerenciamento de transações financeiras,
como receitas e despesas. A API suporta operações CRUD (Criar, Ler, Atualizar, Deletar) para transações
e oferece endpoints seguros utilizando autenticação JWT.

## Tecnologias Utilizadas
* Node.js
* Sequelize
* JWT
* Bcrypt
* MySQL

## Endpoints

### Cadastro e Autenticação 
* POST `/auth/signup`
* POST `/auth/signin`

## Gerenciamento de Usuários
* GET `/users`
* GET `/users/:id`
* POST `/users`
* PUT `/users/:id`
* DELETE `/users/:id`

## Gerenciamento de Transações
* GET `/transactions`
* GET `/transactions/:id`
* GET `/transactions/users/:id`
* GET `/transactions/balance/:id`
* POST `/transactions`
* PUT `/transactions/:id`
* DELETE `/transactions/:id`

## Instalação e Configuração
1. Clone o repositório
```
git clone https://github.com/gab-braga/finance-api.git
cd finance-api
```
2. Instale as dependências
```
npm install
```
3. Crie um arquivo .env
```
DB_NAME=""
DB_USER=""
DB_PASSWORD=""
DB_HOST=""
JWT_SECRET=""
JWT_SECRET=""
```
4. Rodar o projeto
```
node src/index.js
```
Acesse http://localhost:3000 no navegador para visualizar a aplicação.
