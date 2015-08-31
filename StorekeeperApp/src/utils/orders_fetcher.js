var Immutable = require('immutable');
var parseOrders = './parse_orders';

const OrdersFetcher = {

  fetch(){
    return fetch('http://localhost:8000/orders.json')
      .then((resp) => resp.json())
      .then(parseOrders)
      .then((orders) => Immutable.fromJS(orders)); //makes the list immutable
  }
};

module.exports = OrdersFetcher;