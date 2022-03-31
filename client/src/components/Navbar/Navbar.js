import React, { useState, useEffect, useRef } from "react";
import { Button } from "./Button";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import "./sidebar.scss";


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
    display: "Passengers",
    icon: <i className="bx bx-receipt"></i>,
    to: "/Passengers",
    section: "Passengers",
  },
  {
    display: "Airport risk data",
    icon: <i className="bx bx-receipt"></i>,
    to: "/AirportRisk",
    section: "AirportRisk",
  },
  {
    display: "Terminal risk data",
    icon: <i className="bx bx-receipt"></i>,
    to: "/TerminalRisk",
    section: "TerminalRisk",
  },
  {
    display: "Flight risk data",
    icon: <i className="bx bx-receipt"></i>,
    to: "/FlightRisk",
    section: "FlightRisk",
  },
  {
    display: "Passenger risk data",
    icon: <i className="bx bx-receipt"></i>,
    to: "/PassengerRisk",
    section: "PassengerRisk",
  },
  {
    display: "Terrorism risk data",
    icon: <i className="bx bx-receipt"></i>,
    to: "/TerrorismRisk",
    section: "TerrorismRisk",
  },
  {
    display: "Narcotics risk data",
    icon: <i className="bx bx-receipt"></i>,
    to: "/NarcoticsRisk",
    section: "NarcoticsRisk",
  },
  {
    display: "Smuggling risk data",
    icon: <i className="bx bx-receipt"></i>,
    to: "/SmugglingRisk",
    section: "SmugglingRisk",
  },
  {
    display: "Immigration risk data",
    icon: <i className="bx bx-receipt"></i>,
    to: "/ImmigrationRisk",
    section: "ImmigrationRisk",
  },
  {
    display: "Revenue risk data",
    icon: <i className="bx bx-receipt"></i>,
    to: "/RevenueRisk",
    section: "RevenueRisk",
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

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };


  // Function activates when components starts
  useEffect(() => {
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


  // Resize the buttons when the window size changes 
  window.addEventListener("resize", showButton);

  return (
    <>

    {/* Rending the navbar on top */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link
            to="/"
            className="navbar-logo"
            style={{
              marginTop: 0,
              width: 500,
              fontFamily: "Oswald, sans-serif",
            }}
            onClick={closeMobileMenu}
          >
            GreenLine Systems
            <i class="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
        </div>
      </nav>
      

      {/* rendering the side menu */}
      <div className='sidebar'>  
      <br/>
        <div className="sidebar__logo">
            Animate
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>
    </>
  );
}

export default Navbar;
