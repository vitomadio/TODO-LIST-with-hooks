import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import About from './pages/about/About.jsx';
import Navigation from './components/Navigation/Navigation.jsx';
import Store from './store';
import './style.scss';

function App() {

  return (
    <Store>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
        </Switch>
      </Router>
    </Store>
  );
}

export default hot(App);
