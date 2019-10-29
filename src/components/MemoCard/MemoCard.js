import React from "react";
import {
  CardWrapper,
  CardLink,
  CheckboxSection,
  ContentSection,
  TimeSection,
  Title,
  Summary
} from "./MemoCardStyles";
import moment from "moment";
import { Checkbox } from "antd";

function renderSummary(summary) {
  let htmlInput = summary || "";
  let textOnly = htmlInput.replace(/<[^>]+>/g, "");

  if (textOnly.length > 30) {
    return textOnly.slice(0, 28).concat("...");
  } else {
    return textOnly;
  }
}

function MemoCard(props) {
  let url = `/memo/${props.memo._id}`;
  if (props.labelId) {
    url = `/label/${props.labelId}` + url;
  }
  return (
    <CardWrapper>
      <CheckboxSection>
        <Checkbox checked={props.isChecked} onChange={props.changeStatus} />
      </CheckboxSection>
      <CardLink to={url}>
        <ContentSection>
          <Title>{props.memo.title}</Title>
          <Summary>{renderSummary(props.memo.content)}</Summary>
        </ContentSection>
        <TimeSection>
          {moment(props.memo.updatedAt).format("YYYY-MM-DD")}
        </TimeSection>
      </CardLink>
    </CardWrapper>
  );
}

export default MemoCard;
