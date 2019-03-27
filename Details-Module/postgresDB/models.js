const { pgPool } = require('./index.js');

module.exports = {
  dbFetch: product => {
    if (typeof product === 'number') {
      console.log (product, 'product in models')
      return pgPool.query (
        `SELECT * FROM products WHERE "productId"=${product};`
      )
      .then (res => res.rows[0])
    } else {
      return pgPool.query (
        `SELECT * FROM products WHERE
        "name" = '${product}'
        LIMIT 1;`
      )
      .then(res => (res.rows.length ? res.rows[0] : null));
    }
  },

  dbDelete: productId => {
    return pgPool.query (
      `DELETE FROM products WHERE
      "productId" = ${productId};`
    )
    .then(res => res.rows[0]);
  },

  dbCreate: product => {
    return pgPool.query (
      `INSERT INTRO products ("name","images","sizes","retailPrice","salePrice","reviewCount","reviewRating","tags","colors","availableColors","heartToggle")
      VALUES (
        '${product.name}',
        '{${product.product.images.toString()}}',
        '${JSON.stringify(product.sizes)}',
        ${product.retailPrice},
        ${product.salePrice},
        ${product.reviewCount},
        ${product.reviewRating},
        '{${product.tags.toString()}}',
        '{${product.colors.toString()}}',
        '{${product.availableColors.toString()}}',
        ${product.heartToggle}
      ) RETURNING "productId";`
    )
    .then(res => res.rows[0].productId);
  },

  dbUpdate: (productId, updateProduct) => {
    return pgPool.query (
      `UPDATE products SET
      "name" = '${updateProduct.name}',
      "images" = '{${updateProduct.images.toString()}}',
      "sizes" = '${JSON.stringify(updateProduct.sizes)}',
      "retailPrice" = ${updateProduct.retailPrice},
      "salePrice" = ${updateProduct.salePrice},
      "reviewCount" = ${updateProduct.reviewCount},
      "reviewRating" = ${updateProduct.reviewRating},
      "tags" = '{${updateProduct.tags.toString()}}',
      "colors" = '{${updateProduct.colors.toString()}}',
      "availableColors" = '{${updateProduct.availableColors.toString()}}',
      "heartToggle" = ${updateProduct.heartToggle}
      WHERE "productId" = ${productId};`
    )
    .then(res => res.rows[0]);
  }
};












//     ProductStream.then(Product => {
//       Product.find({ productId })
//         .then(product => {
//           cb(null, product);
//         })
//         .catch(err => {
//           cb(err, null);
//         });
//     });
//   }
// };