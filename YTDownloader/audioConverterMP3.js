const readline = require('readline');
const ytdl = require('ytdl-core');
const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

const destino = process.argv[2] || 'downloads';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sanitizeFilename(filename) {
  return filename.replace(/[\\/:"*?<>|]+/g, "");
}

const downloadsFolder = path.join(__dirname, destino);
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
        const audioFileName = `${sanitizeFilename(info.videoDetails.title)}_${selectedFormat.audioBitrate || selectedFormat.audioQuality}.${selectedFormat.container}`;
        const audioStream = ytdl(videoURL, {
          quality: selectedFormat.audioQuality,
          format: selectedFormat
        });

        const outputPath = path.join(downloadsFolder, `${sanitizeFilename(info.videoDetails.title)}_${selectedFormat.audioBitrate || selectedFormat.audioQuality}.mp3`);

        audioStream.pipe(fs.createWriteStream(path.join(downloadsFolder, audioFileName)));

        audioStream.on('end', () => {
          const ffmpeg = spawn('ffmpeg', ['-i', path.join(downloadsFolder, audioFileName), outputPath]);

          ffmpeg.on('close', () => {
            fs.unlinkSync(path.join(downloadsFolder, audioFileName));
            console.log(`Conversão para MP3 concluída com sucesso! Arquivo salvo em: ${outputPath}`);
            rl.close();
          });
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
