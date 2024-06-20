# Agência de Viagens 

## Objetivo:
Criar um site para uma pequena agência de viagens. O site deve possibilitar o cadastro, visualização e edição de destinos, hotéis e pontos turístico.

## Desafio proposto:
 Os requisitos funcionais definidos são:

1- Tela inicial com todos os destinos.
2- Cadastro de destinos.
3-  Cadastro de hotéis.
4- Cadastro de pontos turísticos.
5- Funcionalidades CRUD para todas as três entidades mencionadas.

## Tecnologias Utilizadas:
- Node.js
- MySQL
- Prisma

## Como testar:

- 1 - Clone este repositório:

- 2 - instale o prisma globalmente

```
npm i -g prisma
```

3- navegue até a pasta **/api**:
```
cd api
```
4- Instale as dependências:
```
npm install dotenv cors express nodemon
```
5- Configure o arquivo .env:
```
DATABASE_URL="mysql://root:@localhost:3306/travel"
```
6- Execute as migrações do banco de dados:
```
npx prisma migrate dev --name init
```
6- Inicie o servidor:
```
npx nodemon
```
