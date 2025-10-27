# Guia de Deploy no Render

## Problemas Corrigidos

### ✅ 1. API URL Configuration
- O frontend agora usa `REACT_APP_API_URL` para determinar a URL da API
- Em produção, você precisa definir esta variável no Render

### ✅ 2. CORS Configuration
- CORS configurado corretamente para aceitar requisições da URL do Render
- Suporta desenvolvimento local e produção

### ✅ 3. Authentication Flow
- Corrigido o fluxo de autenticação para usar os dados do middleware corretamente
- Token handling otimizado

### ✅ 4. Manifest Icons
- Corrigido o tipo de arquivo dos ícones no manifest.json

---

## Configuração no Render

### Variáveis de Ambiente Necessárias

No painel do Render, adicione as seguintes variáveis de ambiente:

#### Obrigatórias:
```env
MONGO_USER=seu_usuario_mongodb
MONGO_PASS=sua_senha_mongodb
MONGO_DB=nome_do_banco
JWT_SECRET=sua_chave_secreta_super_forte_aqui_123456789
NODE_ENV=production
PORT=3000
```

#### Importantes para Produção:
```env
REACT_APP_API_URL=https://horasextras.onrender.com
FRONTEND_URL=https://horasextras.onrender.com
```

> **⚠️ IMPORTANTE**: Substitua `horasextras.onrender.com` pela URL real do seu serviço no Render!

---

## Build Command

O Render deve usar o seguinte comando para build:
```bash
npm run build
```

Este comando irá:
1. Instalar dependências do backend
2. Ir para a pasta frontend
3. Instalar dependências do frontend
4. Fazer build do React

---

## Start Command

```bash
npm start
```

---

## Verificação Pós-Deploy

Após fazer o deploy, verifique:

1. ✅ O servidor inicia sem erros
2. ✅ Consegue acessar a aplicação pela URL do Render
3. ✅ A página de login carrega
4. ✅ Consegue criar conta nova
5. ✅ Consegue fazer login
6. ✅ Os ícones do manifest não dão erro

---

## Solução de Problemas

### Erro: "Failed to load resource"
- **Problema**: Frontend tentando conectar em `localhost:3000`
- **Solução**: Verifique se `REACT_APP_API_URL` está configurado corretamente

### Erro: CORS
- **Problema**: Requisições sendo bloqueadas
- **Solução**: Verifique se `FRONTEND_URL` está configurada com a URL correta do Render

### Erro: "JWT_SECRET não definido"
- **Problema**: Variável de ambiente não configurada
- **Solução**: Adicione `JWT_SECRET` nas variáveis de ambiente do Render

### Erro de Ícones
- **Problema**: Ícones não encontrados
- **Solução**: Build do frontend não foi concluído corretamente
- **Verificar**: Comando de build está executando?

---

## Arquivos Modificados

1. `frontend/public/manifest.json` - Corrigido tipo de ícones
2. `index.js` - Configuração CORS melhorada
3. `controllers/authController.js` - Fluxo de autenticação otimizado
4. `services/authService.js` - Novas funções para auth por ID
5. `frontend/src/services/api.ts` - Já configura `REACT_APP_API_URL`

---

## Próximos Passos

1. Commit e push das mudanças para o repositório
2. Configure as variáveis de ambiente no Render
3. Aguarde o build e deploy automático
4. Teste a aplicação

