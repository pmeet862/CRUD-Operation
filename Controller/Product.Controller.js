const createError = require('http-errors');
const mongoose = require('mongoose');
const Product = require('../Models/Product.model');


module.exports = {
    getAllProducts: async (req, res, next) => {
        try {
            const results = await Product.find({}, { name: 1, price: 1 });
            res.send(results);
        } catch (error) {
            console.log(error.message);
        }

    },

    findProductByID: async (req, res, next) => {
        const id = req.params.id;
        try {
            const product = await Product.findById(id);

            if (!product) {
                throw createError(404, 'Product does not exist.');
            }
            res.send(product);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid product ID'));
                return;
            }
            next(error);
        }
    },

    createNewProduct: async (req, res, next) => {
        try {
            const product = new Product(req.body);
            const result = await product.save();
            res.redirect('/add-product');
        } catch (error) {
            console.log(error.message);
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
        /*console.log(req.body);
        const product = new Product({
            name: req.body.name,
            price: req.body.price
        });
        product.save()
            .then(result => {
                console.log(result);
                res.send(result);
            })
            .catch(err => {
                console.log(err.message);
            });*/

    },

    updateProduct: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;

            const opt = { new: true };
            const result = await Product.findByIdAndUpdate(id, updates, opt);
            if (!result) {
                throw createError(404, 'Product does not exist.');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid product ID'));
                return;
            }
            next(error);
        }
    },

    deleteProduct: async (req, res, next) => {
        const id = req.params.id;
        try {
            const result = await Product.findByIdAndDelete(id);
            if (!result) {
                throw createError(404, 'Product does not exist.');
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid product ID'));
                return;
            }
            next(error);
        }
    }
};