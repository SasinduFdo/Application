import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import "./sidebar.scss";
import {Button} from "./Button";
// List of the side menu items
const sidebarNavItems = [
  {
    display: "Home",
    icon: <i className="bx bx-home"></i>,
    to: "/",
    section: "",
  },
  {
    display: "Airlines",
    icon: <i className="bx bx-star"></i>,
    to: "/Airlines",
    section: "Airlines",
  },
  {
    display: "Airports",
    icon: <i className="bx bx-calendar"></i>,
    to: "/Airports",
    section: "Airports",
  },
  {
    display: "Flights",
    icon: <i className="bx bx-user"></i>,
    to: "/Flights",
    section: "Flights",
  },
  {
    display: "Risk data",
    icon: <i className="bx bx-receipt"></i>,
    to: "/RiskData",
    section: "RiskData",
  },
  {
    display: "Register New User",
    icon: <i className="bx bx-receipt"></i>,
    to: "/Registration",
    section: "Registration",
  },
];

function Navbar() {
  //List of variables/hooks used in the component
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();
  const [log, setLog] = useState(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  // Function activates when components starts
  useEffect(() => {
    if ("Logged" === localStorage.getItem("login")) {
      setLog(true);
    }
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  // Change active index on the side menu
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  // Function activates when components starts
  useEffect(() => {
    showButton();
  }, []);

  const logOut = async ()  => {
    await window.localStorage.clear();
    window.location.reload();
  };

  // Resize the buttons when the window size changes
  window.addEventListener("resize", showButton);

  return (
    <>
      {log ? (
        <>
          <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' style={{marginTop:0,width:500,fontFamily:"Oswald, sans-serif"}} onClick={closeMobileMenu}>
            Greenline Systems
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link
                className='nav-links-mobile'
                onClick={closeMobileMenu && logOut}
              >
                LOGOUT
              </Link>
            </li>

            <li className='nav-item' style={{marginTop:12}}>
            <span >{button && <Button style={{fontFamily:"'Bebas Neue', cursive",fontSize:25}}  buttonStyle='btn--outline' onClick={logOut}>LOGOUT</Button>}</span>
            </li>
            
          </ul>
        </div>
      </nav>

          {/* rendering the side menu */}
          <div className="sidebar">
            <br />
            <div className="sidebar__logo">Animate</div>
            <div ref={sidebarRef} className="sidebar__menu">
              <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                  transform: `translateX(-50%) translateY(${
                    activeIndex * stepHeight
                  }px)`,
                }}
              ></div>
              {sidebarNavItems.map((item, index) => (
                <Link to={item.to} key={index}>
                  <div
                    className={`sidebar__menu__item ${
                      activeIndex === index ? "active" : ""
                    }`}
                  >
                    <div className="sidebar__menu__item__icon">{item.icon}</div>
                    <div className="sidebar__menu__item__text">
                      {item.display}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Navbar;
