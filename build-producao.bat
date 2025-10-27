@echo off
echo ========================================
echo    BUILD PARA PRODUCAO - HORA EXTRA
echo ========================================
echo.

echo [1/4] Instalando dependencias do backend...
call npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias do backend
    pause
    exit /b 1
)

echo.
echo [2/4] Instalando dependencias do frontend...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias do frontend
    pause
    exit /b 1
)

echo.
echo [3/4] Fazendo build do frontend...
call npm run build
if %errorlevel% neq 0 (
    echo ERRO: Falha ao fazer build do frontend
    pause
    exit /b 1
)

echo.
echo [4/4] Build concluido com sucesso!
echo.
echo Arquivos gerados:
echo - frontend/build/ (frontend buildado)
echo - node_modules/ (dependencias do backend)
echo.
echo Pronto para deploy no Render!
echo.
echo Proximos passos:
echo 1. Subir para GitHub
echo 2. Configurar no Render
echo 3. Adicionar variaveis de ambiente
echo.
pause
