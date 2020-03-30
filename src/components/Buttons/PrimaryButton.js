import React from "react";
import { PrimaryBtn } from "./ButtonStyles";

const PrimaryButton = ({
  onClick,
  text,
  styles = {},
  className,
  size = "medium"
}) => {
  return (
    <PrimaryBtn
      onClick={onClick}
      className={className}
      size={size}
      style={{ width: "100%", ...styles }}>
      {text}
    </PrimaryBtn>
  );
};

export default PrimaryButton;
