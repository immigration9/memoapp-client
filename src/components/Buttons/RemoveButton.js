import React from "react";
import { RemoveBtn } from "./ButtonStyles";

const RemoveButton = ({ onClick, text, styles = {}, className }) => {
  return (
    <RemoveBtn
      onClick={onClick}
      className={className}
      style={{ width: "100%", ...styles }}>
      {text}
    </RemoveBtn>
  );
};

export default RemoveButton;
