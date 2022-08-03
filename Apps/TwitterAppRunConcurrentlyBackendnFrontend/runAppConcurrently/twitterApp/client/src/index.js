import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './redux/cofigureStore';
import 'antd/dist/antd.css';
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

const persistedState = window.__INITIAL_STATE__;
const store = configureStore(persistedState);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
serviceWorker.unregister();
