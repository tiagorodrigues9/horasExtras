# 🔧 Troubleshooting: Keep Render Awake

## 🐛 Problema: Workflow não está pingando / Aplicação ainda demora para carregar

## ✅ Melhorias Aplicadas

1. **Frequência aumentada**: De 15 minutos para **10 minutos** (24h por dia)
2. **Cobertura completa**: Agora pinga **24 horas por dia**, sem gaps
3. **Melhor tratamento de erros**: Logs detalhados e fallback para `/ping`
4. **Timeout configurado**: 30 segundos para evitar travamentos
5. **Rota alternativa**: Adicionada rota `/ping` como fallback

## 🔍 Como Verificar se Está Funcionando

### 1. Verificar se o Workflow está Executando

1. Vá no seu repositório GitHub
2. Clique em **Actions**
3. Procure por **"Keep Render Awake"**
4. Verifique se há execuções recentes (deve ter uma a cada 10 minutos)
5. Clique em uma execução para ver os logs

### 2. Testar Manualmente

Execute o workflow manualmente:

1. Vá em **Actions** > **Keep Render Awake**
2. Clique em **Run workflow**
3. Selecione a branch `main`
4. Clique em **Run workflow**
5. Aguarde alguns segundos e clique na execução para ver os logs

### 3. Verificar se a Rota /health Está Funcionando

Teste diretamente no navegador ou terminal:

```bash
# Teste a rota /health
curl https://horasextras.onrender.com/health

# Ou teste /ping
curl https://horasextras.onrender.com/ping
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 1234.56,
  "service": "hora-extra"
}
```

### 4. Verificar Logs do Workflow

Nos logs do workflow, você deve ver:
- ✅ `🔄 Fazendo ping em: https://horasextras.onrender.com/health`
- ✅ `📊 Status HTTP: 200`
- ✅ `✅ Ping bem-sucedido!`

Se aparecer:
- ❌ `Status HTTP: 000` → Aplicação está suspensa ou offline
- ❌ `Status HTTP: 404` → Rota não encontrada (verifique se o deploy está atualizado)
- ❌ `Status HTTP: 500` → Erro no servidor

## 🚨 Problemas Comuns e Soluções

### Problema 1: Workflow não está executando

**Sintomas:**
- Não há execuções em **Actions**
- Workflow não aparece na lista

**Soluções:**
1. Verifique se o arquivo está em `.github/workflows/keep-awake.yml`
2. Verifique se o arquivo foi commitado e está na branch `main`
3. Verifique se o GitHub Actions está habilitado:
   - Vá em **Settings** > **Actions** > **General**
   - Certifique-se de que "Allow all actions and reusable workflows" está selecionado

### Problema 2: Workflow executa mas falha

**Sintomas:**
- Workflow aparece em Actions mas falha (❌)
- Logs mostram erro de conexão

**Soluções:**
1. Verifique se a URL está correta:
   - Vá em **Settings** > **Secrets and variables** > **Actions**
   - Verifique se `RENDER_URL` está configurado corretamente
   - Ou use a URL padrão: `https://horasextras.onrender.com`

2. Teste a URL manualmente:
   ```bash
   curl https://horasextras.onrender.com/health
   ```

3. Verifique se a aplicação está online:
   - Acesse a URL no navegador
   - Se não carregar, a aplicação pode estar suspensa

### Problema 3: Workflow executa mas aplicação ainda demora

**Sintomas:**
- Workflow executa com sucesso (✅)
- Mas aplicação ainda demora para carregar

**Possíveis causas:**
1. **Frequência insuficiente**: Render pode suspender em menos de 10 minutos
   - **Solução**: Edite o workflow para pingar a cada 5 minutos

2. **Aplicação não está respondendo**: Rota /health pode estar lenta
   - **Solução**: Verifique os logs do Render para ver se há erros

3. **Cache do navegador**: Pode estar servindo versão antiga
   - **Solução**: Limpe o cache do navegador (Ctrl+Shift+Delete)

### Problema 4: Rota /health retorna 404

**Sintomas:**
- Workflow mostra `Status HTTP: 404`
- Rota não encontrada

**Soluções:**
1. Verifique se o código foi deployado:
   - Faça commit e push das mudanças
   - Aguarde o deploy no Render

2. Verifique se a rota está no código:
   - Abra `index.js`
   - Procure por `app.get("/health"`

3. Teste localmente:
   ```bash
   npm start
   curl http://localhost:3000/health
   ```

## 🔧 Ajustes Avançados

### Aumentar Frequência (Ping a cada 5 minutos)

Edite `.github/workflows/keep-awake.yml`:

```yaml
schedule:
  - cron: "*/5 * * * *"  # A cada 5 minutos
```

### Adicionar Mais Endpoints

Se quiser pingar múltiplos endpoints:

```yaml
- name: Ping Health
  run: curl ${RENDER_URL}/health

- name: Ping Root
  run: curl ${RENDER_URL}/
```

### Configurar Notificações no Discord

1. Crie um webhook no Discord
2. Vá em **Settings** > **Secrets and variables** > **Actions**
3. Adicione `DISCORD_WEBHOOK` com a URL do webhook
4. Você receberá notificações de cada ping

## 📊 Monitoramento

### Verificar Últimas Execuções

```bash
# Via GitHub CLI (se tiver instalado)
gh run list --workflow=keep-awake.yml --limit 10
```

### Verificar Status da Aplicação

1. Acesse o painel do Render
2. Vá em **Logs**
3. Verifique se há requisições para `/health` ou `/ping`
4. Verifique o tempo de resposta

## ✅ Checklist de Verificação

- [ ] Workflow está em `.github/workflows/keep-awake.yml`
- [ ] Workflow foi commitado e está na branch `main`
- [ ] GitHub Actions está habilitado
- [ ] Workflow aparece em **Actions** > **Keep Render Awake**
- [ ] Há execuções recentes (últimas 24h)
- [ ] Logs mostram `Status HTTP: 200`
- [ ] Rota `/health` funciona quando testada manualmente
- [ ] Aplicação está respondendo no Render
- [ ] URL está correta (verifique o secret `RENDER_URL`)

## 🚀 Próximos Passos

1. **Teste manualmente**: Execute o workflow manualmente e verifique os logs
2. **Verifique a rota**: Teste `/health` diretamente no navegador
3. **Monitore por 24h**: Veja se a aplicação não suspende mais
4. **Ajuste frequência**: Se ainda suspender, aumente para 5 minutos

---

**💡 Dica**: Se o problema persistir, considere fazer upgrade do plano do Render para um plano pago que não suspende automaticamente.

