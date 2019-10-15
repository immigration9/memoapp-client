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
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DatetimePart = styled.div`
  display: flex;
  flex-direction: column;
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
