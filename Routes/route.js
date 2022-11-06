const express = require("express");
const route = express.Router();
const Controller = require('../Controller/controller');
/**
 * @description RootRoute
 * @method GET/
 */
route.get('/', Controller.home);

/**
 * @description Add Product
 * @method GET/add-product
 */
route.get('/add-product', Controller.add_product);

/**
 * @description Update Product
 * @method GET/update-product
 */
route.get('/update-product', Controller.update_product);

module.exports = route;