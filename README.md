# 🕐 Hora Extra - Sistema de Gestão de Atendimentos

Sistema completo para gestão de horas extras e atendimentos, desenvolvido com **Node.js/Express** (backend) e **React/TypeScript** (frontend).

## ✨ Funcionalidades

- 🔐 **Autenticação segura** com JWT
- 👥 **Gestão de clientes** com validação de CNPJ
- ⏱️ **Controle de atendimentos** em tempo real
- 📊 **Dashboard com estatísticas** e gráficos interativos
- 📱 **PWA** (Progressive Web App) para uso offline
- 📈 **Relatórios exportáveis** (Excel, JSON)
- 🎨 **Interface moderna** com Material-UI

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+ 
- MongoDB Atlas (ou MongoDB local)
- npm ou yarn

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd horasExtras
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Configurações do Banco de Dados MongoDB
MONGO_USER=seu_usuario_mongodb
MONGO_PASS=sua_senha_mongodb
MONGO_DB=nome_do_banco

# Configurações de Segurança
JWT_SECRET=sua_chave_secreta_jwt_muito_forte_aqui

# Configurações do Servidor
PORT=3000
NODE_ENV=development
```

### 3. Execute o projeto

```bash
# Terminal 1 - Backend
npm install
npm start

# Terminal 2 - Frontend React
cd frontend
npm install
npm start
```

### 4. Acessar o sistema

- **Frontend React**: http://localhost:3001
- **Backend API**: http://localhost:3000

## 🔧 Configuração do MongoDB

### MongoDB Atlas (Recomendado)

1. Acesse [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crie uma conta gratuita
3. Crie um cluster
4. Configure um usuário de banco de dados
5. Obtenha a string de conexão
6. Configure as variáveis de ambiente

### MongoDB Local

```bash
# Instalar MongoDB
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb

# Windows
# Baixe do site oficial: https://www.mongodb.com/try/download/community
```

## 📱 PWA (Progressive Web App)

O sistema é um PWA completo com:

- ✅ Service Worker para cache offline
- ✅ Manifest.json para instalação
- ✅ Ícones responsivos
- ✅ Funciona offline (dados em cache)

### Instalação no dispositivo

1. Acesse o sistema no navegador
2. Clique no ícone de instalação na barra de endereços
3. Ou use o menu do navegador > "Instalar app"

## 🛡️ Segurança

- ✅ JWT com chave secreta obrigatória
- ✅ Validação de entrada em todos os endpoints
- ✅ Sanitização de dados
- ✅ Senhas criptografadas com bcrypt
- ✅ Validação de CNPJ
- ✅ Validação de email

## 📊 API Endpoints

### Autenticação
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Login
- `GET /auth/me` - Dados do usuário logado
- `PUT /auth/perfil` - Atualizar perfil

### Clientes
- `GET /clientes` - Listar clientes
- `POST /clientes` - Criar cliente

### Atendimentos
- `GET /atendimentos` - Listar atendimentos em aberto
- `POST /atendimentos/iniciar` - Iniciar atendimento
- `PUT /atendimentos/finalizar/:id` - Finalizar atendimento
- `GET /atendimentos/estatisticas` - Estatísticas

## 🎨 Interface

- **Home**: Iniciar novos atendimentos e ver atendimentos em aberto
- **Dashboard**: Estatísticas, gráficos e relatórios
- **Cadastrar Cliente**: Formulário com validação de CNPJ
- **Perfil**: Atualizar dados pessoais e foto

## 🔍 Validações

- **CNPJ**: Validação completa com dígitos verificadores
- **Email**: Formato válido obrigatório
- **Senha**: Mínimo 6 caracteres
- **Campos obrigatórios**: Validação em todos os formulários

## 🚨 Problemas Conhecidos e Soluções

### 1. JWT_SECRET não definido
**Erro**: `JWT_SECRET não definido nas variáveis de ambiente`
**Solução**: Configure a variável JWT_SECRET no arquivo .env

### 2. Erro de conexão com MongoDB
**Erro**: `Erro ao conectar ao MongoDB Atlas`
**Solução**: Verifique as credenciais no arquivo .env

### 3. CNPJ inválido
**Erro**: `CNPJ inválido`
**Solução**: O sistema valida CNPJ com dígitos verificadores

## 📝 Logs

O sistema registra logs importantes:
- ✅ Conexão com banco de dados
- ✅ Erros de validação
- ✅ Erros de autenticação
- ✅ Operações de atendimento

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 🆘 Suporte

Para suporte, abra uma issue no repositório ou entre em contato.

---

**Desenvolvido com ❤️ para facilitar a gestão de horas extras**
