const mongoose = require('mongoose');

const userDetailsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  userimage: { type: String },
  birthday: { type: Date, default: Date.now() },
  job: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('UserDetails', userDetailsSchema);
