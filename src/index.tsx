/* eslint-disable no-console */
import React from 'react';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom';
import { createBrowserHistory, History } from 'history';
import App from './App';
import * as serviceWorker from './serviceWorker';

const history: History = createBrowserHistory();

const render = () =>
  ReactDOM.render(<App history={history} />, document.getElementById('root'));

render();

if (module.hot) {
  module.hot.accept('./App', () => {
    console.log('Accepting the updated render module!');
    render();
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
