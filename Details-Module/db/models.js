const { Product } = require('./index.js');
const Promise = require('bluebird');


module.exports = {
  fetch: (id, callback) => {
    Product.find({ productId: id })
      .then((data) => {
        let promises = [];
        console.log (data, 'data in models.js of db')

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
  }
};

