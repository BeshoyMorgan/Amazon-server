const Product = require('../models/products');
const factory = require('../utils/crudBuilder');



exports.getProducts = factory.getAll(Product);

exports.getProduct = factory.getOne(Product);

exports.createProduct = factory.createOne(Product);

exports.deleteProduct = factory.deleteOne(Product);

exports.updateProduct = factory.updateOne(Product);
