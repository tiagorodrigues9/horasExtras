// Script para gerar ícones PWA
// Execute com: node gerar-icones.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SVG base para os ícones
const svgTemplate = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Fundo -->
  <rect width="192" height="192" rx="20" fill="url(#gradient)"/>
  
  <!-- Círculo do relógio -->
  <circle cx="96" cy="96" r="60" fill="none" stroke="white" stroke-width="8"/>
  
  <!-- Ponteiro das horas (3 horas) -->
  <line x1="96" y1="96" x2="120" y2="84" stroke="white" stroke-width="4" stroke-linecap="round"/>
  
  <!-- Ponteiro dos minutos (12 horas) -->
  <line x1="96" y1="96" x2="96" y2="60" stroke="white" stroke-width="4" stroke-linecap="round"/>
  
  <!-- Centro do relógio -->
  <circle cx="96" cy="96" r="6" fill="white"/>
  
  <!-- Marcações das horas -->
  <circle cx="96" cy="36" r="3" fill="white"/>
  <circle cx="156" cy="96" r="3" fill="white"/>
  <circle cx="96" cy="156" r="3" fill="white"/>
  <circle cx="36" cy="96" r="3" fill="white"/>
</svg>`;

// Tamanhos necessários
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Criar pasta de ícones se não existir
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Gerar arquivos SVG para cada tamanho
sizes.forEach(size => {
  const svgContent = svgTemplate(size);
  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(iconsDir, filename);
  
  fs.writeFileSync(filepath, svgContent);
  console.log(`✅ Criado: ${filename}`);
});

// Criar um arquivo README com instruções
const readmeContent = `# Ícones PWA - Hora Extra

Este diretório contém os ícones necessários para o Progressive Web App.

## Arquivos gerados:
${sizes.map(size => `- icon-${size}x${size}.svg`).join('\n')}

## Como converter SVG para PNG:

### Opção 1: Usando Inkscape (recomendado)
\`\`\`bash
# Instalar Inkscape primeiro
# Depois executar para cada tamanho:
inkscape --export-png=icon-192x192.png --export-width=192 --export-height=192 icon-192x192.svg
\`\`\`

### Opção 2: Usando online converter
1. Acesse: https://convertio.co/svg-png/
2. Faça upload dos arquivos SVG
3. Configure o tamanho correto
4. Baixe os PNGs

### Opção 3: Usando Node.js com sharp
\`\`\`bash
npm install sharp
node converter-svg-to-png.js
\`\`\`

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
`;

fs.writeFileSync(path.join(iconsDir, 'README.md'), readmeContent);
console.log('✅ README.md criado com instruções');

console.log('\n🎉 Ícones SVG gerados com sucesso!');
console.log('📁 Localização: public/icons/');
console.log('📝 Consulte o README.md para instruções de conversão para PNG');
