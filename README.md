# Wayne Industries

**Wayne Industries** é um aplicativo de gerenciamento de login e autenticação, desenvolvido utilizando Node.js e Next.js. O projeto tem como objetivo fornecer um sistema de login seguro e redirecionamento com base nas permissões de usuário (administrador ou usuário comum).

## Funcionalidades

1. **Login e Autenticação**: Permite que os usuários se autentiquem utilizando email e senha.
2. **Autorização**: Redireciona os usuários para páginas específicas dependendo se são administradores ou usuários comuns, com base no token JWT.
3. **Armazenamento do Token**: Armazena o token JWT no `localStorage` para autenticação persistente.

## Tecnologias Utilizadas

- **Backend**: Node.js com Express.js e TypeScript
- **Frontend**: Next.js, Axios, ReactQuery
- **Banco de Dados**: Prisma (ORM), Neon (PostgreSql)
- **Autenticação**: JWT (JSON Web Token)
- **Estilização**: Tailwind CSS e ShadCN

## Instalação

Siga as etapas abaixo para configurar e executar o projeto localmente:

### 1. Clone o repositório

```
git clone https://github.com/Nickdtt/Wayne-industries.git
cd Wayne-industries
```


### 2. Instale as dependências
Para o backend, navegue até a pasta do backend e instale as dependências:

```
cd backend
npm install
```

### 3. Configuração do Banco de Dados
Certifique-se de que o banco de dados esteja configurado corretamente. Utilize o Prisma para gerar as migrações do banco de dados:

```
npx prisma migrate dev
```
### 4. Executando o Backend
No diretório backend, execute o servidor Node.js:

```
npx nodemon

```
Isso irá iniciar o backend em http://localhost:3004 (ou o URL configurado no seu código).

### 5. Executando Frontend
No diretório frontend, execute o servidor Next.js:

```
npm run dev

```
## Teste de Login

Ao realizar o login, o sistema direciona os usuários para páginas específicas com base em suas permissões. 

- **Administrador**: Será direcionado para a página do **Dashboard**, onde poderá adicionar itens e gerar relatórios.
- **Usuário Comum**: Será direcionado para uma página que confirma que o **login foi autorizado**.

Para testar o login, utilize as seguintes credenciais:

### 1. **Administrador**:
- **Email**: admin@admin.com
- **Senha**: 612662nf
- **Redirecionamento após login**: Página do **Dashboard** (onde o administrador pode adicionar itens e gerar relatórios).

### 2. **Usuário Comum**:
- **Email**: user@user.com
- **Senha**: 612662
- **Redirecionamento após login**: Página de **Login autorizado**.

## Como Testar

1. Acesse a tela de login do sistema.
2. Para testar como **Administrador**, insira o email `admin@admin.com` e a senha `612662nf`.
3. Para testar como **Usuário Comum**, insira o email `user@user.com` e a senha `612662`.
4. Após o login, você será redirecionado para a página correspondente à sua permissão.

