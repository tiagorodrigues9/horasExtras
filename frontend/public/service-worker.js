// Service Worker para PWA
// Versionamento dinâmico baseado em timestamp para forçar atualizações
const CACHE_VERSION = 'v2.0.0';
const CACHE_NAME = `hora-extra-${CACHE_VERSION}`;
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

// Instalação do Service Worker - força atualização imediata
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando nova versão:', CACHE_VERSION);
  // Força a ativação imediata, pulando a fase de espera
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Cache aberto:', CACHE_NAME);
        // Não cacheia na instalação, apenas na primeira requisição
        return Promise.resolve();
      })
      .catch((error) => {
        console.error('[Service Worker] Erro ao abrir cache:', error);
      })
  );
});

// Ativação do Service Worker - limpa caches antigos
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativando nova versão:', CACHE_VERSION);
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Remove todos os caches que não são da versão atual
          if (cacheName !== CACHE_NAME && cacheName.startsWith('hora-extra-')) {
            console.log('[Service Worker] Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Assume controle de todas as páginas imediatamente
      return self.clients.claim();
    })
  );
});

// Interceptação de requisições - Network First para sempre buscar versão mais recente
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignora requisições que não são GET
  if (request.method !== 'GET') {
    return;
  }
  
  // APIs sempre usam Network First (sem cache)
  if (url.pathname.startsWith('/api/') || 
      url.pathname.includes('/auth/') || 
      url.pathname.includes('/clientes') || 
      url.pathname.includes('/atendimentos')) {
    event.respondWith(
      fetch(request)
        .catch(() => {
          // Apenas em caso de falha total da rede
          return caches.match(request);
        })
    );
    return;
  }
  
  // Para recursos estáticos: Network First com Stale-While-Revalidate
  // Sempre busca a versão mais recente primeiro
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Se a requisição foi bem-sucedida, atualiza o cache
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Se a rede falhar, tenta usar o cache como fallback
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            console.log('[Service Worker] Servindo do cache (offline):', request.url);
          }
          return cachedResponse;
        });
      })
  );
});

// Notificações push
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação do Hora Extra',
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Abrir App',
        icon: '/logo192.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/logo192.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Hora Extra', options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
