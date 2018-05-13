import '../stylesheets/style.scss';

import {IndexRoute, Route, Router, browserHistory} from 'react-router';

import ConfigureStore from './helpers/store';
import Layout from './components/Layout';
import Index from './containers/Index';
import {Provider} from 'react-redux';
import React from 'react';
import {render} from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import '../stylesheets/00_foundation/foundation.css';
import '../stylesheets/00_foundation/reset.css';
import '../stylesheets/00_foundation/loading.css';

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

registerServiceWorker();
