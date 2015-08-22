import React from 'react';
import PageHeader from './page_header';
import OrdersTable from './orders/orders_table';
import ORDERS_DATA from '../data/orders';
import { toTitleCase } from '../lib/formatters';

const STATUSES = ['all', 'open', 'shipped'];

class Orders extends React.Component {

  constructor(props){

    super(props);
    this.state = { selectedStatus: 'all' };
  }

  handleStatusClick(status) {

    this.setState({selectedStatus: status});
  }

  render() {

    const { selectedStatus } = this.state;
    const statuses = STATUSES.map((status, i) => {

      const className = status === selectedStatus ? 'selected status' : 'status';

      return (

        <a key={i} className={className} onClick={this.handleStatusClick.bind(this, status)}>
          {toTitleCase(status)}
        </a>
      )
    });

    let orders = ORDERS_DATA;
    if( selectedStatus !== 'all'){

      orders = ORDERS_DATA.filter((order) => {

        return order.orderStatus === selectedStatus;
      })
    }

    return (
      <div className='orders'>
        <h2>Hello world</h2>
        <PageHeader>
          <h1>Orders</h1>
          <nav className='status-nav'>{statuses}</nav>
        </PageHeader>
        <OrdersTable orders={orders} />
      </div>
    );
  }
}

export default Orders;