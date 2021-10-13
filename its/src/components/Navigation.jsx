import React, {useState} from 'react'

import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import './Navigation.css';
import { IconContext } from 'react-icons'
import {TicketSidebarData} from './ticketSidebarData'
import {withRouter} from 'react-router-dom';
function Navbar(){
  const [sidebar, sectSidebar] = useState(false)
  
  
  const showSidebar = () => sectSidebar(!sidebar)
  let location=window.location.pathname;
  return (
    <>
    <IconContext.Provider value={{color: 'black'}}>
      <div className="navbar">
        <Link to="#" className='menu-bars'>
          <FaIcons.FaBars onClick={showSidebar}/>
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' >
          {/* <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose/>
            </Link>
          </li> */}
         
          {
           
          SidebarData.map((item, index) => {
            return (
             
              <li key={index} className={item.className}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      </IconContext.Provider>
    </>
  );
}

export default withRouter(Navbar)