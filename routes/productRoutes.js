const express = require('express');
const auth = require('../middleware/auth');

const { getProducts, createProduct, getProductById, editProduct, deleteProduct } = require('../controllers/product.controller');

const productRouter = express.Router();

productRouter.route('/products').post(auth, createProduct).get(getProducts);

productRouter.route('/products/:productId').get(getProductById);

productRouter
  .route('/products/:productId')
  .put(editProduct)
  .delete(deleteProduct);

module.exports = productRouter;
