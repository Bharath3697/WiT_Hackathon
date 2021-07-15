// Author - bharath k (bharatk7@in.ibm.com)
import React from "react";
import { Link } from "react-router-dom";
import "./shop.css";

function Shop() {
  return (
    <>
      <div className="market_content">
        <h4>Items you throw as waste are resourceful. Dont let them damage the planet</h4>
      </div>
      <div className="itemlist">
        <h5>Type of items you can sell / purchase : </h5>
        <ul>
          <br />
          <li>Food Waste</li>
          <li>BioGas</li>
          <li>Processed Manure</li>
          <li>AgriProducts</li>
          <li>Crop Residue</li>
          <li>Waste paper / Cardboard etc.</li>
        </ul>
      </div>
      <Link to="/sell" className="navbar-logo">
        <button className="sell_item">Sell</button>
      </Link>
      <Link to="/buy" className="navbar-logo">
        <button className="buy_item">Purchase</button>
      </Link>
    </>
  );
}

export default Shop;
