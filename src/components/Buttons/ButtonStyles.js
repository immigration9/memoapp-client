import styled, { css } from "styled-components";

export const Button = styled.button`
  background-color: white;

  text-decoration: none;
  cursor: pointer;

  ${({ size }) =>
    size === "medium"
      ? css`
          height: 2rem;
          font-size: 0.9rem;
          border-radius: 1rem;
        `
      : css`
          height: 3rem;
          font-size: 1.5rem;
          border-radius: 3rem;
        `}
`;

export const PrimaryBtn = styled(Button)`
  border: 1px solid blue;
  color: blue;

  &:hover {
    background-color: blue;
    border: none;
    color: white;
  }
`;

export const RemoveBtn = styled(Button)`
  border: 1px solid red;
  color: red;

  &:hover {
    background-color: red;
    border: none;
    color: white;
  }
`;
