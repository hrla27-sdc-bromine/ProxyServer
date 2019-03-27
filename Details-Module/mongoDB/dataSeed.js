const { Product } = require('./index.js');
const generateData = require('./generateData.js');
const path = require('path');
let cmd = require ('node-cmd');
const Promise = require('bluebird');
cmd = Promise.promisifyAll(cmd);

Product.find().then(data => {
  if (data.length === 0 ) {
    generateData().then(() => {
      console.log ('data generated, beginning seeding');
    cmd
      .runAsync(
        `mongoimport --db abibas --collection products --file ${path.resolve(
          __dirname,
          './data.json'
        )} --jsonArray`
      )
      .then(()=> {
        console.log ('completed seeding of MongoDB')
      })
    });
  }
});
