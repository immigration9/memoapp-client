import styled from "styled-components";

export const MemoListWrapper = styled.div`
  height: 100%;
  width: 30%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const LabelSection = styled.div`
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
`;

export const MemoSection = styled.div`
  margin-top: 1rem;
  margin-bottom: auto;
  overflow-y: auto;
`;

export const ButtonPart = styled.div`
  display: flex;

  & > * {
    margin: 0.2rem;
  }
`;
