// Author - bharath k (bharatk7@in.ibm.com)
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #0be539;
    cursor: pointer;
    text-decoration: none;
    color: #20c997;
  }
  &:active {
    background: #0031a06b;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #00000078;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 18px;

  &:hover {
    background: #0c0c0cb0;
    border-left: 4px solid white;
    cursor: pointer;
    text-decoration: none;
    color: white;
  }
`;

const SubMenu = ({ item }) => {
  const activebar = (id) => {
    var bars = document.getElementsByClassName("box");
    for (var i = 0; i < bars.length; i++) {
      bars[i].classList.remove("box-act");
    }

    document.getElementById(id).classList.add("box-act");
  };

  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <div className="box" id={item.id} onClick={() => activebar(item.id)}>
        <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
          <div>
            {item.icon}
            <SidebarLabel>{item.title}</SidebarLabel>
          </div>
          <div>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
              ? item.iconClosed
              : null}
          </div>
        </SidebarLink>
        {subnav &&
          item.subNav.map((item, index) => {
            return (
              <DropdownLink to={item.path} key={index}>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
              </DropdownLink>
            );
          })}
      </div>
    </>
  );
};

export default SubMenu;
