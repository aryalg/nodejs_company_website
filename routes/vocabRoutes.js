const express = require('express');
const {
  getAllWords,
  createWord,
  updateWord,
  deleteWord,
  getWord,
  getRandomWord
} = require('../controllers/vocabController');

const router = express.Router();

router.route('/random').get(getRandomWord);

router
  .route('/')
  .get(getAllWords)
  .post(createWord);

router
  .route('/:id')
  .get(getWord)
  .patch(updateWord)
  .delete(deleteWord);

module.exports = router;
