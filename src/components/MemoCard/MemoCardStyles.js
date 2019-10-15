import styled from "styled-components";
import { NavLink } from "react-router-dom";

const activeClassName = "active";
export const CardWrapper = styled(NavLink).attrs({
  activeClassName: activeClassName
})`
  display: flex;
  width: 100%;
  height: 8rem;
  margin: 5px 0;
  align-items: center;
  background-color: white;
  border: 1px solid blue;
  color: blue;

  &.${activeClassName} {
    background-color: blue;
    color: white;
  }
`;

export const CheckboxSection = styled.div`
  width: 10%;
`;

export const ContentSection = styled.div`
  width: 65%;
  padding: 0 0.5rem;
  text-align: left;
`;

export const Title = styled.div`
  font-size: 1.2rem;
`;

export const Summary = styled.div``;

export const TimeSection = styled.div`
  width: 25%;
  padding-right: 1rem;
  text-align: right;
`;
