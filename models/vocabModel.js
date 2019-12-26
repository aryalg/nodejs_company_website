const mongoose = require('mongoose');

const vocabSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Every vocab should have name!'],
    unique: true
  },
  meaning: {
    type: [{ body: String, example: [String] }],
    required: [true, 'There need to have single or multiple meaning of word!']
  },
  images: {
    type: [String],
    required: [true, 'There need to be atleast one image associate with vocab']
  }
});

const Vocab = mongoose.model('Vocab', vocabSchema);

module.exports = Vocab;
