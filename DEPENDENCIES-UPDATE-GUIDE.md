# 🔄 Guia de Atualização Automática de Dependências

Este projeto possui dois sistemas para manter as dependências sempre atualizadas:

## 📋 Opções Disponíveis

### 1. **Dependabot (Recomendado - Nativo do GitHub)**
- ✅ Mais simples e integrado ao GitHub
- ✅ Cria PRs individuais para cada dependência
- ✅ Melhor para revisão granular
- ✅ Suporte nativo a atualizações de segurança

### 2. **Workflow Customizado (Mais Controle)**
- ✅ Atualiza todas as dependências de uma vez
- ✅ Mais personalizável
- ✅ Cria um único PR com todas as atualizações

## 🚀 Configuração

### Opção 1: Usar Dependabot (Recomendado)

O Dependabot já está configurado no arquivo `.github/dependabot.yml`. Ele irá:

- ✅ Verificar atualizações **diariamente às 4h da manhã**
- ✅ Criar Pull Requests automaticamente
- ✅ Atualizar dependências do **backend** e **frontend** separadamente
- ✅ Agrupar atualizações de segurança

**Para ativar:**
1. O Dependabot já está configurado, mas você precisa habilitá-lo no GitHub:
   - Vá em **Settings** > **Code security and analysis**
   - Ative **Dependabot alerts** e **Dependabot security updates**

2. Personalize o arquivo `.github/dependabot.yml`:
   - Substitua `"tr364"` pelo seu username do GitHub na seção `reviewers`

### Opção 2: Usar Workflow Customizado

O workflow customizado está em `.github/workflows/update-dependencies.yml` e:

- ✅ Executa **diariamente às 3h da manhã**
- ✅ Pode ser executado manualmente em **Actions** > **Update Dependencies**
- ✅ Cria PRs separados para backend e frontend
- ✅ Só cria PR se houver atualizações disponíveis

**Para ativar:**
1. O workflow já está pronto, mas você precisa garantir que:
   - O repositório tem permissões de escrita habilitadas
   - O GitHub Actions está ativado

2. Para executar manualmente:
   - Vá em **Actions** > **Update Dependencies**
   - Clique em **Run workflow**

## ⚙️ Configurações Avançadas

### Alterar frequência de verificação

#### Dependabot:
Edite `.github/dependabot.yml`:
```yaml
schedule:
  interval: "daily"  # Opções: daily, weekly, monthly
  time: "04:00"
```

#### Workflow Customizado:
Edite `.github/workflows/update-dependencies.yml`:
```yaml
schedule:
  - cron: "0 3 * * *"  # Diariamente às 3h
  # Para semanal: "0 3 * * 1" (toda segunda às 3h)
```

### Atualizar apenas dependências de segurança

#### Dependabot:
Já está configurado para agrupar atualizações de segurança automaticamente.

#### Workflow Customizado:
Adicione a flag `--target minor` ou `--target patch`:
```yaml
run: |
  ncu -u --target patch  # Apenas patches (1.0.0 -> 1.0.1)
```

### Ignorar dependências específicas

Crie um arquivo `.ncurc.json` na raiz do projeto:
```json
{
  "reject": [
    "react",
    "react-dom"
  ]
}
```

Ou no frontend, crie `frontend/.ncurc.json`:
```json
{
  "reject": [
    "typescript"
  ]
}
```

## 📊 Como Funciona

### Dependabot:
1. Verifica atualizações diariamente
2. Cria um PR para cada dependência atualizada
3. Você revisa e aprova cada PR individualmente
4. Mais granular, mas pode gerar muitos PRs

### Workflow Customizado:
1. Verifica atualizações diariamente
2. Atualiza todos os `package.json`
3. Cria um único PR com todas as atualizações
4. Você revisa tudo de uma vez
5. Mais rápido, mas pode ter mais mudanças para revisar

## 🔍 Verificar Atualizações Manualmente

### Backend:
```bash
cd /caminho/do/projeto
npx npm-check-updates
```

### Frontend:
```bash
cd frontend
npx npm-check-updates
```

### Atualizar manualmente:
```bash
# Backend
npx npm-check-updates -u
npm install

# Frontend
cd frontend
npx npm-check-updates -u
npm install
```

## ⚠️ Boas Práticas

1. **Sempre teste localmente** antes de fazer merge dos PRs
2. **Revise as changelogs** das dependências principais
3. **Verifique breaking changes** em atualizações major (1.0.0 -> 2.0.0)
4. **Mantenha backups** antes de atualizar dependências críticas
5. **Use dependências fixas** para bibliotecas críticas (remova `^` ou `~`)

## 🚨 Solução de Problemas

### Dependabot não está criando PRs:
- Verifique se está habilitado em **Settings** > **Code security and analysis**
- Confirme que o arquivo `.github/dependabot.yml` está no repositório
- Verifique os logs em **Insights** > **Dependency graph** > **Dependabot**

### Workflow falha ao criar PR:
- Verifique se o repositório tem permissões de escrita
- Confirme que o `GITHUB_TOKEN` tem permissões adequadas
- Verifique os logs em **Actions**

### Atualizações quebram a aplicação:
- Revise o changelog da dependência
- Teste localmente antes de fazer merge
- Considere usar `--target patch` para atualizações mais conservadoras

## 📝 Recomendação

**Use o Dependabot** se você:
- Quer revisar cada atualização individualmente
- Prefere PRs menores e mais focados
- Quer aproveitar recursos nativos do GitHub

**Use o Workflow Customizado** se você:
- Quer atualizar tudo de uma vez
- Prefere menos PRs para gerenciar
- Quer mais controle sobre o processo

**Você pode usar ambos!** Eles não entram em conflito e podem trabalhar juntos.

## 🔗 Links Úteis

- [Documentação do Dependabot](https://docs.github.com/en/code-security/dependabot)
- [npm-check-updates](https://github.com/raineysander/npm-check-updates)
- [GitHub Actions](https://docs.github.com/en/actions)

