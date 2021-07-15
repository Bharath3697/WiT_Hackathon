// Author - bharath k (bharatk7@in.ibm.com)
import React from "react";
import "./general.css";

const DisplayImg = (props) => {
  var harmless = props.pestlist;
  var name = props.name;
  return (
    <div className="pest_images">
      <h2>{name}</h2>
      {harmless.length > 0
        ? harmless.map((eachbug) =>
            eachbug.map((bug, index) =>
              index !== 0 ? (
                <img className="bugimage" key={index} alt={index} src={bug} />
              ) : (
                <div className="bugalign">
                  <div className="bugname">
                    <hr />
                    {bug}
                  </div>
                </div>
              )
            )
          )
        : "length 0"}
    </div>
  );
};
export default DisplayImg;
