const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tweet: { type: Object },
});

module.exports = mongoose.model('Tweet', tweetSchema);
