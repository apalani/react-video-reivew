import alt from '../alt';
import DashboardActions from '../actions/dashboard_actions';
import immutableUtil from 'alt/utils/ImmutableUtil';
import Immutable from 'immutable';

class DashboardStore {
  constructor() {
    this.salesStats = Immutable.List();

    this.bindListeners({
      handleUpdateSales: DashboardActions.UPDATE_SALES,
      handleFetchSalesStats: DashboardActions.FETCH_SALES_STATS
    })
  }

  handleUpdateSales(sales){
    this.salesStats = sales;
  }

  handleFetchSalesStats(){
    this.salesStats = Immutable.List();
  }
}

export default alt.createStore(immutableUtil(DashboardStore));