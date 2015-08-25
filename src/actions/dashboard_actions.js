import alt from '../alt';
import SalesFetcher from '../utils/sales_fetcher';

class DashboardActions {

  updateSales(sales){
    this.dispatch(sales);
  }

  fetchSalesStats(){

    //dispatches empty array right away
    this.dispatch([]);

    SalesFetcher.fetch()
      .then(this.actions.updateSales.bind(this))
  }

}

export default alt.createActions(DashboardActions);