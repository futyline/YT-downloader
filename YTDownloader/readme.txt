https://github.com/ytdl-org/youtube-dl#format-selection

Para o bom funcionamento do código, você precisará instalar as seguintes bibliotecas:

readline: Essa biblioteca já faz parte do conjunto de módulos do Node.js e não requer instalação separada.

ytdl-core: É responsável por obter informações sobre o vídeo do YouTube e fazer o download do vídeo ou áudio. Você pode instalá-lo executando o seguinte comando no seu terminal:


npm install ytdl-core


fs: Também faz parte do conjunto de módulos do Node.js e não requer instalação separada.

child_process: Também faz parte do conjunto de módulos do Node.js e não requer instalação separada.

Além dessas bibliotecas, você também precisará ter o ffmpeg instalado em seu sistema e disponível no ambiente de execução do Node.js. O ffmpeg é um software externo que não é instalado via npm, mas é necessário para converter o arquivo de áudio para MP3. Você pode seguir as instruções específicas para o seu sistema operacional, conforme mencionei anteriormente, para instalar o ffmpeg.

Certifique-se de estar em um diretório de projeto válido ao executar o comando npm install ytdl-core. Isso criará uma pasta node_modules no diretório atual e instalará o ytdl-core lá.