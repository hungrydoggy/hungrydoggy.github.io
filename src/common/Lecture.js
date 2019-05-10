import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import lecture_info from '../common/lecture_info';
import MdView from '../common/MdView';

import './Lecture.css';


class Lecture extends Component {
  constructor (props) {
    super(props);
    
  }

  render () {
    
    return (
      <div className="d-flex" style={{minHeight:'100%'}}>
        <div className="pt-4 pl-4" style={{flex:'0 0 18rem', backgroundColor:'#F5F7F9'}}>
          {this._makeLeftMenu()}
        </div>
        <div className="py-5 pl-5">
          <div className="ml-5">
            <MdView sourcePath={lecture_info[window.location.pathname].md_source_path}/>
          </div>
        </div>
      </div>
    );
  }


  _makeLeftMenu () {
    // make path_map
    const path_map = {};
    Object.keys(lecture_info).map((fullpath) => {
      const info = lecture_info[fullpath];
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
    for (const path in path_map) {
      const info = path_map[path];
      
      left_menus.push(
        <div key={path} style={{paddingLeft: `${depth*2}rem`}}>
          <Link style={{color: '#5C6975'}} to={(info.md_source_path === undefined)? undefined: info.path}>
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