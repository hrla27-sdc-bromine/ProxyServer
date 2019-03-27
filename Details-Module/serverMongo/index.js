const express = require('express');
const path = require('path');
const parser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const PORT = 3002;
const router = require ('./mongoRouter.js')

// const { fetchProduct } = require('./mongoControllers.js');
// const { fetchProduct } = require('./postgresControllers.js');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use('/abibas/product', router);
app.use('/abibas/color', router);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
