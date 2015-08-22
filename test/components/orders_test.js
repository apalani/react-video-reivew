import expect from 'expect.js';
import React from 'react/addons';
import sinon from 'sinon';
import Orders from '../../src/components/orders';
import OrdersTable from '../../src/components/orders/orders_table';
import { setupFakeDOM } from '../test_helper';

setupFakeDOM();
const TestUtils = React.addons.TestUtils;

describe('components/orders', () => {
  let subject;

  beforeEach(() => {

    subject = TestUtils.renderIntoDocument(<Orders />);
  });

  describe("#render", () => {
    describe("when selectedStatus is \"all\"", () => {

      beforeEach(()=>{

        subject.setState({selectedStatus: 'all'});
      });

      it('renders all orders', () => {

        const table = TestUtils.findRenderedComponentWithType(subject, OrdersTable);
        const statuses = table.props.orders.map((o) => o.orderStatus);

        expect(statuses).to.eql([
          'open', 'open', 'open', 'shipped'
        ])
      });
    });

    describe("when selectedStatus is \"open\"", () => {

      beforeEach(()=>{

        subject.setState({selectedStatus: 'open'});
      });

      it('renders all orders', () => {

        const table = TestUtils.findRenderedComponentWithType(subject, OrdersTable);
        const statuses = table.props.orders.map((o) => o.orderStatus);

        expect(statuses).to.eql([
          'open', 'open', 'open'
        ])
      });
    });

    describe("when selectedStatus is \"shipped\"", () => {

      beforeEach(()=>{

        subject.setState({selectedStatus: 'shipped'});
      });

      it('renders all orders', () => {

        const table = TestUtils.findRenderedComponentWithType(subject, OrdersTable);
        const statuses = table.props.orders.map((o) => o.orderStatus);

        expect(statuses).to.eql([
          'shipped'
        ])
      });
    });
  });

  describe("#handleStatusClick", () => {
    it('calls setState with the new selectedStatus', () => {

      //spys on any time the setState() method is called on subject (<Orders />)
      sinon.spy(subject, 'setState');

      //call our click handler
      subject.handleStatusClick('foo');

      //validate that calling handleStatusClick calls setState with: {selectedStatus: 'foo'}
      expect(subject.setState.calledWith({selectedStatus: 'foo'})).to.be(true);
    })
  });
});