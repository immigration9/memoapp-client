import styled from "styled-components";

export const PrimaryBtn = styled.button`
  background-color: white;
  border: 1px solid blue;
  height: 2rem;
  border-radius: 1rem;

  text-decoration: none;
  cursor: pointer;
  color: blue;

  &:hover {
    background-color: blue;
    border: none;
    color: white;
  }
`;

export const RemoveBtn = styled.button`
  background-color: white;
  border: 1px solid red;
  height: 2rem;
  border-radius: 1rem;

  text-decoration: none;
  cursor: pointer;
  color: red;

  &:hover {
    background-color: red;
    border: none;
    color: white;
  }
`;
