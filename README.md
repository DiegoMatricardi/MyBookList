
# MyBookList

Projeto academico baseado no aplicativo de avaliação de filmes chamado de "Letterboxd", focado na avaliação de livros e historias em quadrinhos, alem de possui as funções de busca, cadastro de livro, categoria, ele usa a API do gemini para trazer curiosidades sobre algum livro cadastrado que o usuario avaliou.


## Autores

- [@Diego Matricardi](https://github.com/DiegoMatricardi)
- [@Felipe Huss](https://github.com/FeHuss)

## Etiquetas

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)



## Stack utilizada

**Front-end:** Vue, HTML, CSS, JS.

**Back-end:** Node, Express, Axios, Gemini.

**Banco:** MongoDB

**Ambiente de desenvolvimento:** Docker.#### Funcionalidades

- Cadastro de usuario
- Cadastro de Livro
- Cadastro de Categoria
- Avaliar Livro
- Apresentar curiosidade de um livro aleatorio com gemini


## FAQ

#### Permissões:

As funções de cadastro de livro, categoria e exclusão de livro, so aparecerão na pagina, se o usuario tiver como seu email "admin@email.com" especificamente.

#### Erros comuns:

Quando realizar o npm install para baixar o node modules, ele não baixa o axios, então deve-se baixar ele separadamente para funcionar.

Depois de usar varias vezes a API do gemini, e comum ele para de uncionar, basta recarregar a pagina.


## Instalação

-Baixe a pasta do projeto e o Docker desktop

-Rodar o docker no cmd da pasta raiz
```bash
   docker-compose up -d
```

Acessar a o localhost do banco no docker e logar
```bash
    usuario: user
    senha: pass
```

Na pasta Backend, colocar a sua chave da API do gemini na pasta .env
```bash
    GEMINI_API_KEY=sua chave aqui
```

Na pasta Backend e FrontEnd, usar o npm para baixar o node modules
```bash
    npm install
```

Rodar a pasta do Backend
```bash
    node server.js
```

Para rodar a pasta do FrontEnd, entre no frontend-vue e depois rodar 
```bash
    cd .\frontend-vue\
    npm run server
```
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`MONGODB_URI`: String de conexão com o mongo-express

`PORT`: Porta de acesso

`GEMINI_API_KEY`: Sua chave da API do gemini


## Documentação da API
#### Livro:
#### Retorna todos os itens

```http
  GET /livro
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|     **Não possui**. |

#### Retorna um item

```http
  GET /livro/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do livro que você quer |

#### Criar Livro

```http
  POST /livro
```
#### Atualizar livro existente

```http
  PUT /livro/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do livro que você quer atualizar|

#### Deletar livro existente

```http
  DELETE /livro/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do livro que você quer deletar|

#### Buscar livro por categoria

```http
  GET /livro/categoria/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da categoria existente |

#### Buscar curiosidade do livro existente com a API do gemini

```http
  GET /livro/curiosidade/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do livro |

#### Usuario:
#### Buscar todos os usuarios

```http
  GET /Usuario
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|     **Não possui**. |

#### Buscar usuario por Id

```http
  GET /Usuario/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuario a ser buscado |

#### Cadastrar usuario

```http
  POST /Usuario
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|     **Não possui**. |

#### Atualizar usuario
```http
  PUT /Usuario/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuario que sera atualizado |

#### Deletar usuario
```http
  DELETE /Usuario/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuario que sera deletado |

#### Relacionar o usuario e sua nota com o livro existente
```http
  POST /usuario/:usuarioId/avaliar/:livroId
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `usuarioId`      | `string` | **Obrigatório**. O ID do usuario que deu a nota |
| `livroId`      | `string` | **Obrigatório**. O ID do livro que avaliou |

#### Retorna todos os livros que o usuario deu nota
```http
  GET /Usuario/:id/livros
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuario  |

#### Categoria:
#### Retorna todos as categorias existentes
```http
  GET /categoria
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|     **Não possui**. |

#### Buscar categoria por id
```http
  GET /categoria/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da categoria  |

#### Cadastrar categoria
```http
  POST /categoria
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|  **Não possui**|

#### Atualizar categoria existente
```http
  PUT /categoria/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da categoria  |

#### Deletar categoria existente
```http
  Deletar /categoria/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID da categoria  |

#### Login

#### Realizar login
```http
  GET /login
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. O email do usuario  |
| `senha`      | `string` | **Obrigatório**. Senha da conta |
