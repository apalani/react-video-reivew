import express from 'express';
import fs from 'fs';
import { Router } from 'react-router';
import Location from 'react-router/lib/location';
import routes from './src/routes';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import Iso from 'iso';
import alt from './src/alt';

let app = express();
app.use(express.static('public'));

//app.get('/', (req, res) => {
//  res.sendFile(__dirname + '/public/index.html');
//});
//
//app.get('/orders', (req, res) => {
//  res.sendFile(__dirname + '/public/index.html');
//});
//
//app.get('/dashboard', (req, res) => {
//  res.sendFile(__dirname + '/public/index.html');
//});


// Data Endpoints
app.get('/orders.json', (req, res) => {
  setTimeout(()=>{
    res.sendFile(__dirname + '/data/orders.json');
  }, 2000); //faking delay of 2 seconds
});

app.get('/sales.json', (req, res) => {
  res.sendFile(__dirname + '/data/sales.json');
});

app.get('/orders', (req, res, next) => {
  const orders = JSON.parse(fs.readFileSync(__dirname + '/data/orders.json'));

  res.locals.data = {
    OrderStore: {
      orders: orders,
      selectedStatus: 'all',
      amountFilter: null
    }
  }

  next();
});

// Render UI with React Router & React
app.use((req, res, next) => {
  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  let iso = new Iso();
  Router.run(routes, new Location(req.url), (error, props) => {
    const content = ReactDOMServer.renderToString(<Router {...props} />);
    iso.add(content, alt.flush());
    res.render('index.ejs', { html: iso.render() });
  })
});


const server = app.listen(8000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Storekeeper app listening at http://%s:%s', host, port);
});