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

[ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade

[ ] Deve ser possível filtrar pets por suas características

[ ] Deve ser possível visualizar detalhes de um pet para adoção

[ ] Deve ser possível se cadastrar como uma ORG

[ ] Deve ser possível realizar login como uma ORG

## Requisitos Não-Funcionais
[ ] Deve ter testes unitários

[ ] Deve ter testes end-2-end

[ ] Deve ser integrado a uma pipeline de CI/CD do github actions

[ ] Deve ser deployado em nuvem

[ ] Deve utilizar autenticação JWT

## Regras de Negócios
[ ] Para listar os pets, obrigatoriamente precisamos informar a cidade

[ ] Uma ORG precisa ter um endereço e um número de WhatsApp

[ ] Um pet deve estar ligado a uma ORG

[ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp

[ ] Todos os filtros, além da cidade, são opcionais

[ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

[Figma do front-end](https://www.figma.com/community/file/1220006040435238030)