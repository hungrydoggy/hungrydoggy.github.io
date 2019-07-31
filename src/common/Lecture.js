import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import lecture_info from '../common/lecture_info';
import MdView from '../common/MdView';

import './Lecture.css';


class Lecture extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      md_info: {},
    };
  }

  componentDidMount () {
    this._fetchAndRefresh();
  }

  render () {
    
    return (
      <div className="d-flex" style={{minHeight:'100%'}}>
        <div className="py-4 pl-4" style={{flex:'0 0 18rem', backgroundColor:'#F5F7F9'}}>
          {this._makeLeftMenu()}
        </div>
        <div className="py-5 pl-5">
          <div className="ml-5">
            {
              (this.state.md_info[window.location.pathname] === undefined)? null:
              <MdView sourcePath={this.state.md_info[window.location.pathname].md_source_path}/>
            }
          </div>
        </div>
      </div>
    );
  }


  async _fetchAndRefresh () {
    const pathhead = this._findPathHead();
    if (pathhead === null) {
      this.setState({
        md_info: {},
      });
      return;
    }

    const md_info = {};
    for (const subpath in lecture_info[pathhead]) {
      const fullpath = `${pathhead}${subpath}`;
      md_info[fullpath] = lecture_info[pathhead][subpath];
    }

    this.setState({
      md_info,
    });
  }

  _findPathHead () {
    for (const pathhead in lecture_info) {
      if (window.location.pathname.startsWith(pathhead) === true)
        return pathhead;
    }
    return null;
  }

  _makeLeftMenu () {
    // make path_map
    const path_map = {};
    Object.keys(this.state.md_info).map((fullpath) => {
      const info = this.state.md_info[fullpath];
      info.path = fullpath;

      const paths = info.name.split('/');
      let pm = path_map;
      for (const pi in paths) {
        const p = paths[pi];
        if (parseInt(pi) === paths.length - 1)
          pm[p] = info;
        else if (pm[p] === undefined)
          pm[p] = {};
        
        pm = pm[p];
      }
    });

    
    const left_menus = [];
    this._makeLeftMenu_step(left_menus, path_map, 0);

    return left_menus;
  }

  _makeLeftMenu_step (left_menus, path_map, depth) {
    const __getFirstPath = (info) => {
      if (info.path !== undefined)
        return info.path;
      
      return __getFirstPath(info[Object.keys(info)[0]]);
    };

    for (const path in path_map) {
      const info = path_map[path];
      
      left_menus.push(
        <div key={path} style={{paddingLeft: `${depth*1.5}rem`}}>
          <Link
            style={{color: '#5C6975'}}
            to={(info.md_source_path === undefined)? __getFirstPath(info): info.path}
          >
            <h6
              style={{
                fontWeight: (window.location.pathname === info.path)? 'bolder': 'normal',
                textDecoration: (window.location.pathname === info.path)? 'underline': '',
              }}
            >
              {path}
            </h6>
          </Link>
        </div>
      );

      if (info.md_source_path === undefined)
        this._makeLeftMenu_step(left_menus, info, depth + 1);
    }
  }
}

export default Lecture;