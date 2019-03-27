
const fs = require('fs');
const path = require('path');
const { Product } = require('./index.js');

const  seedData =  async (data)  => {
  return Product.insertMany(data);
};


const insertAll = async () => {
  for(let i=0; i < 3; i++) {
    await seedData(JSON.parse(fs.readFileSync(path.resolve(__dirname, `./data1/${i}.json`))));
    console.log('seeded file ' + i);
  }
};

insertAll();


