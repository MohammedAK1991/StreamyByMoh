import React from 'react';
import { Link } from 'react-router-dom';
import GoogeAuth from './GoogleAuth';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        StreamyByMoh
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Streams
        </Link>
        <GoogeAuth className="item" />
      </div>
    </div>
  );
}

export default Header;