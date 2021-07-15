// Author - bharath k (bharatk7@in.ibm.com)
import React from "react";
import "./Button.css";

const STYLES = [
  "btn--primary",
  "btn--fileupload",
  "btn--fileupload1",
  "btn--primaryw",
  "btn--primary1",
  "btn--primary2",
  "btn--outline",
  "btn--test",
  "btn--secondary",
  "btn--secondary1",
  "btn--secondaryp",
  "btn--login",
  "btn--login1",
];

const SIZES = [
  "btn--medium",
  "btn--large",
  "btn--small",
  "btn--small--opt",
  "btn--small--progress",
  "btn--small--search",
];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  id,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {" "}
      {children}{" "}
    </button>
  );
};
