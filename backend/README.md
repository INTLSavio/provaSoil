# Backend Prova Soil

## Configurando a aplicação

Após clonar o projeto execute o seguinte comando para instalar as bibliotecas necessárias:

### `yarn`
Ou
### `npm install`

<br/>
Na raiz do projeto existe um arquivo de exemplo .env.example
<br/>
Basta colocar as credenciais do seu banco Postgres e uma chave secreta para autenticação
<br/>
Após configurar o banco deve-se executar o seguinte comando para criar as tabelas necessárias no banco de dados

### `npx knex migrate:latest`

<br/>

## Rodando a aplicação

Para rodar a aplicação basta executar o comando a seguir:

### `yarn dev`
Ou
### `npm run dev`

Após isso a aplicação já estará disponível para uso na porta 3333