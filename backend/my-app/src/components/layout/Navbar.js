import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar bg-dark">
        <h1>
            <Link to="/"> <i className="fas fa-code"></i> DevConnector </Link>
        </h1>
        <ul>
            <li><Link to="/profiles">Developers</Link></li>

            <li>
                <Link  className='nav-item'  to="/register">Register</Link>
            </li>

            <li>
                <Link  className='nav-item'  to="/login">Login</Link>
            </li>

        </ul>
        </nav>      
      </div>
    )
  }
}


export default Navbar;