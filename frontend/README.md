# Hora Extra - Frontend React

Frontend do sistema Hora Extra desenvolvido em React com TypeScript e Material-UI.

## 🚀 Funcionalidades

- ✅ **Autenticação** - Login e registro de usuários
- ✅ **Dashboard** - Estatísticas e gráficos
- ✅ **Gestão de Clientes** - CRUD completo
- ✅ **Controle de Atendimentos** - Iniciar e finalizar atendimentos
- ✅ **Perfil do Usuário** - Edição de dados pessoais
- ✅ **PWA** - Progressive Web App
- ✅ **Responsivo** - Interface adaptável para mobile

## 🛠️ Tecnologias

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Material-UI** - Componentes de interface
- **React Router** - Roteamento
- **Axios** - Requisições HTTP
- **Recharts** - Gráficos
- **Date-fns** - Manipulação de datas

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm start

# Build para produção
npm run build
```

## 🔧 Configuração

O frontend se conecta automaticamente com o backend na porta 3000. Para alterar, configure a variável de ambiente:

```bash
REACT_APP_API_URL=http://localhost:3000
```

## 📱 PWA

O sistema é um PWA completo com:
- Service Worker para cache offline
- Manifest.json para instalação
- Ícones responsivos
- Funciona offline (dados em cache)

## 🎨 Interface

- **Login/Registro** - Autenticação de usuários
- **Home** - Iniciar atendimentos e ver em aberto
- **Dashboard** - Estatísticas e relatórios
- **Clientes** - Gestão de clientes
- **Perfil** - Dados pessoais do usuário

## 🔐 Autenticação

- JWT tokens armazenados no localStorage
- Interceptadores automáticos para adicionar token
- Redirecionamento automático em caso de token inválido

## 📊 Dashboard

- Estatísticas em tempo real
- Gráficos interativos
- Filtros por data
- Lista de atendimentos

## 🎯 Próximos Passos

- [ ] Upload de fotos de perfil
- [ ] Notificações push
- [ ] Modo offline completo
- [ ] Temas personalizáveis
- [ ] Exportação de relatórios
