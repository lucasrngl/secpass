# SecPass Project

Uma plataforma para gerenciamento de senhas, sera possivel gerar novas senhas, salva-las, consulta-las, etc.

## Fluxo

O usuario se autentica na plataforma. <br>
O usuario pode editar informações de sua conta. <br>
O usuario pode gerar uma nova senha. <br>
O usuario pode realizar operações CRUD com sua senha. <br>
O usuario pode criar tags para suas senhas. <br>
O usuario pode realizar operações CRUD com sua tag.

## Cenario: autenticacao

### 1.1 Deve ser possível criar uma conta

`POST /api/v1/sign-up`

- Deve retornar status code `201 Created` caso sucesso
- Deve retornar status code `409 Conflict` caso email já exista
- Deve retornar status code `400 Bad Request` caso outra situação

### 1.2 Deve ser possível fazer login

`POST /api/v1/sign-in`

- Deve retornar status code `200 OK` caso sucesso
- Deve retornar status code `401 Unauthorized` caso alguma informação esteja incorreta (e.g senha, email)
- Deve retornar status code `400 Bad Request` caso outra situação

## Cenario: gerenciamento de conta

### 2.1 Deve ser possível atualizar dados

`PUT /api/v1/settings/:id`

- Deve retornar status code `201 Created` caso sucesso
- Deve retornar status code `400 Bad Request` caso outra situação
- Deve retornar status code `401 Unauthorized` caso o usuário não esteja autenticado

### 2.2 Deve ser possível excluir dados

`DELETE /api/v1/settings/:id`

- Deve retornar status code `204 No Content` caso sucesso
- Deve retornar status code `400 Bad Request` caso outra situação
- Deve retornar status code `401 Unauthorized` caso o usuário não esteja autenticado

## Cenario: gerenciamento de senhas

### 3.1 Deve ser possível gerar nova senha

`GET /api/v1/passwords/generate/:id`

- Deve retornar status code `200 OK` caso sucesso
- Deve retornar status code `401 Unauthorized` caso o usuário não esteja autenticado
- Deve retornar status code `400 Bad Request` caso outra situação

### 3.2 Deve ser possível salvar nova senha

`POST /api/v1/passwords/:id`

- Deve retornar status code `201 Created` caso sucesso
- Deve retornar status code `401 Unauthorized` caso o usuário não esteja autenticado
- Deve retornar status code `400 Bad Request` caso outra situação

### 3.3 Deve ser possível listar todas as senhas

`GET /api/v1/passwords/:id`

- Deve retornar status code `200 OK` caso sucesso
- Deve retornar status code `401 Unauthorized` caso o usuário não esteja autenticado
- Deve retornar status code `400 Bad Request` caso outra situação

### 3.4 Deve ser possível filtrar senhas por tags

`GET /api/v1/passwords/:id/:tag`

- Deve retornar status code `200 OK` caso sucesso
- Deve retornar status code `401 Unauthorized` caso o usuário não esteja autenticado
- Deve retornar status code `400 Bad Request` caso outra situação

### 3.5 Deve ser possível atualizar uma senha

`PUT /api/v1/passwords/:id/:password`

- Deve retornar status code `201 Created` caso sucesso
- Deve retornar status code `401 Unauthorized` caso o usuário não esteja autenticado
- Deve retornar status code `400 Bad Request` caso outra situação

### 3.6 Deve ser possível excluir uma senha

`DELETE /api/v1/passwords/:id/:password`

- Deve retornar status code `204 No Content` caso sucesso
- Deve retornar status code `401 Unauthorized` caso o usuário não esteja autenticado
- Deve retornar status code `400 Bad Request` caso outra situação

## Cenario: gerenciamento de tags

### 4.1 Deve ser possível salvar uma tag

`POST /api/v1/tags/:id`

- Deve retornar status code `201 Created` caso sucesso
- Deve retornar status code `401 Unauthorized` caso o usuário não esteja autenticado
- Deve retornar status code `400 Bad Request` caso outra situação

### 4.2 Deve ser possível listar todas as tags

`GET /api/v1/tags/:id`

- Deve retornar status code `200 OK` caso sucesso
- Deve retornar status code `401 Unauthorized` caso o usuário não esteja autenticado
- Deve retornar status code `400 Bad Request` caso outra situação

### 4.3 Deve ser possível atualizar uma tag

`PUT /api/v1/tags/:id/:tag`

- Deve retornar status code `201 Created` caso sucesso
- Deve retornar status code `401 Unauthorized` caso o usuário não esteja autenticado
- Deve retornar status code `400 Bad Request` caso outra situação

### 4.4 Deve ser possível excluir uma tag

`DELETE /api/v1/tags/:id/:tag`

- Deve retornar status code `204 No Content` caso sucesso
- Deve retornar status code `401 Unauthorized` caso o usuário não esteja autenticado
- Deve retornar status code `400 Bad Request` caso outra situação
