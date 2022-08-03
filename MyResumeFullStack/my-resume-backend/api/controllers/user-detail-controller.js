const mongoose = require('mongoose');

const { isObject } = require('../utils');

const UserDetails = require('../models/userDetails');

const getUserDetailController = (req, res) => {
  UserDetails.aggregate([
    {
      $lookup: {
        from: 'profiles',
        localField: '_id',
        foreignField: 'user_id',
        as: 'history'
      }
    },
    {
      $project: {
        name: 1,
        userimage: 1,
        birthday: 1,
        email: 1,
        description: 1,
        job: 1,
        'history.working_history': 1,
        'history.educational_history': 1
      }
    },
    {
      $limit: 1
    }
  ])
    .exec()
    .then(details => {
      res.status(200).json(details[0]);
    })
    .catch(error => res.status(500).json({ error }));
};

const postUserDetailController = (req, res) => {
  // here we can put validators.. if reqiure
  const userDetails = new UserDetails({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    birthday: req.body.birthday,
    job: req.body.job,
    email: req.body.email,
    description: req.body.description
  });
  userDetails
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

const patchUserDetailController = (req, res) => {
  //console.log(req.files['userimage'][0]);
  const UserImage = req.files['userimage'][0];
  const _id = req.params.userId;
  const updateOps = {};
  if (UserImage && UserImage.filename) {
    updateOps['userimage'] = UserImage.filename;
  }
  req.body &&
    isObject(req.body) &&
    Object.keys(req.body).forEach(key => {
      updateOps[key] = req.body[key];
    });

  UserDetails.updateMany({ _id }, { $set: updateOps })
    .exec()
    .then(detailsUpdated => {
      if (detailsUpdated.ok) {
        UserDetails.findById(_id)
          .select('_id name email userimage job birthday description')
          .exec()
          .then(details => {
            res.status(200).json(details);
          })
          .catch(error => res.status(500).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
};

const deleteUserDetailController = (req, res) => {
  const _id = req.params.userId;
  UserDetails.remove({ _id })
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json({
          success: 'User deleted successfully!'
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

module.exports = {
  getUserDetailController,
  postUserDetailController,
  patchUserDetailController,
  deleteUserDetailController
};
