require ('newrelic');

const express = require('express');
const path = require('path');
const parser = require('body-parser');

// const cors = require('cors');
// const morgan = require('morgan');

const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const envConfig = dotenv.config();
dotenvExpand(envConfig);

const PORT = 3002;

const router = require ('./postgresRouter.js');

const { dbSchema } = require ('../postgresDB/index.js');

// const { fetchProduct } = require('..//mongoControllers.js');
// const { fetchProduct } = require('./postgresControllers.js');

const app = express();


launchApp = async () => {
  await dbSchema();

  app.use(parser.json());
  app.use(parser.urlencoded({ extended: true }));
  
  app.use(express.static(path.resolve(__dirname, '../client/dist')));
  app.use('/abibas/product', router);
  app.use('/abibas/color', router);
}

launchApp()
.then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
 })


module.exports = {app, launchApp}
