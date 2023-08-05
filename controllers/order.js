const Order = require('../models/order');
const factory = require('../utils/crudBuilder');




exports.getOrders = factory.getAll(Order);

exports.getOrder = factory.getOne(Order);

exports.createOrder = factory.createOne(Order);

exports.deleteOrder = factory.deleteOne(Order);

exports.updateOrder = factory.updateOne(Order);
