import alt from '../alt';
import OrdersActions from '../actions/orders_actions';
import immutableUtil from 'alt/utils/ImmutableUtil';
import Immutable from 'immutable';

class OrderStore {
  constructor() {
    this.orders = Immutable.List();
    this.selectedStatus = 'all';
    this.amountFilter = null;

    this.bindListeners({
      handleUpdateOrders: OrdersActions.UPDATE_ORDERS,
      handleFetchOrders: OrdersActions.FETCH_ORDERS,
      handleUpdateAmountFilter: OrdersActions.UPDATE_AMOUNT_FILTER,
      handleUpdateSelectedStatus: OrdersActions.UPDATE_SELECTED_STATUS
    })
  }

  handleUpdateOrders(orders){
    this.orders = orders;
  }

  handleUpdateSelectedStatus(status){
    this.selectedStatus = status;
  }

  handleUpdateAmountFilter(amount){
    this.amountFilter = amount;
  }

  handleFetchOrders(){
    this.orders = [];
  }
}

export default alt.createStore(immutableUtil(OrderStore));