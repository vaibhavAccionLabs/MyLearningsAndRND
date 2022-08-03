import * as TYPES from './constants';
import {API} from '../../config';
import {
  requestSearchTweets,
  receiveSearchTweets,
  handleSearchTweetsError,
  receiveMoreTweets,
  handleMoreTweetsError,
} from './actions';

const initialState = {
  error: null,
  request: false,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.REQUEST_SEARCH_TWEETS:
      return {
        ...state,
        request: true,
      };
    case TYPES.RECEIVE_SEARCH_TWEETS:
      return {
        ...state,
        data: action.payload,
        request: false,
        error: false,
      };
    case TYPES.RECEIVE_MORE_TWEETS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
          tweets: [...state.data.tweets, ...action.payload.tweets],
        },
        request: false,
        error: false,
      };
    case TYPES.REQUEST_MORE_TWEETS_ERROR:
    case TYPES.REQUEST_SEARCH_TWEETS_ERROR:
      return {
        ...state,
        error: true,
        request: false,
      };
    default:
      return state;
  }
};

export const searchTweets = query => (dispatch, getState) => {
  let url = API.BASE_URL;
  url = `${url}/search?q=${query}`;
  dispatch(requestSearchTweets());
  try {
    return fetch(url)
      .then(response => response.json())
      .then(response => {
        if (response && response.message === 'successful') {
          dispatch(receiveSearchTweets(response));
        }
      })
      .catch(error => {
        dispatch(handleSearchTweetsError(error));
      });
  } catch (error) {
    dispatch(handleSearchTweetsError(error));
  }
};

export const loadMoreTweets = (nextPage, totalPages, count) => (
  dispatch,
  getState
) => {
  let url = API.BASE_URL;
  url = `${url}/load-more-tweets?nextPage=${nextPage}&totalPages=${totalPages}&count=${count}`;
  try {
    return fetch(url)
      .then(response => response.json())
      .then(response => {
        if (response && response.message === 'successful') {
          dispatch(receiveMoreTweets(response));
        }
      })
      .catch(error => {
        dispatch(handleMoreTweetsError(error));
      });
  } catch (error) {
    dispatch(handleMoreTweetsError(error));
  }
};
