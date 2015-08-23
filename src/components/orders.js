import React from 'react';
import PageHeader from './page_header';
import OrdersTable from './orders/orders_table';
//import ORDERS_DATA from '../data/orders';
import { toTitleCase } from '../lib/formatters';
import OrdersActions from '../actions/orders_actions';
import OrdersStore from '../stores/orders_store';

const STATUSES = ['all', 'open', 'shipped'];

class TopCustomer extends React.Component {

  render(){
    let {topOrder} = this.props;
    if(!topOrder) return null;

    //immutable won't let you update the object itself (its immutable!), but it does return a new object
    topOrder = topOrder.set('customer', topOrder.get('customer').split(' ')[0]);

    return <div>Top customer: {topOrder.get('customer')}</div>;
  }
}

class Orders extends React.Component {

  constructor(props){

    super(props);
    this.onChange = this.onChange.bind(this);
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
        return order.get('orderStatus') === selectedStatus;
      })
    }

    if( amountFilter ){
      orders = orders.filter((order) => order.get('amount') === parseFloat(amountFilter));
    }

    //immutable list uses size instead of length
    const topOrder = orders.size ? orders.get(0) : null;

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
        <TopCustomer topOrder={topOrder} />
        <OrdersTable orders={orders} />
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.state !== nextState;
  }
}

export default Orders;