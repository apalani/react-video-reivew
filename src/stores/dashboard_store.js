import alt from '../alt';
import DashboardActions from '../actions/dashboard_actions';
import immutableUtil from 'alt/utils/ImmutableUtil';
import Immutable from 'immutable';

class DashboardStore {
  constructor() {
    this.state = Immutable.fromJS({
      salesStats: []
    });

    this.bindListeners({
      handleUpdateSales: DashboardActions.UPDATE_SALES,
      handleFetchSalesStats: DashboardActions.FETCH_SALES_STATS
    })
  }

  handleUpdateSales(salesStats){
    //this.salesStats = sales;
    this.setState(this.state.setIn(['salesStats', salesStats]));
  }

  handleFetchSalesStats(){
    this.setState(this.state.setIn(['salesStats', Immutable.List()]));
  }
}

export default alt.createStore(immutableUtil(DashboardStore), 'DashboardStore');