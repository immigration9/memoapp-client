import styled from "styled-components";
import { NavLink } from "react-router-dom";

const activeClassName = "active";

export const LabelListWrapper = styled.div`
  height: 100%;
  width: 20%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const ListsSection = styled.div`
  margin-bottom: auto;
  overflow-y: auto;
`;

export const LabelWrapper = styled(NavLink).attrs({
  activeClassName: activeClassName
})`
  width: 100%;
  height: 3rem;
  background-color: white;
  border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
  color: blue;

  &.${activeClassName} {
    background-color: blue;
    color: white;
  }
`;
