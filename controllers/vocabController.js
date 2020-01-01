const factory = require('./handlerFactory');
const Vocab = require('../models/vocabModel');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

exports.getWord = factory.getOne(Vocab);

exports.getAllWords = factory.getAll(Vocab);

exports.createWord = catchAsync(async (req, res, next) => {
  console.log(req.files);
  // const doc = await Vocab.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      // data: doc
    }
  });
});

exports.deleteWord = factory.deleteOne(Vocab);

exports.updateWord = factory.updateOne(Vocab);

exports.getRandomWord = catchAsync(async (req, res, next) => {
  const count = await Vocab.countDocuments();
  // Get a random entry
  const random = Math.floor(Math.random() * count);
  const vocab = await Vocab.findOne()
    .skip(random)
    .exec();
  res.status(200).json({
    status: 'success',
    data: vocab
  });
});
