import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import AppConnected from './containers/App';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { store, history } from './store/store';

import { ConnectedRouter, } from 'react-router-redux';
import { Route } from 'react-router';

import * as injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

// let App:any = AppConnected;
import StarWarsPage from './components/StarWarsPage';
import MaterialPage from './components/MaterialPage';
import BootstrapPage from './components/BootstrapPage';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact={true} path="/" component={StarWarsPage} />
        <Route path="/material" component={MaterialPage} />
        <Route path="/bootstrap" component={BootstrapPage} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);