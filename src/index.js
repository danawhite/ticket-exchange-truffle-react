import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Route,
    IndexRoute,
    browserHistory,
    hashHistory,
} from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import getWeb3 from './util/web3/getWeb3'

// Views
import App from './App'
import Home from './views/home/Home'
import Dashboard from './views/dashboard/Dashboard'
import SignUp from './user/views/signup/SignUp'
import Profile from './user/views/profile/index'
import TicketExchange from './views/TicketExchange';
import Events from './views/TicketExchange/components/Events';
import AccountList from './views/AccountList';
// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!', results)
})
.catch(() => {
  console.log('Error in web3 initialization.')
});

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/" component={App}>
          <IndexRoute component={AccountList} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
