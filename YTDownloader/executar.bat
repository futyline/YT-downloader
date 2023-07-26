@echo off
cls

set "destino=downloads"

:menu
echo O que deseja fazer?
echo 1. Baixar audio
echo 2. Baixar audio (MP3)
echo 3. Baixar video
echo.

set /p escolha="Digite o numero da opcao desejada: "

if "%escolha%"=="1" (
    echo Baixar audio...
    node videoToAudio.js
) else if "%escolha%"=="2" (
    echo Audio to MP3...
    node audioConverterMP3.js
) else if "%escolha%"=="3" (
    echo Baixar Video...
    node videoConverter.js
) else (
    echo Opcao invalida. Por favor, digite um numero valido.
    goto menu
)


start "" "downloads"