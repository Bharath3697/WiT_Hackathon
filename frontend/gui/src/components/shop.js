// Author - bharath k (bharatk7@in.ibm.com)
import React from "react";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import "./shop.css";

function Shop() {
  return (
    <>
      <div className="market_content">
        <h4 className="markhead">
          Items you throw as waste are resourceful. Dont let them damage the
          planet
        </h4>
      </div>
      <h5 id="trinfo">Type of items you can sell / purchase </h5>
      <div className="itemlist">
        <div className="containerxx">
          <div className="lh1">
            <p className="usehead">Useless to society</p>
            <hr className="usehr" />
            <ul className="wastelist">
              <li>Food Waste</li>
              <li>Crop Residue</li>
              <li>Tailored / waste Clothes</li>
              <li>Waste paper / Cardboard etc.</li>
            </ul>
          </div>
          <div className="rh1">
            <p className="usehead">Useful to society</p>
            <hr className="usehr1" />
            <ul className="wastelist">
              <li>BioGas</li>
              <li>Processed Manure</li>
              <li>AgriProducts</li>
            </ul>
          </div>
        </div>
        <div className="trbuttons">
          <Link to="/sell" className="navbar-logo">
            <button className="sell_item">
              Sell Items <IoIcons.IoMdArrowDropupCircle size={20} />
            </button>
          </Link>
          <Link to="/buy" className="navbar-logo">
            <button className="buy_item">
              Purchase Items <IoIcons.IoMdArrowDropdownCircle size={20} />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Shop;
