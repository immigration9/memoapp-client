import styled from "styled-components";

export const MemoPadWrapper = styled.div`
  height: 100%;
  width: 50%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export const TitleSection = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InfoSection = styled.div`
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
`;

export const DatetimePart = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DatetimeInfo = styled.span`
  margin-right: 1rem;
`;

export const LabelsPart = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Label = styled.div`
  min-width: 2rem;
  padding: 0.3rem 1rem;
  margin-right: 0.3rem;
  background-color: blue;
  border-radius: 1.5rem;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
`;

export const EditorSection = styled.div`
  height: calc(100% - 6rem);
  border: 1px solid blue;
`;

export const ButtonPart = styled.div`
  display: flex;

  & > * {
    margin: 0.2rem;
  }
`;
