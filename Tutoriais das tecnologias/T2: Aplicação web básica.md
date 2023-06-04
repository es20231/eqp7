# Tutorial 2 
## Como criar uma aplicação web básica mostrando um formulário html, por exemplo: exibir um formulário de cadastro de usuário (usuario, nome completo, email, senha).

### Passo 1: Configurar o ambiente de desenvolvimento
Certifique-se de ter o Node.js instalado no seu sistema. Você pode verificar a instalação executando node -v no terminal. Se o Node.js não estiver instalado, baixe-o e instale-o a partir do site oficial do Node.js.

``` bash
eduardo@eduardo-HP-Pavilion-dv6-Notebook-PC:~/Área de Trabalho/Engenharia de Software II/Tutoriais/T2$
 node -v
v20.2.0
```
### Passo 2: Criar um novo projeto Next.js

Abra um terminal e execute o seguinte comando para criar um novo projeto Next.js:

``` bash
Copy code
npx create-next-app nome-do-projeto
```
Isso criará uma nova pasta com o nome fornecido e configurará um projeto Next.js básico.
Saída:

``` bash
✔ Would you like to use TypeScript with this project? … No / Yes
✔ Would you like to use ESLint with this project? … No / Yes
✔ Would you like to use Tailwind CSS with this project? … No / Yes
✔ Would you like to use `src/` directory with this project? … No / Yes
✔ Use App Router (recommended)? … No / Yes
✔ Would you like to customize the default import alias? … No / Yes
Creating a new Next.js app in /home/eduardo/Área de Trabalho/Engenharia de Software II/Tutoriais/T2/form.

Using npm.

Initializing project with template: app-tw 


Installing dependencies:
- react
- react-dom
- next
- typescript
- @types/react
- @types/node
- @types/react-dom
- tailwindcss
- postcss
- autoprefixer
- eslint
- eslint-config-next


added 352 packages, and audited 353 packages in 59s

136 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Initialized a git repository.

Success! Created form at /home/eduardo/Área de Trabalho/Engenharia de Software II/Tutoriais/T2/form
```
