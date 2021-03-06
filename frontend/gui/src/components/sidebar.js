// Author - bharath k (bharatk7@in.ibm.com)
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import "./navbar.css";

const NavIcon = styled(Link)`
  margin-left: 10px;
  margin-right: 20px;
  float: left;
  height: 10px;
`;

const SidebarNav = styled.nav`
  background: #1affd424;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 50px;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  z-index: 10;
  overflow-y: auto;
  scrollbar-width: thin;
  transition: all 0.3s linear;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [sidebarmob, setsidebarmob] = useState(false);
  const [show, setshow] = useState(true);
  let root = document.documentElement;

  useEffect(() => {
    let size = window.screen.width;
    var myNav = document.getElementById("navbar");
    if (size > 520) {
      setshow(false);
      setSidebar(true);
      setsidebarmob(true);
      root.style.setProperty("--sidebarpadding", 250 + "px");
    } else {
      root.style.setProperty("--sidebarpadding", 0 + "px");
    }
    window.onscroll = () => {
      if (window.scrollY > 15) {
        myNav.classList.add("scrolled");
      } else {
        myNav.classList.remove("scrolled");
      }
    };
  }, [root.style]);

  const showSidebar = () => {
    setSidebar(!sidebar);

    if (sidebar === true) {
      root.style.setProperty("--sidebarpadding", 0 + "px");
    } else {
      root.style.setProperty("--sidebarpadding", 250 + "px");
    }
  };
  let user = localStorage.getItem("User");
  return (
    <>
      <IconContext.Provider value={{ color: "white" }}>
        <nav>
          <nav id="navbar" className="navbar navbar--fixed-top">
            <div className="title">
              {sidebarmob && (
                <NavIcon to="#">
                  <FaIcons.FaBars onClick={showSidebar} />
                </NavIcon>
              )}
              <div className="page_title">
                <Link to="/home" className="navbar-logo">
                  <span className="logo">GreenHouse</span>
                </Link>
              </div>
              <span className="user">{user}</span>
            </div>
          </nav>
        </nav>

        <SidebarNav className="sidenavcontainer" sidebar={sidebar}>
          <SidebarWrap>
            <div className="newbox">
              {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </div>
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
