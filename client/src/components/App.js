import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './Home';
import Contact from './Contact';
import Resume from './Resume';
import Portfolio from './Portfolio';
import Menu from './Menu';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Menu />
          <div className="pusherContent">
            <div className="menuSpace"></div>
            <div className="pageContainer">
              <Route path="/" exact component={Home}></Route>
              <Route path="/contact" exact component={Contact}></Route>
              <Route path="/portfolio" exact component={Portfolio}></Route>
              <Route path="/resume" exact component={Resume}></Route>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
