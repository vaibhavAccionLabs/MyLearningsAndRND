const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sendMail = require('../middleware/mail');

const User = require('../models/user');

const signupController = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user && user.length >= 1) {
        res.status(409).json({
          message: 'User already exists',
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(409).json({ err });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                if (result) {
                  sendMail(req.body.email, (err, mailRes) => {
                    if (err) {
                      res.status(200).json({
                        mailsent: 'Not Sent',
                        message: 'user created successfully',
                      });
                      return;
                    }
                    if (mailRes) {
                      res.status(200).json({
                        mailsent: 'Success',
                        message: 'user created successfully',
                      });
                    }
                  });
                }
              })
              .catch((err) => res.status(500).json({ err }));
          }
        });
      }
    });
};

const login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
        if (result) {
          const userData = {
            email: user[0].email,
            userId: user[0]._id,
          };
          const token = jwt.sign(userData, 'secret', {
            expiresIn: 900,
          });
          const refreshToken = jwt.sign(userData, 'refreshsecret', {
            expiresIn: 86400,
          });
          const response = { message: 'Auth success', token, refreshToken };
          //tokenList[refreshToken] = response;
          return res.status(200).json(response);
        }
        return res.status(401).json({
          message: 'Auth failed',
        });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

const refreshToken = (req, res) => {
  const postData = req.body;
  try {
    const decodedUser = jwt.verify(postData.refreshToken, 'refreshsecret');
    console.log('DECODED USER', decodedUser);
    const user = {
      email: decodedUser.email,
      userId: decodedUser.userId,
    };
    const token = jwt.sign(user, 'secret', {
      expiresIn: 900,
    });
    const refreshToken = jwt.sign(user, 'refreshsecret', {
      expiresIn: 86400,
    });
    const response = { token, refreshToken };
    return res.status(200).json(response);
  } catch (error) {
    console.log('ERROR::', error);
    return res.status(401).json({
      message: 'Auth Failed',
    });
  }
};

const getUsers = (req, res) => {
  User.find()
    .select('_id email')
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

const deleteUsers = (req, res) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: 'User deleted',
        });
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

module.exports = {
  signupController,
  login,
  refreshToken,
  getUsers,
  deleteUsers,
};
