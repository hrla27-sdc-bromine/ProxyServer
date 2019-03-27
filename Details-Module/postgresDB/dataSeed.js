const dotenv = require ('dotenv');
const dotenvExpand = require ('dotenv-expand');
const envConfig = dotenv.config();
dotenvExpand(envConfig);

const generateData = require ('./generateData.js');
const path = require('path');
const fs = require('fs');
const Promise = require ('bluebird')
const { pgPool, dbSchema } = require ('./index.js');

const seed = async () => {
  await dbSchema();
  let output = await pgPool.query (
    `SELECT * 
    FROM products
    LIMIT 10`
  );
  if (output.rows.length === 0) {
    console.log ('initiating data generation for DB');
    await generateData();
    console.log ('data created, initializing seeding');
    await pgPool.query(
      `COPY products("name","images","sizes","retailPrice","salePrice","reviewCount","reviewRating","tags","colors","availableColors","heartToggle")
      FROM '${path.resolve(__dirname, 'data.csv')}'
      WITH (FORMAT csv)`
    );

    fs.unlink(path.resolve(__dirname, './data.csv'), () => {});
    console.log ('seeding complete')
  }
};

seed();



// ProductStream.then(Product => {
//   Product.findAll({ limit: 10 }).then(result => {
//     if (result.length === 0) {
//       generateData().then(() => {
//         console.log('data generated, beginning seeding');
//         sequelize
//           .query(
//             `COPY products FROM '${path.resolve(
//               __dirname,
//               './data.csv'
//             )}' WITH (FORMAT csv);`
//           )
//           .spread(() => {
//             fs.unlink(path.resolve(__dirname, './data.csv'), () => {});
//             console.log('seeding complete, deleting csv');
//           });
//       });
//     }
//   });
// });