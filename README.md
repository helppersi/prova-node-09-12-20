# Helpper - Desafio Bootcamp POO

Essa aplicação foi desenvolvida exclusivamente para praticar os conhecimentos adquiridos no bootcamp da Helpper. Consiste num crud básico de usuários seguindo os padrões de orientação a objetos

_Foi feito com muito entusiasmo e carinho :)_


**STACK PRINCIPAL:** *Javascript, NodeJS, Express, MongoDB, Mongoose & Padrões REST*

## O QUE FOI UTILIZADO E ABSORVIDO DURANTE O PROJETO

- Padrões **REST**
- Verbos **HTTPS**
- Status Code
- Endpoints Amigáveis
- Params, Querys e afins
- Criptografias & Hashs com **Bcrypt**
- Padronização de Cógico com **ESlint**, **Prettier** e **EditorConfig**
- Banco de Dados não Relacional **MongoDB**, utilizando **Mongoose**
- "Travando" Requisições pra API com **CORS**
- Variáveis de Ambiente com **DotEnv**
- Validações com **YUP**
- Design Pattern **MVC**

## GUIA RÁPIDO DE INSTALAÇÃO

*1 - Dependências Iniciais*

Antes de qualquer coisa, você precisa ter instaldo o [`NPM & Node`](https://nodejs.org/en/) + [`Git`](https://git-scm.com/). Para Instalar o  siga o passo a passo de cada link listado abaixo:


- [`NPM & Node`](https://nodejs.org/en/)
- [`Git`](https://git-scm.com/)
- [`Yarn`](https://yarnpkg.com/)

*2 - Base de Dados*

Será necessário gerar uma string de conexão com o banco. Para tal crie uma conta no atlas (grátis) e gere essa string. Você pode criar sua conta [Clicando aqui](https://www.mongodb.com/cloud/atlas/register).

OBS.: Caso tenha duvidas, você pode seguir [este tutorial aqui](https://medium.com/reprogramabr/conectando-no-banco-de-dados-cloud-mongodb-atlas-bca63399693f)

Tendo gerado a string, procure pelo arquivo .env.example e siga o passo a passo abaixo:

- cole a string no lugar indicado dentro do arquivo. Deverá ficar algo como `MONGO_URL=string-que-vc-criou`
- renomeie o arquivo para .env

*3 - Rodando na Sua Máquina*

Considerando que você executou as etapas acima com êxito, abra o seu terminal e rode os seguintes comandos em suas respectivas ordens:

- `git clone https://github.com/raissaqueiroz/helpper-desafio-bootcamp.git`
- `cd helpper-desafio-bootcamp.git`
- `yarn`
- `yarn start` or `yarn dev` (Opite pelo `yarn dev` caso queira fazer alterações e ver os resultados sem ter que reiniciar o projeto)

Pronto! a API estará rodando na porta 3333. Caso você deseje alterar para outra porta, basta adicionar ao aquivo .env do projeto como no exemplo a seguir: `PORT=3333`, trocando `3333` pela porta desejada.

## Endpoints


## DOCUMENTAÇÃO BÁSICA API - ENDPOINTS

### Sessions: POST /sessions

Método para logar usuário. Ele retorna o id, nome, email e token de acesso.

**Body*
```
{
  	"email": "example@example.com",
  	"password_hash": "example123"
}

```

### Users: POST /users

Método para cadastrar novo usuário.

**Body*

```
{

	"name": "Example Name",
	"username": "ExampleUsername",
	"email": "example@example.com",
	"password": "example123",
	"password_confirm": "example123",

}

```

### Users: PUT /users

Método para atualizar dados do usuário. É necessário além do corpo da requisição o token de acesso gerado na rota de `/sessions`. Nenhuma das propriedades do body abaixo é obrigatória.

*Body*

```
{

	"name": "Example Name Edit",
	"email": "example@example.com",
	"username": "ExampleUsernameEdit"
	"password": "EditExample123",
}

```

*Headers*

```
{ "Authorization": "Bearer <token>" }

```


### Users: DELETE /users/:user_id

Método em que o usuário poderá deletar usuário. `user_id` no endpoint corresponde ao id do usuário que deseja deletar. É necessário o token de acesso gerado na rota de `/sessions`.

*Headers*

```
{ "Authorization": "Bearer <token>" }

```


