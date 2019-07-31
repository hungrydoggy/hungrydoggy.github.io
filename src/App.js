import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import lecture_info from './common/lecture_info';
import TopPart from './common/TopPart'
import Home from './views/Home'
import Lecture from './common/Lecture';


class App extends Component {
  constructor (props) {
    super(props);

    this.lecture_paths = [];
    for (const pathhead in lecture_info) {
      const info = lecture_info[pathhead];
      for (const subpath in info) {
        const fullpath = `${pathhead}${subpath}`;
        this.lecture_paths.push(fullpath);
      }
    }
  }

  render() {
    const lecture_routes = this.lecture_paths.map((path) => {
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
