import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import TopPart from './common/TopPart'
import Home from './views/Home'


class App extends Component {
  render() {
    return (
      <div className="h-100">
        <div className="mb-4">
          <TopPart></TopPart>
        </div>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default App;
