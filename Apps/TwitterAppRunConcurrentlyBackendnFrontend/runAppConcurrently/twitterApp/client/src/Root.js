import React, {Suspense} from 'react';
import {Provider} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import {Loading} from './core';

import {Tweets} from './containers';

const Root = ({store}) => (
  <Provider store={store}>
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Tweets} />
        </Switch>
      </Suspense>
    </Router>
  </Provider>
);

export default Root;
