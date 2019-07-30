import React from 'react';
import  logo_home from '../dist/images/dsv-logo.png';
import { Route, Router, Link } from 'react-router';

import { Home } from '../HomePage/HomePage';
import { Login }from '../LoginPage/LoginPage';


class Navigation extends React.Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/"><div class="imageLogo"><img class="home_logo" src={logo_home} /> </div> </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul id="navbar-mr" className="navbar-nav mr-auto"> 
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/">Bookings</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" path="/login" component={Login}>Logout</Link>
              </li>
            </ul>
          </div>
        </nav>
        
    )
  }
}

export default Navigation;