# Ícones PWA - Hora Extra

Este diretório contém os ícones necessários para o Progressive Web App.

## Arquivos gerados:
- icon-72x72.svg
- icon-96x96.svg
- icon-128x128.svg
- icon-144x144.svg
- icon-152x152.svg
- icon-192x192.svg
- icon-384x384.svg
- icon-512x512.svg

## Como converter SVG para PNG:

### Opção 1: Usando Inkscape (recomendado)
```bash
# Instalar Inkscape primeiro
# Depois executar para cada tamanho:
inkscape --export-png=icon-192x192.png --export-width=192 --export-height=192 icon-192x192.svg
```

### Opção 2: Usando online converter
1. Acesse: https://convertio.co/svg-png/
2. Faça upload dos arquivos SVG
3. Configure o tamanho correto
4. Baixe os PNGs

### Opção 3: Usando Node.js com sharp
```bash
npm install sharp
node converter-svg-to-png.js
```

## Ícones necessários para PWA:
- icon-72x72.png
- icon-96x96.png  
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

Todos os ícones devem ter fundo transparente ou sólido e ser otimizados para web.
