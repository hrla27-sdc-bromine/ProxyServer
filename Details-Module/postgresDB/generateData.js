const fs = require ('fs');
const {DataStream} = require ('./dataStream.js');

const writeDataToFile = () => {
  const file = fs.createWriteStream(`./postgresDB/data.csv`, { mode: 0o755 });
  const data = new DataStream();
  const write = data.pipe(file);
  return new Promise((res, rej) => {
    write.on('finish', res);
    write.on('error', rej);
  });
};

module.exports = writeDataToFile;
