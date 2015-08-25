require('babel/polyfill');
//import React from 'react/addons';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import routes from './routes';
import Iso from 'iso';
import alt from './alt';


/*
 * Iso will now take the data thats in the HTML and
 * pass it along to the callback function as state.
 * Then you can use that to bootstrap the alt stores with the data
 * so that it doesn't initialize on the client with an empty
 * list of Orders
 */
Iso.bootstrap((state, _, container)=>{

  //console.log(state);
  //console.log(_);
  //console.log(container);

  alt.bootstrap(state);

  ReactDOM.render((
    <Router history={history}>
      {routes}
    </Router>
  ), container);
});