import React from 'react'
import './Header.css'
import Search from '../Search'

function Header(props) {
  return (
    <div className="Header">
      <Search updateTweets={props.updateTweets} />
    </div>
  );
}

export default Header;
