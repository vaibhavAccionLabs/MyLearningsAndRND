const mongoose = require('mongoose');

const Twit = require('twit');
const Promise = require('bluebird');

const TweetSchema = require('./../models/twitterModel');

const pageSize = 10;
const Tweet = new Twit({
  consumer_key: 'fra4b3deMJOXgNWhnzEkjCfqc',
  consumer_secret: 'vXYJ74ed3HBWw82L0cOI9JYmXmB0J0V4GPfZIAxQSF1uOEClLq',
  access_token: '2309596465-frC7njPHWNgqFKHQk2od86YdKJoXvg8iCPZK1XF',
  access_token_secret: 'vtpZORRLv2yU9C0k0Sbd4i6v36CYDzg83XZqg0TVfN0I9',
});

const SearchController = (req, res) => {
  const { q = '' } = req.query;
  Tweet.get(
    'search/tweets',
    {
      q,
      lang: 'en',
      //result_type: 'recent',
      count: 100,
    },
    (err, data, response) => {
      if (err) {
        //console.log('ERROR::', err);
        return res.status(500).json({
          message: 'failure',
          error: 'Something went wrong with twitter API try again later!',
        });
      }

      if (data && data.statuses) {
        TweetSchema.deleteMany({})
          .exec()
          .then((removeData) => {
            if (removeData) {
              return Promise.all(
                data.statuses.length &&
                data.statuses.map((tweet) => {
                  const TweetDetails = new TweetSchema({
                    _id: new mongoose.Types.ObjectId(),
                    tweet,
                  });
                  return TweetDetails.save();
                })
              );
            }
          })
          .then((result) => {
            const lengthOfData = result.length;
            const notifications = Math.round(lengthOfData - pageSize);
            return res.status(200).json({
              message: 'successful',
              count: lengthOfData,
              notifications: notifications > 0 ? notifications : 0,
              page: 1,
              totalPages: Math.round(lengthOfData / pageSize),
              tweets: result.slice(0, pageSize),
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              message: 'failure',
              error: 'Something went wrong while fetching the data',
            });
          });
      }
    }
  );
};

const loadMoreTweets = (req, res) => {
  const { nextPage, totalPages, count } = req.query;
  let nPage = parseInt(nextPage);
  let allCount = parseInt(count);
  let allPages = parseInt(totalPages);
  let notifications = allCount - nPage * pageSize;
  const skipData = nPage - 1;

  TweetSchema.find()
    .skip(skipData * pageSize)
    .limit(pageSize)
    .exec()
    .then((result) => {
      return res.status(200).json({
        message: 'successful',
        count: allCount,
        notifications: notifications > 0 ? notifications : 0,
        page: nPage,
        totalPages: allPages,
        tweets: result,
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: 'failure',
        error: 'Something went wrong while fetching the data',
      })
    );
};

module.exports = {
  SearchController,
  loadMoreTweets,
};
