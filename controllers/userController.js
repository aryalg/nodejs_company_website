const factory = require('./handlerFactory');
const User = require('../models/userModel');

exports.getUser = factory.getOne(User);

exports.getAllUser = factory.getAll(User);

exports.createUser = factory.createOne(User);

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);
