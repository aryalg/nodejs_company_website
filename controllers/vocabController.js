const factory = require('./handlerFactory');
const Vocab = require('../models/vocabModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { localIpAddress } = require('../utils/constants');

exports.getWord = factory.getOne(Vocab);

exports.getAllWords = factory.getAll(Vocab);

exports.createWord = catchAsync(async (req, res, next) => {
  // const doc = await Vocab.create(req.body);
  console.log(req.body);

  if (req.files) {
    console.log('There are files need to handled!');
    // Generate Array of uploaded images - download links
    const imgArray = [];
    req.files.forEach(imageFile => {
      imgArray.push(
        `http://${localIpAddress}/img/vocabs/${imageFile.filename}`
      );
    });
    console.log(imgArray);
    if (imgArray.length === 0) {
      return next(new AppError('You need to upload at least one image', 402));
    }
    return res.status(201).json({
      status: 'success',
      data: {
        images: imgArray
      }
    });
  }
  // There is meaning in body of res.body
  return next(new AppError('You need to upload at least one image', 403));
  // res.status(201).json({
  //   status: 'success',
  //   data: {
  //     data: req.body
  //   }
  // });
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
