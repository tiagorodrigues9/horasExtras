# 🔐 Configuração do Arquivo .env

## ⚠️ IMPORTANTE

O arquivo `.env` foi adicionado ao `.gitignore` para proteger suas informações sensíveis. **NUNCA** faça commit do arquivo `.env` no Git!

## 📝 Como Criar o Arquivo .env

### 1. Crie o arquivo `.env` na raiz do projeto

Copie o conteúdo do arquivo `env.example` e crie um novo arquivo chamado `.env`:

```bash
# No Windows (PowerShell)
Copy-Item env.example .env

# No Linux/Mac
cp env.example .env
```

### 2. Preencha as variáveis com seus valores reais

Abra o arquivo `.env` e substitua os valores de exemplo pelos seus valores reais:

```env
# Configurações do Banco de Dados MongoDB Atlas
MONGO_USER=seu_usuario_mongodb_real
MONGO_PASS=sua_senha_mongodb_real
MONGO_DB=nome_do_banco_real

# Chave secreta para JWT (IMPORTANTE: Use uma chave forte e única)
JWT_SECRET=uma_chave_secreta_muito_forte_e_aleatoria_aqui

# Porta do servidor (3000 para desenvolvimento local)
PORT=3000

# Ambiente (development para local, production para Render)
NODE_ENV=development

# URL da API (deixe vazio para desenvolvimento local)
REACT_APP_API_URL=

# URL do Frontend (deixe vazio para desenvolvimento local)
FRONTEND_URL=
```

## 🔑 Variáveis Obrigatórias

### Para Desenvolvimento Local:

1. **MONGO_USER**: Seu usuário do MongoDB Atlas
2. **MONGO_PASS**: Sua senha do MongoDB Atlas
3. **MONGO_DB**: Nome do banco de dados
4. **JWT_SECRET**: Uma chave secreta forte (pode gerar uma aleatória)
5. **NODE_ENV**: `development` para local

### Para Produção (Render):

No painel do Render, adicione as mesmas variáveis em **Settings > Environment**:

```env
MONGO_USER=seu_usuario_mongodb
MONGO_PASS=sua_senha_mongodb
MONGO_DB=nome_do_banco
JWT_SECRET=sua_chave_secreta_super_forte
NODE_ENV=production
PORT=10000
REACT_APP_API_URL=https://horasextras.onrender.com
FRONTEND_URL=https://horasextras.onrender.com
```

## 🔒 Gerar JWT_SECRET Seguro

Você pode gerar uma chave secreta segura usando:

### Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Online:
- [RandomKeygen](https://randomkeygen.com/)
- Use uma string aleatória de pelo menos 32 caracteres

## ✅ Verificar se está funcionando

Após criar o `.env`, teste se está funcionando:

```bash
# Instalar dependências
npm install

# Iniciar o servidor
npm start
```

Se aparecer "Conectado ao MongoDB Atlas!" no console, está tudo certo! ✅

## 🚨 Problemas Comuns

### Erro: "JWT_SECRET não definido"
- Verifique se o arquivo `.env` existe na raiz do projeto
- Confirme que a variável `JWT_SECRET` está preenchida
- Reinicie o servidor após criar/editar o `.env`

### Erro: "MongoDB connection failed"
- Verifique se `MONGO_USER`, `MONGO_PASS` e `MONGO_DB` estão corretos
- Confirme que o IP está liberado no MongoDB Atlas (0.0.0.0/0)
- Teste a string de conexão manualmente

### Variáveis não estão sendo lidas
- Certifique-se de que o arquivo se chama exatamente `.env` (com o ponto)
- Verifique se está na raiz do projeto (mesmo nível do `package.json`)
- Reinicie o servidor após criar/editar o arquivo

## 📋 Checklist

- [ ] Arquivo `.env` criado na raiz do projeto
- [ ] Todas as variáveis obrigatórias preenchidas
- [ ] `JWT_SECRET` é uma chave forte e única
- [ ] Credenciais do MongoDB estão corretas
- [ ] Arquivo `.env` está no `.gitignore` (já está configurado)
- [ ] Servidor inicia sem erros

---

**⚠️ LEMBRE-SE**: Nunca faça commit do arquivo `.env`! Ele contém informações sensíveis.

