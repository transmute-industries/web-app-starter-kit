import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import AppConnected from './containers/App';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { store, history } from './store/store';

import { ConnectedRouter, } from 'react-router-redux';
import { Route, Redirect } from 'react-router';

import * as injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

console.log('Transmute Industries loaded...')

// let App:any = AppConnected;
import HomePage from './components/Home/HomePage';
import StarWarsPage from './components/StarWars/StarWarsPage';
import MaterialPage from './components/Material/MaterialPage';
import BootstrapPage from './components/Bootstrap/BootstrapPage';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact={true} path="/web-app-starter-kit/" component={HomePage} />
        <Route path="/web-app-starter-kit/starwars" component={StarWarsPage} />
        <Route path="/web-app-starter-kit/material" component={MaterialPage} />
        <Route path="/web-app-starter-kit/bootstrap" component={BootstrapPage} />
        <Redirect from='*' to='/web-app-starter-kit/' />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);