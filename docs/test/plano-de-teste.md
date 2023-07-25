# Plano de testes

## Fábricas

### CT-TU-1 - Fábrica de Tokens de Ativação

#### Teste CT-TU-1.1 - Deve estar definido

O objetivo deste teste é verificar se a Fábrica de Tokens de Ativação está definida corretamente.

#### Teste CT-TU-1.2 - Todos os métodos devem estar definidos

O objetivo deste teste é verificar se todos os métodos da Fábrica de Tokens de Ativação estão definidos corretamente.

### CT-TU-2 - Fábrica de Imagens

#### Teste CT-TU-2.1 - Deve estar definido

O objetivo deste teste é verificar se a Fábrica de Imagens está definida corretamente.

#### Teste CT-TU-2.2 - Todos os métodos devem estar definidos

O objetivo deste teste é verificar se todos os métodos da Fábrica de Imagens estão definidos corretamente.

### CT-TU-3 - Fábrica de Posts

#### Teste CT-TU-3.1 - Deve estar definido

O objetivo deste teste é verificar se a Fábrica de Posts está definida corretamente.

#### Teste CT-TU-3.2 - Todos os métodos devem estar definidos

O objetivo deste teste é verificar se todos os métodos da Fábrica de Posts estão definidos corretamente.

### CT-TU-4 - Fábrica de Usuários

#### Teste CT-TU-4.1 - Deve estar definido

O objetivo deste teste é verificar se a Fábrica de Usuários está definida corretamente.

#### Teste CT-TU-4.2 - Todos os métodos devem estar definidos

O objetivo deste teste é verificar se todos os métodos da Fábrica de Usuários estão definidos corretamente.

## Repositórios

### CT-TU-5 - MemoryActivateTokenRepository

#### CT-TU-5.1 - Deve estar definido

O objetivo deste teste é verificar se a MemoryActivateTokenRepository está definida corretamente.

#### CT-TU-5.2 - Deve criar um novo activate token

O objetivo deste teste é verificar se a MemoryActivateTokenRepository é capaz de criar um novo token de ativação corretamente. O token deve conter um ID, data de criação (createdAt) e data de atualização (updatedAt).

#### CT-TU-5.3 - Deve lançar um erro se o token de ativação já existir

O objetivo deste teste é verificar se a MemoryActivateTokenRepository lança um erro caso o token de ativação já exista.

#### CT-TU-5.4 - Deve retornar o token de ativação com o ID fornecido

O objetivo deste teste é verificar se a MemoryActivateTokenRepository é capaz de retornar o token de ativação com o ID fornecido.

#### CT-TU-5.5 - Deve retornar 'undefined' se o token de ativação com o ID fornecido não existir

O objetivo deste teste é verificar se a MemoryActivateTokenRepository retorna 'undefined' quando um token de ativação com o ID fornecido não existir.

#### CT-TU-5.6 - Deve retornar o token de ativação com o token fornecido

O objetivo deste teste é verificar se a MemoryActivateTokenRepository é capaz de retornar o token de ativação com o token fornecido.

#### CT-TU-5.7 - Deve retornar 'undefined' se o token de ativação com o token fornecido não existir

O objetivo deste teste é verificar se a MemoryActivateTokenRepository retorna 'undefined' quando um token de ativação com o token fornecido não existir.

#### CT-TU-5.8 - Deve atualizar o token de ativação com o ID fornecido

O objetivo deste teste é verificar se a MemoryActivateTokenRepository é capaz de atualizar o token de ativação com o ID fornecido.

#### CT-TU-5.9 - Deve lançar um erro se o token de ativação com o ID fornecido não existir

O objetivo deste teste é verificar se a MemoryActivateTokenRepository lança um erro ao tentar atualizar um token de ativação com um ID que não existe.

#### CT-TU-5.10 - Deve excluir o token de ativação com o ID fornecido

O objetivo deste teste é verificar se a MemoryActivateTokenRepository é capaz de excluir o token de ativação com o ID fornecido.

#### CT-TU-5.11 - Deve lançar um erro se o token de ativação com o ID fornecido não existir

O objetivo deste teste é verificar se a MemoryActivateTokenRepository lança um erro ao tentar excluir um token de ativação com um ID que não existe.

### CT-TU-6 - MemoryImageRepository

#### CT-TU-6.1 - Deve estar definido

O objetivo deste teste é verificar se a MemoryImageRepository está definida corretamente.

#### CT-TU-6.2 - Deve criar uma nova imagem

O objetivo deste teste é verificar se a MemoryImageRepository é capaz de criar uma nova imagem corretamente. A imagem deve conter um ID, URL, ID do usuário (userId), data de criação (createdAt) e data de atualização (updatedAt).

#### CT-TU-6.3 - Deve retornar a imagem com o ID fornecido

O objetivo deste teste é verificar se a MemoryImageRepository é capaz de retornar a imagem com o ID fornecido.

#### CT-TU-6.4 - Deve retornar 'undefined' se a imagem com o ID fornecido não existir

O objetivo deste teste é verificar se a MemoryImageRepository retorna 'undefined' quando uma imagem com o ID fornecido não existir.

#### CT-TU-6.5 - Deve retornar todas as imagens

O objetivo deste teste é verificar se a MemoryImageRepository é capaz de retornar todas as imagens corretamente.

#### CT-TU-6.6 - Deve excluir a imagem com o ID fornecido

O objetivo deste teste é verificar se a MemoryImageRepository é capaz de excluir a imagem com o ID fornecido.

#### CT-TU-6.7 - Deve lançar um erro se a imagem com o ID fornecido não existir

O objetivo deste teste é verificar se a MemoryImageRepository lança um erro ao tentar excluir uma imagem com um ID que não existe.

### CT-TU-7 - MemoryPostRepository

#### CT-TU-7.1 - Deve estar definido

O objetivo deste teste é verificar se a MemoryPostRepository está definida corretamente.

#### CT-TU-7.2 - Deve criar um novo post

O objetivo deste teste é verificar se a MemoryPostRepository é capaz de criar um novo post corretamente. O post deve conter um ID, subtítulo (subtitle), ID do usuário (userId), ID da imagem (imageId), data de criação (createdAt) e data de atualização (updatedAt).

#### CT-TU-7.3 - Deve retornar o post com o ID fornecido

O objetivo deste teste é verificar se a MemoryPostRepository é capaz de retornar o post com o ID fornecido.

#### CT-TU-7.4 - Deve retornar 'undefined' se o post com o ID fornecido não existir

O objetivo deste teste é verificar se a MemoryPostRepository retorna 'undefined' quando um post com o ID fornecido não existir.

#### CT-TU-7.5 - Deve retornar todos os posts

O objetivo deste teste é verificar se a MemoryPostRepository é capaz de retornar todos os posts corretamente.

#### CT-TU-7.6 - Deve retornar todos os posts do usuário com o ID fornecido

O objetivo deste teste é verificar se a MemoryPostRepository é capaz de retornar todos os posts de um usuário com o ID fornecido corretamente.

#### CT-TU-7.7 - Deve atualizar o post com o ID fornecido

O objetivo deste teste é verificar se a MemoryPostRepository é capaz de atualizar o post com o ID fornecido.

#### CT-TU-7.8 - Deve lançar um erro se o post com o ID fornecido não existir

O objetivo deste teste é verificar se a MemoryPostRepository lança um erro ao tentar atualizar um post com um ID que não existe.

#### CT-TU-7.9 Deve ser capaz de atualizar um post com o mesmo subtítulo

Este método verifica se o método "updatePost" consegue atualizar um post com um subtítulo igual ao que já havia

#### CT-TU-7.10 Deve ser capaz de atualizar um post com o mesmo ID de imagem

Este método verifica se o método "updatePost" consegue atualizar um post com um ID de imagem igual ao que já havia

#### CT-TU-7.11 Deve ser capaz de atualizar um post com o mesmo ID de usuário

Este método verifica se o método "updatePost" consegue atualizar um post com um ID de usuário igual ao que já havia

#### CT-TU-7.12 - Deve excluir o post com o ID fornecido

O objetivo deste teste é verificar se a MemoryPostRepository é capaz de excluir o post com o ID fornecido.

#### CT-TU-7.13 - Deve lançar um erro se o post com o ID fornecido não existir

O objetivo deste teste é verificar se a MemoryPostRepository lança um erro ao tentar excluir um post com um ID que não existe.

### CT-TU-8 - MemoryUserRepository

#### CT-TU-8.1 - Deve estar definido

O objetivo deste teste é verificar se a MemoryUserRepository está definida corretamente.

#### CT-TU-8.2 - Deve criar um novo usuário

O objetivo deste teste é verificar se a MemoryUserRepository é capaz de criar um novo usuário corretamente. O usuário deve conter um ID, nome de usuário (username), email, nome completo (fullName), senha (password), imagem de perfil (profilePicture), biografia (biography), verificação de email (emailVerified), data de criação (createdAt) e data de atualização (updatedAt).

#### CT-TU-8.3 - Não deve criar um usuário com o mesmo nome de usuário ou email

O objetivo deste teste é verificar se a MemoryUserRepository não cria um usuário com o mesmo nome de usuário ou email de um usuário existente.

#### CT-TU-8.4 - Deve retornar o usuário com o ID fornecido

O objetivo deste teste é verificar se a MemoryUserRepository é capaz de retornar o usuário com o ID fornecido.

#### CT-TU-8.5 - Deve retornar 'undefined' se o usuário com o ID fornecido não existir

O objetivo deste teste é verificar se a MemoryUserRepository retorna 'undefined' quando um usuário com o ID fornecido não existir.

#### CT-TU-8.6 - Deve retornar o usuário com o nome de usuário fornecido

O objetivo deste teste é verificar se a MemoryUserRepository é capaz de retornar o usuário com o nome de usuário fornecido.

#### CT-TU-8.7 - Deve retornar 'undefined' se o usuário com o nome de usuário fornecido não existir

O objetivo deste teste é verificar se a MemoryUserRepository retorna 'undefined' quando um usuário com o nome de usuário fornecido não existir.

#### CT-TU-8.8 - Deve retornar o usuário com o email fornecido

O objetivo deste teste é verificar se a MemoryUserRepository é capaz de retornar o usuário com o email fornecido.

#### CT-TU-8.9 - Deve retornar 'undefined' se o usuário com o email fornecido não existir

O objetivo deste teste é verificar se a MemoryUserRepository retorna 'undefined' quando um usuário com o email fornecido não existir.

#### CT-TU-8.10 - Deve retornar todos os usuários

O objetivo deste teste é verificar se a MemoryUserRepository é capaz de retornar todos os usuários corretamente.

#### CT-TU-8.11 - Deve atualizar o usuário com o ID fornecido

O objetivo deste teste é verificar se a MemoryUserRepository é capaz de atualizar o usuário com o ID fornecido.

#### CT-TU-8.12 - Deve lançar um erro se o usuário com o ID fornecido não existir

O objetivo deste teste é verificar se a MemoryUserRepository lança um erro ao tentar atualizar um usuário com um ID que não existe.

#### CT-TU-8.13 - Deve excluir o usuário com o ID fornecido

O objetivo deste teste é verificar se a MemoryUserRepository é capaz de excluir o usuário com o ID fornecido.

#### CT-TU-8.14 - Deve lançar um erro se o usuário com o ID fornecido não existir

O objetivo deste teste é verificar se a MemoryUserRepository lança um erro ao tentar excluir um usuário com um ID que não existe.

#### CT-TU-8.15 - Deve atualizar a senha do usuário

O objetivo deste teste é verificar se a MemoryUserRepository é capaz de atualizar a senha do usuário corretamente.

#### CT-TU-8.16 - Deve atualizar o nome de usuário do usuário

O objetivo deste teste é verificar se a MemoryUserRepository é capaz de atualizar o nome de usuário do usuário corretamente.

#### CT-TU-8.17 - Deve atualizar o email do usuário

O objetivo deste teste é verificar se a MemoryUserRepository é capaz de atualizar o email do usuário corretamente.

### CT-TI-9 - PrismaActivateTokenRepository

#### 9.1 Verificação de existência

Verifica se o repositório PrismaActivateTokenRepository está definido.

#### 9.2 Método create

##### 9.2.1 Deve criar um novo token de ativação

Este teste verifica se o método "create" cria um novo token de ativação corretamente.

##### 9.2.2 Deve lançar um erro se o token de ativação já existir

Este teste verifica se o método "create" lança um erro caso o token de ativação já exista no repositório.

#### 9.3 Método getById

##### 9.3.1 Deve retornar o token de ativação com o ID fornecido

Este teste verifica se o método "getById" retorna o token de ativação correto com base no ID fornecido.

##### 9.3.2 Deve retornar indefinido se o token de ativação com o ID fornecido não existir

Este teste verifica se o método "getById" retorna indefinido quando o token de ativação com o ID fornecido não existe.

#### 9.4 Método getByToken

##### 9.4.1 Deve retornar o token de ativação com o token fornecido

Este teste verifica se o método "getByToken" retorna o token de ativação correto com base no token fornecido.

##### 9.4.2 Deve retornar indefinido se o token de ativação com o token fornecido não existir

Este teste verifica se o método "getByToken" retorna indefinido quando o token de ativação com o token fornecido não existe.

#### 9.5 Método update

##### 9.5.1 Deve atualizar o token de ativação com o ID fornecido

Este teste verifica se o método "update" atualiza corretamente o token de ativação com base no ID fornecido.

##### 9.5.2 Deve lançar um erro se o token de ativação com o ID fornecido não existir

Este teste verifica se o método "update" lança um erro quando o token de ativação com o ID fornecido não existe.

#### 9.6 Método delete

##### 9.6.1 Deve deletar o token de ativação com o ID fornecido

Este teste verifica se o método "delete" deleta corretamente o token de ativação com base no ID fornecido.

##### 9.6.2 Deve lançar um erro se o token de ativação com o ID fornecido não existir

Este teste verifica se o método "delete" lança um erro quando o token de ativação com o ID fornecido não existe.

### CT-TI-10-PrismaImageRepository

#### 10.1 Verificação de existência

Verifica se o repositório PrismaImageRepository está definido.

#### 10.2 Método createImage

##### 10.2.1 Deve criar uma nova imagem

Este teste verifica se o método "createImage" cria uma nova imagem corretamente.

##### 10.2.2 Deve lançar um erro ao tentar criar uma imagem com um usuário inexistente

Este teste verifica se o método "createImage" lança um erro ao tentar criar uma imagem com um usuário inexistente.

#### 10.3 Método getImage

##### 10.3.1 Deve retornar a imagem com o ID fornecido

Este teste verifica se o método "getImage" retorna a imagem correta com base no ID fornecido.

##### 10.3.2 Deve retornar indefinido ao tentar obter uma imagem com um ID inexistente

Este teste verifica se o método "getImage" retorna indefinido ao tentar obter uma imagem com um ID inexistente.

#### 10.4 Método getImages

##### 10.4.1 Deve retornar todas as imagens

Este teste verifica se o método "getImages" retorna todas as imagens existentes.

#### 10.5 Método deleteImage

##### 10.5.1 Deve deletar a imagem com o ID fornecido

Este teste verifica se o método "deleteImage" deleta corretamente a imagem com base no ID fornecido.

##### 10.5.2 Deve lançar um erro ao tentar deletar uma imagem com um ID inexistente

Este teste verifica se o método "deleteImage" lança um erro ao tentar deletar uma imagem com um ID inexistente.

### CT-TI-11 - PrismaPostRepository

#### 11.1 Verificação de existência

Verifica se o repositório PrismaPostRepository está definido.

#### 11.2 Método createPost

##### 11.2.1 Deve criar um novo post

Este teste verifica se o método "createPost" cria um novo post corretamente.

##### 11.2.2 Deve lançar um erro ao tentar criar um post com um usuário inexistente

Este teste verifica se o método "createPost" lança um erro ao tentar criar um post com um usuário inexistente.

##### 11.2.3 Deve lançar um erro ao tentar criar um post com uma imagem inexistente

Este teste verifica se o método "createPost" lança um erro ao tentar criar um post com uma imagem inexistente.

#### 11.3 Método getPostById

##### 11.3.1 Deve retornar o post com o ID fornecido

Este teste verifica se o método "getPostById" retorna o post correto com base no ID fornecido.

##### 11.3.2 Deve retornar indefinido ao tentar encontrar um post com um ID inexistente

Este teste verifica se o método "getPostById" retorna indefinido ao tentar encontrar um post com um ID inexistente.

#### 11.4 Método getPosts

##### 11.4.1 Deve retornar todos os posts

Este teste verifica se o método "getPosts" retorna todos os posts existentes.

#### 11.5 Método getPostsByUserId

##### 11.5.1 Deve retornar todos os posts com o ID do usuário fornecido

Este teste verifica se o método "getPostsByUserId" retorna todos os posts com base no ID do usuário fornecido.

##### 11.5.2 Deve retornar um array vazio ao tentar encontrar todos os posts com um ID de usuário inexistente

Este teste verifica se o método "getPostsByUserId" retorna um array vazio ao tentar encontrar todos os posts com um ID de usuário inexistente.

#### 11.6 Método updatePost

##### 11.6.1 Deve atualizar o post com o ID fornecido

Este teste verifica se o método "updatePost" atualiza corretamente o post com base no ID fornecido.

##### 11.6.2 Deve lançar um erro ao tentar atualizar um post com um ID inexistente

Este teste verifica se o método "updatePost" lança um erro ao tentar atualizar um post com um ID inexistente.

##### 11.6.3 Deve ser capaz de atualizar um post com o mesmo subtítulo

Este método verifica se o método "updatePost" consegue atualizar um post com um subtítulo igual ao que já havia

##### 11.6.4 Deve ser capaz de atualizar um post com o mesmo ID de imagem

Este método verifica se o método "updatePost" consegue atualizar um post com um ID de imagem igual ao que já havia

##### 11.6.5 Deve ser capaz de atualizar um post com o mesmo ID de usuário

Este método verifica se o método "updatePost" consegue atualizar um post com um ID de usuário igual ao que já havia

#### 11.7 Método deletePost

##### 11.7.1 Deve deletar o post com o ID fornecido

Este teste verifica se o método "deletePost" deleta corretamente o post com base no ID fornecido.

##### 11.7.2 Deve lançar um erro ao tentar deletar um post com um ID inexistente

Este teste verifica se o método "deletePost" lança um erro ao tentar deletar um post com um ID inexistente.

### CT-TI-12-UserPrismaRepository

#### 12.1 Verificação de existência

Verifica se o repositório UserPrismaRepository está definido.

#### 12.2 Método createUser

##### 12.2.1 Deve criar um novo usuário

Este teste verifica se o método "createUser" cria um novo usuário corretamente.

##### 12.2.2 Não deve criar um usuário com o mesmo nome de usuário

Este teste verifica se o método "createUser" não cria um usuário com o mesmo nome de usuário.

##### 12.2.3 Não deve criar um usuário com o mesmo email

Este teste verifica se o método "createUser" não cria um usuário com o mesmo email.

#### 12.3 Método getUsers

##### 12.3.1 Deve retornar todos os usuários

Este teste verifica se o método "getUsers" retorna todos os usuários existentes.

#### 12.4 Método getUserById

##### 12.4.1 Deve retornar o usuário com o ID fornecido

Este teste verifica se o método "getUserById" retorna o usuário correto com base no ID fornecido.

##### 12.4.2 Não deve retornar um usuário com um ID inexistente

Este teste verifica se o método "getUserById" não retorna um usuário com um ID inexistente.

#### 12.5 Método getUserByUsername

##### 12.5.1 Deve retornar o usuário com o nome de usuário fornecido

Este teste verifica se o método "getUserByUsername" retorna o usuário correto com base no nome de usuário fornecido.

##### 12.5.2 Não deve retornar um usuário com um nome de usuário inexistente

Este teste verifica se o método "getUserByUsername" não retorna um usuário com um nome de usuário inexistente.

#### 12.6 Método getUserByEmail

##### 12.6.1 Deve retornar o usuário com o email fornecido

Este teste verifica se o método "getUserByEmail" retorna o usuário correto com base no email fornecido.

##### 12.6.2 Não deve retornar um usuário com um email inexistente

Este teste verifica se o método "getUserByEmail" não retorna um usuário com um email inexistente.

#### 12.7 Método updateUser

##### 12.7.1 Deve atualizar o usuário com o ID fornecido

Este teste verifica se o método "updateUser" atualiza corretamente o usuário com base no ID fornecido.

##### 12.7.2 Não deve atualizar um usuário com o mesmo nome de usuário

Este teste verifica se o método "updateUser" não atualiza um usuário com o mesmo nome de usuário.

##### 12.7.3 Não deve atualizar um usuário com o mesmo email

Este teste verifica se o método "updateUser" não atualiza um usuário com o mesmo email.

##### 12.7.4 Não deve atualizar um usuário inexistente

Este teste verifica se o método "updateUser" não atualiza um usuário inexistente.

##### 12.7.5 Deve ser capaz de atualizar com o mesmo nome de usuário

Este teste verifica se o método "updateUser" é capaz de atualizar com o mesmo nome de usuário.

##### 12.7.6 Deve ser capaz de atualizar com o mesmo email

Este teste verifica se o método "updateUser" é capaz de atualizar com o mesmo email.

##### 12.7.7 Deve ser capaz de atualizar a senha do usuário

Este teste verifica se o método "updateUser" é capaz de atualizar a senha do usuário.

#### 12.8 Método deleteUser

##### 12.8.1 Deve deletar o usuário com o ID fornecido

Este teste verifica se o método "deleteUser" deleta corretamente o usuário com base no ID fornecido.

##### 12.8.2 Não deve deletar um usuário inexistente

Este teste verifica se o método "deleteUser" não deleta um usuário inexistente.

## Serviços

### CT-TI-13-MemoryActivateTokenService

#### 13.1 Verificação de existência

Verifica se o serviço MemoryActivateTokenService está definido.

#### 13.2 Método create

##### 13.2.1 Deve criar um novo activate token

Este teste verifica se o método "create" cria um novo activate token corretamente.

##### 13.2.2 Não deve criar um novo activate token se o usuário não existir

Este teste verifica se o método "create" não cria um novo activate token se o usuário não existir.

##### 13.2.3 Não deve criar um novo activate token se o token já existir

Este teste verifica se o método "create" não cria um novo activate token se o token já existir.

#### 13.3 Método getById

##### 13.3.1 Deve retornar o activate token com o ID fornecido

Este teste verifica se o método "getById" retorna o activate token correto com base no ID fornecido.

##### 13.3.2 Não deve retornar um activate token com um ID inexistente

Este teste verifica se o método "getById" não retorna um activate token com um ID inexistente.

#### 13.4 Método getByToken

##### 13.4.1 Deve retornar o activate token com o token fornecido

Este teste verifica se o método "getByToken" retorna o activate token correto com base no token fornecido.

##### 13.4.2 Não deve retornar um activate token com um token inexistente

Este teste verifica se o método "getByToken" não retorna um activate token com um token inexistente.

#### 13.5 Método update

##### 13.5.1 Deve atualizar o activate token com o ID fornecido

Este teste verifica se o método "update" atualiza corretamente o activate token com base no ID fornecido.

##### 13.5.2 Não deve atualizar um activate token com um ID inexistente

Este teste verifica se o método "update" não atualiza um activate token com um ID inexistente.

#### 13.6 Método delete

##### 13.6.1 Deve deletar o activate token com o ID fornecido

Este teste verifica se o método "delete" deleta corretamente o activate token com base no ID fornecido.

##### 13.6.2 Não deve deletar um activate token com um ID inexistente

Este teste verifica se o método "delete" não deleta um activate token com um ID inexistente.

### CT-TI-14-PrismaActivateTokenService

#### 14.1 Verificação de existência

Verifica se o serviço PrismaActivateTokenService está definido.

#### 14.2 Método create

##### 14.2.1 Deve criar um novo activate token

Este teste verifica se o método "create" cria um novo activate token corretamente.

##### 14.2.2 Não deve criar um novo activate token se o usuário não existir

Este teste verifica se o método "create" não cria um novo activate token se o usuário não existir.

##### 14.2.3 Não deve criar um novo activate token se o token já existir

Este teste verifica se o método "create" não cria um novo activate token se o token já existir.

#### 14.3 Método getById

##### 14.3.1 Deve retornar o activate token com o ID fornecido

Este teste verifica se o método "getById" retorna o activate token correto com base no ID fornecido.

##### 14.3.2 Não deve retornar um activate token com um ID inexistente

Este teste verifica se o método "getById" não retorna um activate token com um ID inexistente.

#### 14.4 Método getByToken

##### 14.4.1 Deve retornar o activate token com o token fornecido

Este teste verifica se o método "getByToken" retorna o activate token correto com base no token fornecido.

##### 14.4.2 Não deve retornar um activate token com um token inexistente

Este teste verifica se o método "getByToken" não retorna um activate token com um token inexistente.

#### 14.5 Método update

##### 14.5.1 Deve atualizar o activate token com o ID fornecido

Este teste verifica se o método "update" atualiza corretamente o activate token com base no ID fornecido.

##### 14.5.2 Não deve atualizar um activate token com um ID inexistente

Este teste verifica se o método "update" não atualiza um activate token com um ID inexistente.

#### 14.6 Método delete

##### 14.6.1 Deve deletar o activate token com o ID fornecido

Este teste verifica se o método "delete" deleta corretamente o activate token com base no ID fornecido.

##### 14.6.2 Não deve deletar um activate token com um ID inexistente

Este teste verifica se o método "delete" não deleta um activate token com um ID inexistente.

### CT-TI-15-MemoryImageService

#### 15.1 Verificação de existência

Verifica se o serviço MemoryImageService está definido.

#### 15.2 Método create

##### 15.2.1 Deve ser capaz de criar uma imagem

Este teste verifica se o método "create" cria uma nova imagem corretamente.

##### 15.2.2 Não deve ser capaz de criar uma imagem com um ID de usuário inválido

Este teste verifica se o método "create" não cria uma nova imagem com um ID de usuário inválido.

#### 15.3 Método get

##### 15.3.1 Deve ser capaz de obter todas as imagens

Este teste verifica se o método "getImages" é capaz de obter todas as imagens corretamente.

##### 15.3.2 Deve ser capaz de obter uma imagem pelo ID

Este teste verifica se o método "getImage" é capaz de obter uma imagem corretamente com base no ID fornecido.

##### 15.3.3 Não deve ser capaz de obter uma imagem com um ID inexistente

Este teste verifica se o método "getImage" não retorna uma imagem com um ID inexistente.

##### 15.3.4 Deve ser capaz de obter todas as imagens de um usuário

Este teste verifica se o método "getUserImages" é capaz de obter todas as imagens de um usuário corretamente.

#### 15.4 Método delete

##### 15.4.1 Deve ser capaz de deletar uma imagem

Este teste verifica se o método "deleteImage" é capaz de deletar uma imagem corretamente com base no ID fornecido.

##### 15.4.2 Não deve ser capaz de deletar uma imagem com um ID inexistente

Este teste verifica se o método "deleteImage" não deleta uma imagem com um ID inexistente.

### CT-TI-16-PrismaImageService

#### 16.1 Verificação de existência

Verifica se o serviço PrismaImageService está definido.

#### 16.2 Método create

##### 16.2.1 Deve ser capaz de criar uma imagem

Este teste verifica se o método "create" cria uma nova imagem corretamente.

##### 16.2.2 Não deve ser capaz de criar uma imagem com um ID de usuário inválido

Este teste verifica se o método "create" não cria uma nova imagem com um ID de usuário inválido.

#### 16.3 Método get

##### 16.3.1 Deve ser capaz de obter todas as imagens

Este teste verifica se o método "getImages" é capaz de obter todas as imagens corretamente.

##### 16.3.2 Deve ser capaz de obter uma imagem pelo ID

Este teste verifica se o método "getImage" é capaz de obter uma imagem corretamente com base no ID fornecido.

##### 16.3.3 Não deve ser capaz de obter uma imagem com um ID inexistente

Este teste verifica se o método "getImage" não retorna uma imagem com um ID inexistente.

##### 16.3.4 Deve ser capaz de obter todas as imagens de um usuário

Este teste verifica se o método "getUserImages" é capaz de obter todas as imagens de um usuário corretamente.

#### 16.4 Método delete

##### 16.4.1 Deve ser capaz de deletar uma imagem

Este teste verifica se o método "deleteImage" é capaz de deletar uma imagem corretamente com base no ID fornecido.

##### 16.4.2 Não deve ser capaz de deletar uma imagem com um ID inexistente

Este teste verifica se o método "deleteImage" não deleta uma imagem com um ID inexistente.

### CT-TI-17-MemoryPostService

#### 17.1 Verificação de existência

Verifica se o serviço MemoryPostService está definido.

#### 17.2 Método create

##### 17.2.1 Deve ser capaz de criar um post

Este teste verifica se o método "create" é capaz de criar um novo post corretamente.

##### 17.2.2 Não deve ser capaz de criar um post com um ID de usuário inválido

Este teste verifica se o método "create" não cria um novo post com um ID de usuário inválido.

##### 17.2.3 Não deve ser capaz de criar um post com um ID de imagem inválido

Este teste verifica se o método "create" não cria um novo post com um ID de imagem inválido.

#### 17.3 Método get

##### 17.3.1 Deve ser capaz de obter todos os posts

Este teste verifica se o método "getPosts" é capaz de obter todos os posts corretamente.

##### 17.3.2 Deve ser capaz de obter um post pelo ID

Este teste verifica se o método "getPostById" é capaz de obter um post corretamente com base no ID fornecido.

##### 17.3.3 Não deve ser capaz de obter um post com um ID inválido

Este teste verifica se o método "getPostById" não retorna um post com um ID inválido.

##### 17.3.4 Deve ser capaz de obter todos os posts de um usuário

Este teste verifica se o método "getPostsByUserId" é capaz de obter todos os posts de um usuário corretamente.

##### 17.3.5 Não deve ser capaz de obter todos os posts de um usuário com um ID inválido

Este teste verifica se o método "getPostsByUserId" não retorna todos os posts de um usuário com um ID inválido.

#### 17.4 Método update

##### 17.4.1 Deve ser capaz de atualizar um post

Este teste verifica se o método "updatePost" é capaz de atualizar um post corretamente com base no ID fornecido.

##### 17.4.2 Não deve ser capaz de atualizar um post com um ID inválido

Este teste verifica se o método "updatePost" não atualiza um post com um ID inválido.

#### 17.5 Método delete

##### 17.5.1 Deve ser capaz de deletar um post

Este teste verifica se o método "deletePost" é capaz de deletar um post corretamente com base no ID fornecido.

##### 17.5.2 Não deve ser capaz de deletar um post com um ID inválido

Este teste verifica se o método "deletePost" não deleta um post com um ID inválido.

### CT-TI-18-PrismaPostService

#### 18.1 Verificação de existência

Verifica se o serviço PrismaPostService está definido.

#### 18.2 Método create

##### 18.2.1 Deve ser capaz de criar um post

Este teste verifica se o método "create" é capaz de criar um novo post corretamente.

##### 18.2.2 Não deve ser capaz de criar um post com um ID de usuário inválido

Este teste verifica se o método "create" não cria um novo post com um ID de usuário inválido.

##### 18.2.3 Não deve ser capaz de criar um post com um ID de imagem inválido

Este teste verifica se o método "create" não cria um novo post com um ID de imagem inválido.

#### 18.3 Método get

##### 18.3.1 Deve ser capaz de obter todos os posts

Este teste verifica se o método "getPosts" é capaz de obter todos os posts corretamente.

##### 18.3.2 Deve ser capaz de obter um post pelo ID

Este teste verifica se o método "getPostById" é capaz de obter um post corretamente com base no ID fornecido.

##### 18.3.3 Não deve ser capaz de obter um post com um ID inválido

Este teste verifica se o método "getPostById" não retorna um post com um ID inválido.

##### 18.3.4 Deve ser capaz de obter todos os posts de um usuário

Este teste verifica se o método "getPostsByUserId" é capaz de obter todos os posts de um usuário corretamente.

##### 18.3.5 Não deve ser capaz de obter todos os posts de um usuário com um ID inválido

Este teste verifica se o método "getPostsByUserId" não retorna todos os posts de um usuário com um ID inválido.

#### 18.4 Método update

##### 18.4.1 Deve ser capaz de atualizar um post

Este teste verifica se o método "updatePost" é capaz de atualizar um post corretamente com base no ID fornecido.

##### 18.4.2 Não deve ser capaz de atualizar um post com um ID inválido

Este teste verifica se o método "updatePost" não atualiza um post com um ID inválido.

##### 18.4.3 Não deve ser capaz de atualizar um post com um ID de usuário inválido

Este teste verifica se o método "updatePost" não atualiza um post com um ID de usuário inválido

##### 18.4.3 Não deve ser capaz de atualizar um post com um ID de imagem inválido

Este teste verifica se o método "updatePost" não atualiza um post com um ID de imagem inválido

#### 18.5 Método delete

##### 18.5.1 Deve ser capaz de deletar um post

Este teste verifica se o método "deletePost" é capaz de deletar um post corretamente com base no ID fornecido.

##### 18.5.2 Não deve ser capaz de deletar um post com um ID inválido

Este teste verifica se o método "deletePost" não deleta um post com um ID inválido.

### CT-TI-19-MemoryUserService

#### 19.1 Verificação de existência

Verifica se o serviço MemoryUserService está definido.

#### 19.2 Método create

##### 19.2.1 Deve ser capaz de criar um usuário

Este teste verifica se o método "createUser" é capaz de criar um novo usuário corretamente.

##### 19.2.2 Não deve ser capaz de criar um usuário com um nome de usuário existente

Este teste verifica se o método "createUser" não cria um novo usuário com um nome de usuário já existente.

##### 19.2.3 Não deve ser capaz de criar um usuário com um e-mail existente

Este teste verifica se o método "createUser" não cria um novo usuário com um e-mail já existente.

#### 19.3 Método find

##### 19.3.1 Deve ser capaz de encontrar todos os usuários

Este teste verifica se o método "getUsers" é capaz de encontrar todos os usuários corretamente.

##### 19.3.2 Deve ser capaz de encontrar um usuário pelo ID

Este teste verifica se o método "getUserById" é capaz de encontrar um usuário corretamente com base no ID fornecido.

##### 19.3.3 Não deve ser capaz de encontrar um usuário com um ID inexistente

Este teste verifica se o método "getUserById" não retorna um usuário com um ID inexistente.

##### 19.3.4 Deve ser capaz de encontrar um usuário pelo nome de usuário

Este teste verifica se o método "getUserByUsername" é capaz de encontrar um usuário corretamente com base no nome de usuário fornecido.

##### 19.3.5 Não deve ser capaz de encontrar um usuário com um nome de usuário inexistente

Este teste verifica se o método "getUserByUsername" não retorna um usuário com um nome de usuário inexistente.

##### 19.3.6 Deve ser capaz de encontrar um usuário pelo e-mail

Este teste verifica se o método "getUserByEmail" é capaz de encontrar um usuário corretamente com base no e-mail fornecido.

##### 19.3.7 Não deve ser capaz de encontrar um usuário com um e-mail inexistente

Este teste verifica se o método "getUserByEmail" não retorna um usuário com um e-mail inexistente.

#### 19.4 Método update

##### 19.4.1 Deve ser capaz de atualizar um usuário

Este teste verifica se o método "updateUser" é capaz de atualizar um usuário corretamente com base no ID fornecido.

##### 19.4.2 Não deve ser capaz de atualizar um usuário com um nome de usuário existente

Este teste verifica se o método "updateUser" não atualiza um usuário com um nome de usuário já existente.

##### 19.4.3 Não deve ser capaz de atualizar um usuário com um e-mail existente

Este teste verifica se o método "updateUser" não atualiza um usuário com um e-mail já existente.

##### 19.4.4 Não deve atualizar um usuário inexistente

Este teste verifica se o método "updateUser" não atualiza um usuário inexistente.

##### 19.4.5 Deve atualizar um usuário com o mesmo nome de usuário quando for o mesmo ID

Este teste verifica se o método "updateUser" atualiza um usuário com o mesmo nome de usuário quando for o mesmo ID.

#### 19.5 Método delete

##### 19.5.1 Deve excluir um usuário

Este teste verifica se o método "deleteUser" é capaz de excluir um usuário corretamente com base no ID fornecido.

##### 19.5.2 Não deve excluir um usuário inexistente

Este teste verifica se o método "deleteUser" não exclui um usuário inexistente.

#### 19.6 Método getUserImages

##### 19.6.1 Deve obter as imagens do usuário

Este teste verifica se o método "getUserImages" é capaz de obter as imagens do usuário corretamente.

##### 19.6.2 Não deve obter as imagens de um usuário inexistente

Este teste verifica se o método "getUserImages" não retorna as imagens de um usuário inexistente.

#### 19.7 Método getUserPosts

##### 19.7.1 Deve obter as postagens do usuário

Este teste verifica se o método "getUserPosts" é capaz de obter as postagens do usuário corretamente.

##### 19.7.2 Não deve obter as postagens de um usuário inexistente

Este teste verifica se o método "getUserPosts" não retorna as postagens de um usuário inexistente.

### CT-TI-20-PrismaUserService

#### 20.1 Verificação de existência

Verifica se o serviço PrismaUserService está definido.

#### 20.2 Método create

##### 20.2.1 Deve ser capaz de criar um usuário

Este teste verifica se o método "createUser" é capaz de criar um novo usuário corretamente.

##### 20.2.2 Não deve ser capaz de criar um usuário com um nome de usuário existente

Este teste verifica se o método "createUser" não cria um novo usuário com um nome de usuário já existente.

##### 20.2.3 Não deve ser capaz de criar um usuário com um e-mail existente

Este teste verifica se o método "createUser" não cria um novo usuário com um e-mail já existente.

#### 20.3 Método find

##### 20.3.1 Deve ser capaz de encontrar todos os usuários

Este teste verifica se o método "getUsers" é capaz de encontrar todos os usuários corretamente.

##### 20.3.2 Deve ser capaz de encontrar um usuário pelo ID

Este teste verifica se o método "getUserById" é capaz de encontrar um usuário corretamente com base no ID fornecido.

##### 20.3.3 Não deve ser capaz de encontrar um usuário com um ID inexistente

Este teste verifica se o método "getUserById" não retorna um usuário com um ID inexistente.

##### 20.3.4 Deve ser capaz de encontrar um usuário pelo nome de usuário

Este teste verifica se o método "getUserByUsername" é capaz de encontrar um usuário corretamente com base no nome de usuário fornecido.

##### 20.3.5 Não deve ser capaz de encontrar um usuário com um nome de usuário inexistente

Este teste verifica se o método "getUserByUsername" não retorna um usuário com um nome de usuário inexistente.

##### 20.3.6 Deve ser capaz de encontrar um usuário pelo e-mail

Este teste verifica se o método "getUserByEmail" é capaz de encontrar um usuário corretamente com base no e-mail fornecido.

##### 20.3.7 Não deve ser capaz de encontrar um usuário com um e-mail inexistente

Este teste verifica se o método "getUserByEmail" não retorna um usuário com um e-mail inexistente.

#### 20.4 Método update

##### 20.4.1 Deve ser capaz de atualizar um usuário

Este teste verifica se o método "updateUser" é capaz de atualizar um usuário corretamente com base no ID fornecido.

##### 20.4.2 Não deve ser capaz de atualizar um usuário com um nome de usuário existente

Este teste verifica se o método "updateUser" não atualiza um usuário com um nome de usuário já existente.

##### 20.4.3 Não deve ser capaz de atualizar um usuário com um e-mail existente

Este teste verifica se o método "updateUser" não atualiza um usuário com um e-mail já existente.

##### 20.4.4 Não deve atualizar um usuário inexistente

Este teste verifica se o método "updateUser" não atualiza um usuário inexistente.

##### 20.4.5 Deve atualizar um usuário com o mesmo nome de usuário quando for o mesmo ID

Este teste verifica se o método "updateUser" atualiza um usuário com o mesmo nome de usuário quando for o mesmo ID.

#### 20.5 Método delete

##### 20.5.1 Deve excluir um usuário

Este teste verifica se o método "deleteUser" é capaz de excluir um usuário corretamente com base no ID fornecido.

##### 20.5.2 Não deve excluir um usuário inexistente

Este teste verifica se o método "deleteUser" não exclui um usuário inexistente.

#### 20.6 Método getUserImages

##### 20.6.1 Deve obter as imagens do usuário

Este teste verifica se o método "getUserImages" é capaz de obter as imagens do usuário corretamente.

##### 20.6.2 Não deve obter as imagens de um usuário inexistente

Este teste verifica se o método "getUserImages" não retorna as imagens de um usuário inexistente.

#### 20.7 Método getUserPosts

##### 20.7.1 Deve obter as postagens do usuário

Este teste verifica se o método "getUserPosts" é capaz de obter as postagens do usuário corretamente.

##### 20.7.2 Não deve obter as postagens de um usuário inexistente

Este teste verifica se o método "getUserPosts" não retorna as postagens de um usuário inexistente.
