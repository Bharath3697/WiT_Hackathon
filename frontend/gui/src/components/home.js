// Author - bharath k (bharatk7@in.ibm.com)
import React, { useEffect } from "react";
import "./shop.css";

function Home(props) {
  useEffect(() => {
    var bars = document.getElementsByClassName("box");
    for (var i = 0; i < bars.length; i++) {
      bars[i].classList.remove("box-act");
    }
  }, []);

  return (
    <>
      <div className="market_content">
        {/* <h4>Welcome to the GreenHouse. Let us save the earth together !!</h4> */}
        {/* </div>
      <div> */}
        <span className="dyk">
          Did you know the extravagance/wastage caused by us?
          <hr className="headlineinfo" />
        </span>
        <br />
        <p className="dykp">
          <b>- </b>The United Nations Food and Agriculture Organization ( FAO )
          estimates that more than <b>40% </b>of food produced is
          <b> wasted </b>
          in India
        </p>
        <p className="dykp">
          <b>- </b>A typical passenger vehicle emits about
          <b> 4.6 metric tons</b> of carbon dioxide per year ( <b>Petrol</b>/
          <b>Diesel </b> )
        </p>
        <p className="dykp">
          <b>- </b>In India Almost <b>190 million</b> people go to sleep hungry,
          on most days.<b> 8 million</b> people are below the poverty line.
          <b> Reason : </b> Unemployment
        </p>

        <p className="dykp">
          <b>- </b>Wrong use of pesticide result in wasted material, failure to
          control the pest, and damage to the soil, harmful effects to humans &
          other living things and devastating effect on our entire ecosystem
        </p>
        <p className="dykp">
          <b>- </b>Chemical fertilizers cause burn to your crops, high air
          pollution, water pollution, acidification of your soil, mineral
          depletion and make the soil dry causing more water consumption than
          required
        </p>

        <span className="dyk">
          How GreenHouse can turn them to Resourceful ?
          <hr className="headlineinfo" />
        </span>
        <br />
        <p className="dykp">
          <b>- </b> Sell the food which is not fit for consumption here. We can
          process it for good cause
        </p>
        <p className="dykp">
          <b>- </b> Sell organic, bio degradable wastes ( crop residue, papers,
          cardboards ... ) here for the production of biogas
        </p>
        <p className="dykp">
          <b>- </b> Buy processed manure which is better than chemical
          fertilizers, to get better yield
        </p>
        <p className="dykp">
          <b>- </b> Use our recommendation engine to know the suitable crop for
          your soil, harmful and harmless pests you might encounter
        </p>
        <p className="dykp">
          <b>- </b> Donate what you think is excess for you ( food, clothes,
          books, seeds ... )
        </p>
        <p className="dykp">
          <b>- </b> Request workforce for your agri works, Request to work for
          someone who needs manpower
        </p>
      </div>

      <h2 className="ally">
        All you need to do is <b>POST</b>
      </h2>
    </>
  );
}

export default Home;
