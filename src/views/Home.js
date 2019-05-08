import React, { Component } from 'react';

import MdView from '../common/MdView';


class Home extends Component {
  constructor (props) {
    super(props);
    
    
  }

  render () {
    
    return (
      <div className="mt-5 d-flex m-0 justify-content-center">
        <div className="">
          <MdView sourcePath={require('../md/home.md')}/>
        </div>
      </div>
    );
  }
}

export default Home;