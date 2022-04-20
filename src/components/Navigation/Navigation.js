import React, {useState} from 'react';
import './Navigation.css';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {Link} from 'react-router-dom';
import {NavData} from './NavData.js'
import { NavLink } from 'react-router-dom';
import {IconContext} from 'react-icons'
function Navigation() {
   const [sidebar, setSidebar] = useState(false);

   const showSidebar = () => setSidebar(!sidebar);
    return (
       <>
       <IconContext.Provider value= {{color: '#fff'}}>
         <div className="navbar">
            {/* <h1 className="navbar-h1">Airplane Delay Analysis</h1>  */}
            <NavLink className="navbar-h1" to="/">Airplane Delay Analysis</NavLink>
            <NavLink className="nav-link" to="/Trend2">Trend 1</NavLink>
            <NavLink className="nav-link" to="/Trend3">Trend 2</NavLink>
            <NavLink className="nav-link" to="/Trend4">Trend 3</NavLink>
            <NavLink className="nav-link" to="/Trend5">Trend 4</NavLink>
            <NavLink className="nav-link" to="/Trend1">Trend 5</NavLink>
            <NavLink className="nav-link" to="/TupleCount">Total Tuples</NavLink>
            <NavLink className="nav-link" to="/Visualizations">Tables</NavLink>
         </div>
         <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
               <li className="navbar-toggle">
                  <Link to = "#" className='menu-bars'>
                     <AiIcons.AiOutlineClose/>
                  </Link>
               </li>
               {NavData.map((item, index) => {
                  return (
                     <li key={index} className={item.cName}>
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
 
export default Navigation;