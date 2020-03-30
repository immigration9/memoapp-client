import React from "react";
import { RemoveBtn } from "./ButtonStyles";

const RemoveButton = ({
  onClick,
  text,
  styles = {},
  className,
  size = "medium"
}) => {
  return (
    <RemoveBtn
      onClick={onClick}
      className={className}
      size={size}
      style={{ width: "100%", ...styles }}>
      {text}
    </RemoveBtn>
  );
};

export default RemoveButton;
