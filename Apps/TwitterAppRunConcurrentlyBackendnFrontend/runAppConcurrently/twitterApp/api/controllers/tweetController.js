const mongoose = require('mongoose');

const Twit = require('twit');
const Promise = require('bluebird');

const TweetSchema = require('./../models/twitterModel');

const pageSize = 10;
const Tweet = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
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
