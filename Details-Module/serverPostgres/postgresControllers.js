const { dbFetch, dbDelete, dbUpdate, dbCreate } = require('../postgresDB/models.js');

module.exports = {
  getProduct: (req, res) => {
    console.time('Fetch')
    let productId = Number(req.params.id);
    dbFetch(productId)
      .then((product) => {
        if (product) {
          res.status(200).json(product);
        } else {
          console.log ('in error of controllers')
          res.status(404).end();
        }
        console.timeEnd('Fetch');
      })
      .catch(() => {
        console.log ('in catch')
        res.status(404).end();
      });
  },

  deleteProduct: (req, res) => {
    console.time('Fetch')
    let productId = Number(req.params.id);
    dbDelete(productId)
      .then(()=> {
        res.status(200).json('delete successful')
      })
      .catch(() => {
        res.status(404).end()
      });
    console.timeEnd('Fetch')
  },

  updateProduct: (req, res) => {
    console.time('Fetch')
    let updateItem = req.body;
    let productId = Number(req.params.id)
    dbUpdate(productId, updateItem)
      .then((productId) => {
        res.status(200).end(productId)
      })
      .catch(() => {
        res.status(404).end()
      })
    console.timeEnd('Fetch')
  },

  addProduct: (req, res) => {
    console.time ('Fetch')
    let product = req.body;
    dbCreate(product)
      .then((productId) => {
        res.status(201).json(Object.assign({productId}, product))
      })
      .catch(() => {
        res.status(404).end()
    })
    console.timeEnd('Fetch')
  },
};
