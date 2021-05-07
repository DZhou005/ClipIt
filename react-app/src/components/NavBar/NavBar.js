import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'


const NavBar = () => {
  const loggedInUser = useSelector(state => state.session.user.username)

  return (
    <nav>
        <div>
          <Link to="/" exact={true} activeClassName="active">
            Home
          </Link>
        </div>
      <div className='navContainer'>
        <div className='uploadButtonContainer'>
          <Link className='fas fa-file-upload fa-2x uploadButton' to='/upload'></Link>
        </div>
        <div className="dropdown">
          <button className='dropbtn'>{loggedInUser[0].toUpperCase()}</button>
          <div className="dropdown-content">
            <a href={`/profile/${loggedInUser}`}>Profile</a>
            <LogoutButton/>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
