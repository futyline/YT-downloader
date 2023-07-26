const readline = require('readline');
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sanitizeFilename(filename) {
  return filename.replace(/[\\/:"*?<>|]+/g, "");
}

const downloadsFolder = path.join(__dirname, 'downloads');
if (!fs.existsSync(downloadsFolder)) {
  fs.mkdirSync(downloadsFolder);
}

rl.question('Digite o link do vídeo do YouTube: ', (videoURL) => {
  ytdl.getInfo(videoURL).then((info) => {
    const formats = info.formats.filter((format) => format.hasAudio);

    console.log('Resoluções disponíveis:');
    formats.forEach((format, index) => {
      const resolution = `${format.audioBitrate || format.audioQuality} (${format.container})`;
      console.log(`${index + 1}. ${resolution}`);
    });

    rl.question('Digite o número da resolução desejada: ', (resNumber) => {
      const selectedFormat = formats[resNumber - 1];
      if (selectedFormat) {
        const fileName = `${sanitizeFilename(info.videoDetails.title)}_${selectedFormat.audioBitrate || selectedFormat.audioQuality}.${selectedFormat.container}`;
        const filePath = path.join(downloadsFolder, fileName);
        const audio = ytdl(videoURL, {
          quality: selectedFormat.audioQuality,
          format: selectedFormat
        });

        audio.pipe(fs.createWriteStream(filePath));

        audio.on('end', () => {
          console.log(`Conversão para ${selectedFormat.audioBitrate || selectedFormat.audioQuality} (${selectedFormat.container}) concluída com sucesso!`);
          rl.close();
        });
      } else {
        console.log('Resolução inválida ou sem áudio disponível.');
        rl.close();
      }
    });
  }).catch((error) => {
    console.error('Ocorreu um erro ao obter as resoluções:', error);
    rl.close();
  });
});
