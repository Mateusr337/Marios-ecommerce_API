# Marios-ecommerce_API

## :link: Sobre

Uma API para funcionarios de um e-commerce, podendo gerenciais podrutos, compras, vendas, estoque e funcionarios. O acesso as funções tem segurança de usuários e algumas funções são permitidas apenas a alguns funcionários;

## :hammer: Features

# Usuários - auth: manager e HR

:ballot_box_with_check: `POST /users` Cadastra usuarios, recebe name, email, password, key, active (opcional), authorizationKey;

:ballot_box_with_check: `GET /users` Busca usuários;


# Autenticação

:ballot_box_with_check: `POST /login` Valida a autenticação de um usuário, recebe email, password.


# Produtos - auth: manager and stock

:ballot_box_with_check: `POST /product` Cria um produto, recebe name, value, type, quantity.

:ballot_box_with_check: `GET /products` Retorna os produtos, recebe filtro "query param":name. 

:ballot_box_with_check: `GET /products/:id` Retorna o produto pelo id.

:ballot_box_with_check: `PATCH /product` Atualisa um produto, recebe name, value, type, quantity.

:ballot_box_with_check: `DELETE /products/:id` Deleta o produto pelo id.


# Orders - auth: manager and finances

:ballot_box_with_check: `POST /orders` Cria uma order, recebe productId, value, type, quantity.

:ballot_box_with_check: `GET /orders` Retorna as orders, recebe filtro "query param":productId and type. 

:ballot_box_with_check: `GET /orders/:id` Retorna a order pelo id.


## :woman_technologist: Technologias
<div>
    <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black" />
    <img src="https://img.shields.io/badge/ts node-3178C6?style=for-the-badge&logo=ts node&logoColor=000000" />
    <img src="https://img.shields.io/badge/node.js-363636?style=for-the-badge&logo=node.js&logoColor=339933"/>
    <img src="https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=000000"/>
    <img src="https://img.shields.io/badge/supertest-141526?style=for-the-badge&logo=jest&logoColor=ffffff"/>
    <img src="https://img.shields.io/badge/joi-000000?style=for-the-badge&logo=joi&logoColor=ffffff"/>
</div>

## :tada: Inicialização

```bash
# Clone esse repositório, exemplo:
git clone https://github.com/Mateusr337/Marios-ecommerce_API.git

# Instale as dependências
npm i

# Rode em ambiente de desenvolvimento
npm run dev

# Rodar os testes
npm run test
```

