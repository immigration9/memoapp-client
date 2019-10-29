import styled from "styled-components";
import { NavLink } from "react-router-dom";

const activeClassName = "active";

export const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 8rem;
  margin: 5px 0;
  background-color: white;
  color: blue;
`;

export const CardLink = styled(NavLink).attrs({
  activeClassName: activeClassName
})`
  display: flex;
  width: 90%;
  align-items: center;
  border: 1px solid blue;
  justify-content: space-between;

  &.${activeClassName} {
    background-color: blue;
    color: white;
  }
`;

export const CheckboxSection = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentSection = styled.div`
  padding-left: 1rem;
  text-align: left;
`;

export const Title = styled.div`
  font-size: 1.2rem;
`;

export const Summary = styled.div``;

export const TimeSection = styled.div`
  padding-right: 1rem;
  text-align: right;
`;
