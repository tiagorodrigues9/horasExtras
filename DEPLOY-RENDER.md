# 🚀 Deploy no Render - Guia Completo

## 📋 **Pré-requisitos**

1. **Conta no Render** - [render.com](https://render.com)
2. **Conta no MongoDB Atlas** - [mongodb.com/atlas](https://mongodb.com/atlas)
3. **Repositório no GitHub** (recomendado)

## 🔧 **Configuração do MongoDB Atlas**

### **1. Criar Cluster no MongoDB Atlas:**
1. Acesse [mongodb.com/atlas](https://mongodb.com/atlas)
2. Crie uma conta gratuita
3. Crie um novo cluster (M0 - Free)
4. Configure usuário e senha do banco
5. Configure acesso de rede (0.0.0.0/0 para permitir qualquer IP)

### **2. Obter String de Conexão:**
```
<!-- mongodb+srv://SEU_USUARIO:SUA_SENHA@cluster0.xxxxx.mongodb.net/NOME_DO_BANCO?retryWrites=true&w=majority -->
```

## 🚀 **Deploy no Render**

### **Método 1: Deploy via GitHub (Recomendado)**

#### **1. Preparar o Repositório:**
```bash
# Instalar dependências do frontend
cd frontend
npm install

# Fazer build do frontend
npm run build

# Voltar para a raiz
cd ..

# Instalar dependências do backend
npm install

# Testar localmente
npm start
```

#### **2. Subir para o GitHub:**
```bash
git add .
git commit -m "Preparar para deploy no Render"
git push origin main
```

#### **3. Configurar no Render:**
1. Acesse [render.com](https://render.com)
2. Clique em "New +" > "Web Service"
3. Conecte seu repositório GitHub
4. Configure:
   - **Name**: `hora-extra`
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

#### **4. Configurar Variáveis de Ambiente:**
No painel do Render, vá em "Environment" e adicione:

```
MONGO_USER=seu_usuario_mongodb
MONGO_PASS=sua_senha_mongodb
MONGO_DB=horaextra
JWT_SECRET=sua_chave_secreta_super_forte_123456789
NODE_ENV=production
```

### **Método 2: Deploy Manual**

#### **1. Criar Web Service no Render:**
1. Acesse [render.com](https://render.com)
2. Clique em "New +" > "Web Service"
3. Selecione "Build and deploy from a Git repository"
4. Cole a URL do seu repositório GitHub

#### **2. Configurações do Serviço:**
- **Name**: `hora-extra`
- **Environment**: `Node`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Plan**: `Free`

## 🔐 **Configuração das Variáveis de Ambiente**

### **Variáveis Obrigatórias:**
```env
MONGO_USER=seu_usuario_mongodb
MONGO_PASS=sua_senha_mongodb
MONGO_DB=horaextra
JWT_SECRET=sua_chave_secreta_super_forte_123456789
NODE_ENV=production
```

### **Como Configurar no Render:**
1. Vá para o painel do seu serviço
2. Clique em "Environment"
3. Adicione cada variável:
   - **Key**: `MONGO_USER`
   - **Value**: `seu_usuario_mongodb`
4. Repita para todas as variáveis

## 📱 **Configuração PWA**

### **HTTPS Automático:**
- O Render fornece HTTPS automaticamente
- PWA funcionará perfeitamente
- Service Worker será registrado automaticamente

### **Domínio Personalizado (Opcional):**
1. No painel do Render
2. Vá em "Settings" > "Custom Domains"
3. Adicione seu domínio
4. Configure DNS conforme instruções

## 🔍 **Verificação do Deploy**

### **1. Testar a Aplicação:**
1. Acesse a URL fornecida pelo Render
2. Teste o login/cadastro
3. Verifique se o PWA funciona
4. Teste instalação no mobile

### **2. Verificar Logs:**
1. No painel do Render
2. Vá em "Logs"
3. Verifique se não há erros
4. Confirme que o build foi bem-sucedido

## 🚨 **Solução de Problemas**

### **Erro: "JWT_SECRET não definido"**
- Verifique se a variável `JWT_SECRET` está configurada
- Certifique-se de que não há espaços extras

### **Erro: "MongoDB connection failed"**
- Verifique as credenciais do MongoDB Atlas
- Confirme que o IP está liberado (0.0.0.0/0)
- Teste a string de conexão

### **Erro: "Build failed"**
- Verifique se todas as dependências estão no `package.json`
- Confirme que o comando de build está correto
- Verifique os logs de build

### **Frontend não carrega:**
- Verifique se o build do frontend foi executado
- Confirme que a pasta `frontend/build` existe
- Verifique se o `NODE_ENV=production` está definido

## 📊 **Monitoramento**

### **Render Dashboard:**
- Uptime do serviço
- Logs em tempo real
- Métricas de performance
- Alertas de erro

### **MongoDB Atlas:**
- Monitoramento do banco
- Logs de conexão
- Métricas de uso

## 💰 **Custos**

### **Render Free Plan:**
- ✅ 750 horas/mês gratuitas
- ✅ HTTPS incluído
- ✅ Deploy automático
- ⚠️ Serviço "dorme" após 15min de inatividade

### **Upgrade para Paid Plan:**
- Sempre online
- Domínio personalizado
- Mais recursos
- Suporte prioritário

## 🎯 **Próximos Passos**

1. **Testar completamente** a aplicação
2. **Configurar domínio personalizado** (opcional)
3. **Configurar backup** do MongoDB
4. **Monitorar performance**
5. **Configurar alertas** de erro

## 📞 **Suporte**

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **MongoDB Atlas Docs**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **PWA Guide**: [web.dev/progressive-web-apps](https://web.dev/progressive-web-apps)

---

**🎉 Sua aplicação estará online em poucos minutos!**
