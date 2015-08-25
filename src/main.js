require('babel/polyfill');
//import React from 'react/addons';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import Dashboard from './components/dashboard';
import Orders from './components/orders';

//window.React = React; //used for debugging performance

ReactDOM.render((
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="orders" component={Orders}/>
    </Route>
  </Router>
), document.querySelector('#anchor'));