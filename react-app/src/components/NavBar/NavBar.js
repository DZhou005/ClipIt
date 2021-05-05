import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'


const NavBar = () => {
  const loggedInUser = useSelector(state => state.session.user.username)

  return (
    <nav>
      <div className='navContainer'>
        <div>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        <div className="dropdown">
          <button class='dropbtn'>{loggedInUser}</button>
          <div className="dropdown-content">
            <LogoutButton/>
            <a href="/profile">Link 2</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
