const mongoose = require('mongoose');
const Profile = require('../models/profile');

const getProfileController = (req, res) => {
  Profile.find()
    .select('_id user_id working_history educational_history')
    .exec()
    .then(profiles => {
      res.status(200).json(profiles);
    })
    .catch(error => res.status(500).json({ error }));
};

const postProfileController = (req, res) => {
  const profile = new Profile({
    _id: new mongoose.Types.ObjectId(),
    user_id: req.body.user_id,
    working_history: req.body.working_history.map(wh => {
      return {
        _id: new mongoose.Types.ObjectId(),
        company_name: wh.company_name,
        start_date: wh.start_date,
        end_date: wh.end_date,
        job_title: wh.job_title,
        job_description: wh.job_description
      };
    }),
    educational_history: req.body.educational_history.map(eh => {
      return {
        _id: new mongoose.Types.ObjectId(),
        college_name: eh.college_name,
        start_date: eh.start_date,
        end_date: eh.end_date,
        course_pursue: eh.course_pursue,
        description: eh.description
      };
    })
  });
  profile
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

const patchProfileController = (req, res) => {
  const id = req.params.Id;
  const updateOps = {
    working_history: req.body.working_history.map(wh => {
      return {
        _id: wh._id || new mongoose.Types.ObjectId(),
        company_name: wh.company_name,
        start_date: wh.start_date,
        end_date: wh.end_date,
        job_title: wh.job_title,
        job_description: wh.job_description
      };
    }),
    educational_history: req.body.educational_history.map(eh => {
      return {
        _id: eh._id || new mongoose.Types.ObjectId(),
        college_name: eh.college_name,
        start_date: eh.start_date,
        end_date: eh.end_date,
        course_pursue: eh.course_pursue,
        description: eh.description
      };
    })
  };

  Profile.update({ _id: id }, updateOps)
    .exec()
    .then(profileUpdated => {
      if (profileUpdated) {
        Profile.findById(id)
          .exec()
          .then(result => {
            res.status(200).json(result);
          })
          .catch(error => res.status(500).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
};

const deleteProfileController = (req, res) => {
  const _id = req.params.profileId;
  Profile.remove({ _id })
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json({
          success: 'Profile deleted successfully!'
        });
      }
    })
    .catch(err => res.status(500).json({ err }));
};

module.exports = {
  getProfileController,
  postProfileController,
  patchProfileController,
  deleteProfileController
};
