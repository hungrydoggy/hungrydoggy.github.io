import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'

import 'bootstrap';


class TopPart extends Component {
  constructor (props) {
    super(props);
  }

  render () {

    const cur_path = window.location.pathname;

    const data = this._makeData();

    const menu_tags = data.menus.map((menu, idx)=>{


      if(menu.sub_menu === undefined) { // have no sub-menu

        return (
          <Link className={'nav-item nav-link mx-3' + ((cur_path === menu.path)?' active':'')} to={menu.path} key={menu.path}>
            {menu.name}
          </Link>
        );

      }else { // have sub-menu
        
        let sub_menus = menu.sub_menu.map((sub_menu)=>{
          return (
            <Link className={'dropdown-item ' + ((cur_path === sub_menu.path)?' bg-secondary text-white':'')} to={sub_menu.path} key={sub_menu.path}>
              {sub_menu.name}
            </Link>
          );
        });

        return (
        <div className="dropdown" key={idx}>
          <div className="nav-item nav-link mx-3 dropdown-toggle" style={{cursor:'pointer'}} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {menu.name}
          </div>
          <div className="dropdown-menu" style={{width:'20rem'}} aria-labelledby="dropdownMenuButton">
            {sub_menus}
          </div>
        </div>
        );
      }
    });
    
    const right_menu_tags = data.right_menus.map((menu, idx)=>{
      return (
        <Link className={'nav-item nav-link mx-3 my-0 py-0' + ((cur_path === menu.path)?' active':'')} to={menu.path} key={menu.path}>
          <h4>{menu.name}</h4>
        </Link>
      );
    });

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          {/* <Link className="navbar-brand" to="/"><Logo height={'2rem'}/></Link> */}
          <Link className="navbar-brand" to="/">김종헌의 강의 블로그</Link>
          <div className="mx-3"></div>
          <div className="navbar-nav flex-grow-1">
            <div className="w-100 d-flex align-items-center">
              {menu_tags}
              <div className="flex-grow-1"></div>
              {/* <button className="btn btn-sm btn-secondary" onClick={()=>this._logout()}>logout</button> */}
              {right_menu_tags}
            </div>
          </div>
        </nav>
      </div>
    );
  }
  
  _makeData () {
    return {
      menus: [
        {
          name: 'Flutter - Fast Campus',
          path: '/flutter/Fast-Campus/2019-08-03/intro',
        },
        // {
        //   name: 'Flutter',
        //   sub_menu: [
        //     {
        //       name: 'Fast Campus 2019-05-11',
        //       path: '/fast-campus-2019-05-11',
        //     },
        //   ],
        // },
      ],
      right_menus: [
        // { name: 'Tips'     , path: '/tips'     },
      ],
    };
  }

  _logout () {
    this.redirect_path = '/login';
    this.setState({});
  }
}

export default TopPart;
