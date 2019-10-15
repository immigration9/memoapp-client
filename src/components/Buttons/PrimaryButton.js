import React from "react";
import { PrimaryBtn } from "./ButtonStyles";

const PrimaryButton = ({ onClick, text, styles = {}, className }) => {
  return (
    <PrimaryBtn
      onClick={onClick}
      className={className}
      style={{ width: "100%", ...styles }}>
      {text}
    </PrimaryBtn>
  );
};

export default PrimaryButton;
