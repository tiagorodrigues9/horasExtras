# 🚀 Como Executar o Projeto React

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Backend Node.js rodando na porta 3000

## 🛠️ Instalação

### 1. Instalar dependências do Frontend
```bash
cd frontend
npm install
```

### 2. Iniciar o Backend (em outro terminal)
```bash
cd C:\Users\Keilla\Desktop\horasExtras
npm start
```

### 3. Iniciar o Frontend
```bash
cd frontend
npm start
```

## 🌐 Acessar o Sistema

- **Frontend React**: http://localhost:3001
- **Backend API**: http://localhost:3000

## 📱 Funcionalidades Implementadas

### ✅ **Páginas Criadas:**
- **Login** - Autenticação de usuários
- **Registro** - Cadastro de novos usuários
- **Home** - Iniciar atendimentos e ver em aberto
- **Dashboard** - Estatísticas e gráficos
- **Clientes** - Gestão de clientes
- **Perfil** - Dados pessoais

### ✅ **Recursos:**
- **Material-UI** - Interface moderna e responsiva
- **TypeScript** - Tipagem estática
- **Context API** - Gerenciamento de estado
- **Axios** - Requisições HTTP
- **Recharts** - Gráficos interativos
- **React Router** - Navegação

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env` na pasta `frontend`:
```env
REACT_APP_API_URL=http://localhost:3000
```

### Proxy
O `package.json` já está configurado com proxy para o backend.

## 📊 Comparação com o Projeto Original

| Recurso | Original (HTML) | React |
|---------|----------------|-------|
| **Interface** | HTML/CSS/JS | Material-UI |
| **Estado** | LocalStorage | Context API |
| **Componentes** | Monolítico | Modular |
| **Tipagem** | JavaScript | TypeScript |
| **Manutenção** | Difícil | Fácil |
| **Performance** | Básica | Otimizada |

## 🎯 Vantagens do React

1. **Componentização** - Código reutilizável
2. **Estado Global** - Gerenciamento eficiente
3. **TypeScript** - Menos erros em tempo de execução
4. **Material-UI** - Interface profissional
5. **Performance** - Renderização otimizada
6. **Manutenibilidade** - Código organizado

## 🚀 Próximos Passos

1. **Testar todas as funcionalidades**
2. **Configurar PWA** (Service Worker)
3. **Adicionar testes unitários**
4. **Otimizar performance**
5. **Deploy em produção**

## 📱 PWA

Para ativar o PWA, adicione um Service Worker:
```bash
npm install workbox-webpack-plugin
```

## 🎨 Personalização

### Temas
Edite o tema em `src/index.tsx`:
```typescript
const theme = createTheme({
  palette: {
    primary: { main: '#3b82f6' },
    secondary: { main: '#667eea' },
  },
});
```

### Componentes
Todos os componentes estão em `src/pages/` e `src/components/`

## 🔍 Debugging

### Console do Navegador
- Abra F12 para ver logs
- Verifique a aba Network para requisições

### React DevTools
- Instale a extensão do Chrome
- Inspecione componentes e estado

## 📞 Suporte

Se encontrar problemas:
1. Verifique se o backend está rodando
2. Confirme se as dependências foram instaladas
3. Verifique os logs do console
4. Teste a API diretamente no Postman
