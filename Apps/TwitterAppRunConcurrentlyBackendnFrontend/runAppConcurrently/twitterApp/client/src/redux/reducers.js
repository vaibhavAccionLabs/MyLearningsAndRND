import {combineReducers} from 'redux';

import tweetReducer from './modules/tweets';

const appReducer = combineReducers({
  tweets: tweetReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
