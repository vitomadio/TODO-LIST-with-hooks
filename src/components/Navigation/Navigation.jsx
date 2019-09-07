import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';
import './Navigation.scss';

const Navigation = () => {
  return (
    <Fragment>
      <nav className="nav-wrapper">
        <h1>Todo App In React Hooks</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>
    </Fragment>
  )
 }

export default Navigation;
