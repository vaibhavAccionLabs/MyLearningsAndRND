const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails',
    required: true
  },
  working_history: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      company_name: { type: String, required: true },
      start_date: { type: Date, default: Date.now() },
      end_date: { type: Date, default: Date.now() },
      job_title: { type: String, required: true },
      job_description: { type: String }
    }
  ],
  educational_history: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      college_name: { type: String, required: true },
      start_date: { type: Date, default: Date.now() },
      end_date: { type: Date, default: Date.now() },
      description: { type: String },
      course_pursue: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('Profile', profileSchema);
