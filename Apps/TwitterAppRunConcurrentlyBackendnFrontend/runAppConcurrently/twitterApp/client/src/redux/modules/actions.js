import * as TYPES from './constants';

export const requestSearchTweets = () => ({
  type: TYPES.REQUEST_SEARCH_TWEETS,
});

export const handleSearchTweetsError = err => ({
  type: TYPES.REQUEST_SEARCH_TWEETS_ERROR,
  err,
});

export const receiveSearchTweets = data => {
  return {
    type: TYPES.RECEIVE_SEARCH_TWEETS,
    payload: data,
  };
};

export const receiveMoreTweets = data => {
  return {
    type: TYPES.RECEIVE_MORE_TWEETS,
    payload: data,
  };
};

export const handleMoreTweetsError = err => ({
  type: TYPES.REQUEST_MORE_TWEETS_ERROR,
  err,
});
