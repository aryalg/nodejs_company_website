const express = require('express');
const multer = require('multer');
const {
  getAllWords,
  createWord,
  updateWord,
  deleteWord,
  getWord,
  getRandomWord
} = require('../controllers/vocabController');

const { protect } = require('../controllers/authController');

const upload = multer({ dest: 'public/img/vocabs' });
const router = express.Router();

router.route('/random').get(getRandomWord);

// Protect all routes after this middle ware
router.use(protect);

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
