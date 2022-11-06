const express = require("express");
const router = express.Router();

const ProductController = require('../Controller/Product.Controller');


//Getting list of all product
router.get('/', ProductController.getAllProducts);
//Create a product
router.post('/', ProductController.createNewProduct);
//Getting product by ID
router.get('/:id', ProductController.findProductByID);
//Updating a product by ID
router.patch('/:id', ProductController.updateProduct);
//Deleting a product by ID
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;