# 🔄 Configuração do Keep Render Awake

Este workflow do GitHub Actions mantém sua aplicação no Render sempre acordada, fazendo requisições periódicas para evitar que o serviço entre em modo de suspensão.

## 📋 O que foi criado

1. **Rota `/health`** - Adicionada no `index.js` para responder às requisições de health check
2. **Workflow GitHub Actions** - Arquivo `.github/workflows/keep-awake.yml` que executa requisições automáticas

## ⚙️ Configuração

### 1. Configurar Secrets no GitHub

No seu repositório GitHub, vá em **Settings > Secrets and variables > Actions** e adicione:

#### Obrigatório:
- **`RENDER_URL`** (opcional): URL completa da sua aplicação no Render
  - Exemplo: `https://horasextras.onrender.com`
  - Se não configurar, usará `https://horasextras.onrender.com` como padrão

#### Opcional:
- **`DISCORD_WEBHOOK`**: URL do webhook do Discord para receber notificações
  - Se não configurar, o workflow funcionará normalmente, apenas sem notificações no Discord

### 2. Como adicionar Secrets:

1. Acesse seu repositório no GitHub
2. Vá em **Settings** (Configurações)
3. No menu lateral, clique em **Secrets and variables** > **Actions**
4. Clique em **New repository secret**
5. Adicione o nome e valor do secret
6. Clique em **Add secret**

### 3. Ativar o Workflow

O workflow já está configurado para executar automaticamente:
- **A cada 15 minutos** das **7h às 23h59**
- **A cada 15 minutos** das **0h às 2h**
- Você também pode executar manualmente em **Actions** > **Keep Render Awake** > **Run workflow**

## 🕐 Horários de Execução

O workflow está configurado para:
- **7h às 23h59**: Ping a cada 15 minutos (horário de maior uso)
- **0h às 2h**: Ping a cada 15 minutos (horário de menor uso, mas ainda ativo)
- **2h às 7h**: Sem pings (período de menor atividade)

Se precisar manter ativo 24h, você pode editar o arquivo `.github/workflows/keep-awake.yml` e adicionar mais horários.

## ✅ Verificar se está funcionando

1. Acesse **Actions** no seu repositório GitHub
2. Você verá o workflow "Keep Render Awake" executando
3. Clique em uma execução para ver os logs
4. Verifique se a requisição foi bem-sucedida (status 200)

## 🔧 Personalizar

### Alterar frequência dos pings:

Edite o arquivo `.github/workflows/keep-awake.yml` e modifique os valores do `cron`:

```yaml
# A cada 10 minutos (em vez de 15)
- cron: "*/10 7-23 * * *"
```

### Adicionar mais horários:

```yaml
schedule:
  - cron: "*/15 7-23 * * *"  # 7h às 23h59
  - cron: "*/15 0-2 * * *"   # 0h às 2h
  - cron: "*/15 3-6 * * *"   # 3h às 6h (novo horário)
```

### Testar a rota `/health` manualmente:

```bash
curl https://horasextras.onrender.com/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 1234.56
}
```

## 📝 Notas

- O Render Free Plan suspende serviços após 15 minutos de inatividade
- Este workflow mantém o serviço sempre ativo fazendo requisições regulares
- As requisições são leves e não consomem muitos recursos
- O workflow usa apenas os minutos gratuitos do GitHub Actions (2000 minutos/mês para contas gratuitas)

## 🚨 Solução de Problemas

### Workflow não está executando:
- Verifique se o arquivo está no caminho correto: `.github/workflows/keep-awake.yml`
- Confirme que o repositório tem Actions habilitadas
- Verifique se há erros de sintaxe YAML

### Erro 404 na requisição:
- Verifique se a URL do Render está correta
- Confirme que a rota `/health` está funcionando
- Teste manualmente: `curl https://sua-url.onrender.com/health`

### Erro de autenticação:
- Verifique se não há proteção de autenticação na rota `/health`
- A rota `/health` deve ser pública e não requerer autenticação

