const router = require ('express').Router();
const {getProduct, deleteProduct, updateProduct, addProduct} = require ('./postgresControllers.js');

router
.get ('/:id', getProduct)
.delete ('/:id', deleteProduct)
.put ('/:id', updateProduct)
.post ('/', addProduct)

module.exports = router;