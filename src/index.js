import '../stylesheets/style.scss';

import {IndexRoute, Route, Router, browserHistory} from 'react-router';

import ConfigureStore from './helpers/store';
import Layout from './components/Layout';
import Index from './containers/Index';
import {Provider} from 'react-redux';
import React from 'react';
import {render} from 'react-dom';

const store = ConfigureStore();

render(
  (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/">
          <Route components={Layout}>
            <IndexRoute components={Index}/>
          </Route>
        </Route>
      </Router>
    </Provider>
  ), document.getElementById('root')
);
