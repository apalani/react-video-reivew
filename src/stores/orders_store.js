import alt from '../alt';
import OrdersActions from '../actions/orders_actions';
//import immutableUtil from 'alt/utils/ImmutableUtil';
import Immutable from 'immutable';
import parseOrders from '../utils/parse_orders';

class OrderStore {
  constructor() {

    this.state = {
      orders: Immutable.List(),
      selectedStatus: 'all',
      amountFilter: null
    };

    this.bindListeners({
      handleUpdateOrders: OrdersActions.UPDATE_ORDERS,
      //handleFetchOrders: OrdersActions.FETCH_ORDERS,
      handleUpdateAmountFilter: OrdersActions.UPDATE_AMOUNT_FILTER,
      handleUpdateSelectedStatus: OrdersActions.UPDATE_SELECTED_STATUS
    })
  }

  handleUpdateOrders(orders){
    this.setState({ orders: orders });
  }

  handleUpdateAmountFilter(amount){
    this.setState({ amountFilter: amount });
  }

  handleUpdateSelectedStatus(status){
    this.setState({ selectedStatus: status });
  }

  //handleFetchOrders(){
  //  this.orders = [];
  //}
}

OrderStore.config = {
  onDeserialize: function(data){
    const nextState = Object.assign(
      {},
      data,
      {
        orders: Immutable.fromJS(parseOrders(data.orders))
      }
    );

    return nextState;
  }
};

export default alt.createStore(OrderStore, 'OrderStore');