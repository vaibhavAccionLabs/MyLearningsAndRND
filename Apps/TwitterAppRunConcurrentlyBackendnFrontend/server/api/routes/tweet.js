const express = require('express');

const router = express.Router();

const {
  SearchController,
  loadMoreTweets,
} = require('./../controllers/tweetController');

router.get('/search', SearchController);

router.get('/load-more-tweets', loadMoreTweets);

module.exports = router;
