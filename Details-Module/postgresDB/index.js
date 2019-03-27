const { Pool } = require ('pg');

// const pgPool = new Pool( {
//   user: 'shlomo', host: 'LOCALHOST', database: 'abibas', password: null, port: 5432
// });
const pgPool = new Pool();

module.exports.dbSchema = async () => {
  let client = await pgPool.connect();

  await client.query (
    `CREATE TABLE IF NOT EXISTS "products" (
      "productId" SERIAL, 
      "name" VARCHAR (150), 
      "images" VARCHAR(250) [],   
      "sizes" JSON,
      "retailPrice" SMALLINT,
      "salePrice" SMALLINT,
      "reviewCount" SMALLINT,
      "reviewRating" REAL,
      "tags" VARCHAR(150) [],
      "colors" VARCHAR (150) [],
      "availableColors" INTEGER [], 
      "heartToggle" BOOLEAN,
      PRIMARY KEY ("productId")
    )`
  )
  .catch ((error) => console.log (error, 'error on line 27'))

  await client.query (
    `CREATE INDEX IF NOT EXISTS "products_name"
    ON "products" USING hash ("name")`
  );

  await client.query (
    `CREATE INDEX IF NOT EXISTS "products_productId" 
    ON "products" USING hash ("productId")`
  );
  client.release();
};

module.exports.pgPool =  pgPool; 




// const Sequelize = require ('sequelize');
// const sequelize = new Sequelize ('abibas', 'shlomo', '', {
//   dialect: 'postgres'
// });

// const Product = sequelize.define(
//   'product',
//   {
//   productId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//   },
//   name: Sequelize.STRING,
//   images: Sequelize.ARRAY(Sequelize.STRING),
//   sizes: Sequelize.JSON,
//   retailPrice: Sequelize.SMALLINT,
//   salePrice: Sequelize.SMALLINT,
//   reviewCount: Sequelize.SMALLINT,
//   reviewRating: Sequelize.REAL,
//   tags: Sequelize.ARRAY(Sequelize.STRING),
//   colors: Sequelize.ARRAY(Sequelize.STRING),
//   availableColors: Sequelize.ARRAY(Sequelize.INTEGER),
//   heartToggle: Sequelize.BOOLEAN
// },
 
//   { timestamps: false }
// );

// module.exports.ProductStream = sequelize
//   .authenticate()
//   .then(() => Product.sync());
// module.exports.sequelize = sequelize;