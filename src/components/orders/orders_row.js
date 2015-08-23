import React from 'react';
import { toMoney, toDateTime, toTitleCase } from '../../lib/formatters';

class OrderRow extends React.Component {

  render() {

    const {order} = this.props;
    const products = order.get('products').map((p) => p.get('name')).join(', ');

    return (
      <tr className='order'>
        <td>{order.get('reference')}</td>
        <td>{order.get('customer')}</td>
        <td className='sorted-by'>{toDateTime(order.get('orderedAt'))}</td>
        <td>{products}</td>
        <td className='amount'>{toMoney(order.get('amount'))}</td>
        <td className='status'>{toTitleCase(order.get('paymentStatus'))}</td>
        <td className='status'>{toTitleCase(order.get('orderStatus'))}</td>
      </tr>
    );
  }

  shouldComponentUpdate(nextProps, nextState){
    /*
     * Since order is an immutable JS object, we can do a simple comparison
     * rather than having to do an expensive deep comparison
     */
    return nextProps.order !== this.props.order;
  }
}

export default OrderRow;