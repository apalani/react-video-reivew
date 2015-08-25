import Immutable from 'immutable';

const SalesFetcher = {

  fetch(){
    return fetch('/sales.json')
      .then((resp) => resp.json())
      .then((sales) => Immutable.fromJS(sales)); //makes the list immutable
  }
};

export default SalesFetcher;