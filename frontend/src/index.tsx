import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
    },
    secondary: {
      main: '#667eea',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Service Worker com estratégia Network First para evitar cache antigo
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Primeiro, desregistra todos os service workers antigos
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
        console.log('[SW] Service Worker antigo desregistrado');
      });
      
      // Limpa todos os caches antigos
      if ('caches' in window) {
        caches.keys().then((cacheNames) => {
          cacheNames.forEach((cacheName) => {
            if (cacheName.startsWith('hora-extra-')) {
              caches.delete(cacheName);
              console.log('[SW] Cache antigo removido:', cacheName);
            }
          });
        });
      }
      
      // Aguarda um pouco e registra o novo service worker
      setTimeout(() => {
        navigator.serviceWorker.register('/service-worker.js', {
          updateViaCache: 'none' // Sempre busca versão mais recente do service worker
        })
          .then((registration) => {
            console.log('[SW] Service Worker registrado com sucesso:', registration.scope);
            
            // Verifica atualizações periodicamente
            setInterval(() => {
              registration.update();
            }, 60000); // A cada 1 minuto
            
            // Escuta atualizações do service worker
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'activated') {
                    console.log('[SW] Nova versão ativada, recarregando página...');
                    window.location.reload();
                  }
                });
              }
            });
          })
          .catch((error) => {
            console.error('[SW] Falha ao registrar Service Worker:', error);
          });
      }, 1000);
    });
  });
}
