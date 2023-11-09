[![Run e2e Tests](https://github.com/dan-santos/find-a-friend/actions/workflows/run-e2e-tests.yml/badge.svg)](https://github.com/dan-santos/find-a-friend/actions/workflows/run-e2e-tests.yml)
[![Run Unit Tests](https://github.com/dan-santos/find-a-friend/actions/workflows/run-unit-tests.yml/badge.svg)](https://github.com/dan-santos/find-a-friend/actions/workflows/run-unit-tests.yml)

# Find a Friend
Projeto REST utilizando Fastify, Clean Architecture e DDD
---

## Stack
- TypeScript
- NodeJS
- Fastify
- PostgreSQL
- Prisma
- Docker
- Vitest
- Zod

## Requisitos Funcionais
[x] Deve ser possível cadastrar um pet

[x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade

[x] Deve ser possível filtrar pets por suas características

[x] Deve ser possível visualizar detalhes de um pet para adoção

[x] Deve ser possível visualizar detalhes do pet + requisitos da adoção

[x] Deve ser possível se cadastrar como uma ORG

[x] Deve ser possível realizar login como uma ORG

## Requisitos Não-Funcionais
[x] Deve ter testes unitários

[x] Deve ter testes end-2-end

[x] Deve ser integrado a uma pipeline de CI/CD do github actions

[ ] Deve ser deployado em nuvem

[x] Deve utilizar autenticação JWT

## Regras de Negócios
[x] Para listar os pets, obrigatoriamente precisamos informar a cidade

[x] Uma ORG precisa ter um endereço e um número de WhatsApp*

[x] Um pet deve estar ligado a uma ORG

[x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp

[x] Todos os filtros, além da cidade, são opcionais

[x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada**

## Próximos passos

[x] Adicionar Swagger para documentação

[ ] Adicionar Redis para cache

[ ] Adicionar Kafka para logs
 
[Figma do front-end](https://www.figma.com/community/file/1220006040435238030)

---

Observações

- (*) Fechado pois redirecionar para um chat do whatsapp deve ser função do front-end, o back-end retorna para o client-side
  todos os detalhes da organização necessários para a página de adoção de um pet em específico.

- (**) Fechado pois as rotas que devem ser protegidas já estão com o middleware de autenticação JWT. Os RF, RNF, RN e protótipo
  do Figma não estabelecem nenhuma diferenciação de role para as organizações logadas em nenhuma funcionalidade, sendo assim,
  toda a lógica agregada de RBAC não se fez necessária para esse projeto.