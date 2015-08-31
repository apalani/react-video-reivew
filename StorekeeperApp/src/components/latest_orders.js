var React = require('react-native');
var OrderStore = require('../stores/orders_store');
var OrderActions = require('../actions/orders_actions');
var { toMoney, toDateTime } = require('../lib/formatters');
var {
  StyleSheet,
  Text,
  View,
  } = React;

class LatestOrders extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = OrderStore.getState();
  }

  componentDidMount() {
    OrderStore.listen(this.onChange);
    OrderActions.fetchOrders();
  }

  componentWillUnmount() {
    OrderStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {

    var rows = this.state.orders.map((order, i)=> {
      return (
        <View style={styles.row} key={i}>
          <Text style={[styles.column, styles.ref]}>{order.get('reference')}</Text>
          <Text style={[styles.column, styles.date]}>{toDateTime(order.get('orderedAt'))}</Text>
          <Text style={[styles.column, styles.amount]}>{toMoney(order.get('amount'))}</Text>
        </View>
      );
    });

    return (
      <View>
        <Text style={styles.title}>Hello from Latest Orders</Text>
        <View>
          {rows}
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 30
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  column: {
    fontSize: 18
  },
  ref: {
    width: 80
  },
  date: {
    width: 150,
    textAlign: 'center'
  },
  amount: {
    width: 80,
    textAlign: 'right'
  }
});

module.exports = LatestOrders;