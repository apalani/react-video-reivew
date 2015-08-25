import React from 'react';
import { Link } from 'react-router';

class MainNav extends React.Component {

  render(){
    return (

      <nav className='main-nav'>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/orders'>Orders</Link>
        <Link to='/catalog'>Catalog</Link>
      </nav>
    );
  }

  //shouldComponentUpdate(){
  //  //doesn't need to ever re-render
  //  return false;
  //}
}

export default MainNav;