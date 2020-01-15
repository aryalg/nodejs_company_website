const express = require('express');
const multer = require('multer');
const AppError = require('../utils/appError');
const {
  getAllWords,
  createWord,
  updateWord,
  deleteWord,
  getWord,
  getRandomWord
} = require('../controllers/vocabController');

// const { protect } = require('../controllers/authController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/vocabs');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];

    cb(null, `${req.body.name}-${req.files.length}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only image', 400), false);
  }
};

const upload = multer({ storage: storage, fileFilter: multerFilter });
const router = express.Router();

router.route('/random').get(getRandomWord);

// Protect all routes after this middle ware
// router.use(protect);

router
  .route('/')
  .get(getAllWords)
  .post(upload.array('photo', 5), createWord);

router
  .route('/:id')
  .get(getWord)
  .patch(updateWord)
  .delete(deleteWord);

module.exports = router;
