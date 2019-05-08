import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import lecture_info from './common/lecture_info';
import TopPart from './common/TopPart'
import Home from './views/Home'
import Lecture from './common/Lecture';


class App extends Component {
  render() {
    const lecture_routes = Object.keys(lecture_info).map((path) => {
      return <Route key={path} exact path={path} component={Lecture}/>;
    });

    return (
      <div className="h-100">
        <div>
          <TopPart></TopPart>
        </div>
        <Switch>
          <Route exact path="/" component={Home}/>
          {lecture_routes}
        </Switch>
      </div>
    );
  }
}

export default App;
