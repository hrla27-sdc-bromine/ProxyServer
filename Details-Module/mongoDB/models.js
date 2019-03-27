const { Product } = require('./index.js');
const Promise = require('bluebird');


module.exports = {
  fetchProduct: (productId, callback) => {
    Product.findOne({ productId: productId })
      .then((data) => {
        let promises = [];

        for (let id of data.availableColors) {
          promises.push(new Promise((resolve, reject) => {
            Product.findOne({ productId: id }, ['images'])
              .then((data) => {
                resolve(data.images[0]);
              })
              .catch((err) => {
                reject(err);
              });
          }));
        }

        Promise.all(promises)
          .then((colorThumbnails) => {
            let details = { product: data, colorThumbnails };
            callback(null, details);
          })
          .catch((err) => {
            callback(err, null);
          });
      })
      .catch((err) => {
        callback(err, null);
      });
  },

  deleteItem: (id, callback) => {
    Product.deleteOne({ productId: id })
      .then ((success) => {
        console.log ('deleted in ModelsMongo')
        callback(null, success)
      })
      .catch((error) => {
        console.log ('error in delete function Mongo')
        callback(error, null)
      });
  },  

  addItem: (product, callback) => {
    console.log (product, 'product in modules')
    Product.create(product)
      .then(() => {
        console.log ('hit success')
      })
      .catch((error) => {
        console.log (error, 'catch a error')
        callback(error, null)
      })
  }
};