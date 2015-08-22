import React from 'react';
import PageHeader from './page_header';
import OrdersTable from './orders/orders_table';
//import ORDERS_DATA from '../data/orders';
import { toTitleCase } from '../lib/formatters';
import OrdersActions from '../actions/orders_actions';
import OrdersStore from '../stores/orders_store';

const STATUSES = ['all', 'open', 'shipped'];

class Orders extends React.Component {

  constructor(props){

    super(props);
    this.onChange = this.onChange.bind(this);
    //debugger;
    this.state = OrdersStore.getState();
  }

  componentDidMount(){
    OrdersStore.listen(this.onChange);
    OrdersActions.fetchOrders();
  }

  componentWillUnmount(){
    OrdersStore.unlisten(this.onChange);
  }

  onChange(state){
    this.setState(state);
  }

  handleStatusClick(status) {

    OrdersActions.updateSelectedStatus(status);
  }

  handleAmountFilterChange(ev){
    OrdersActions.updateAmountFilter(ev.currentTarget.value || null);
  }

  render() {

    const { selectedStatus, amountFilter } = this.state;
    const statuses = STATUSES.map((status, i) => {

      const className = status === selectedStatus ? 'selected status' : 'status';

      return (

        <a key={i} className={className} onClick={this.handleStatusClick.bind(this, status)}>
          {toTitleCase(status)}
        </a>
      )
    });

    let { orders } = this.state;
    if( selectedStatus !== 'all'){
      orders = orders.filter((order) => {
        return order.orderStatus === selectedStatus;
      })
    }

    if( amountFilter ){
      orders = orders.filter((order) => order.amount === parseFloat(amountFilter));
    }

    return (
      <div className='orders'>
        <h2>Hello world</h2>
        <PageHeader>
          <h1>Orders</h1>
          <nav className='status-nav'>{statuses}</nav>
          <form className='amount-filter'>
            <input
              type='text'
              placeholder='Filter by amount'
              value={amountFilter}
              onChange={this.handleAmountFilterChange.bind(this)} />
          </form>
        </PageHeader>
        <OrdersTable orders={orders} />
      </div>
    );
  }
}

export default Orders;