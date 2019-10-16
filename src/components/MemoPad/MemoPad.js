import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  MemoPadWrapper,
  TitleSection,
  InfoSection,
  DatetimePart,
  EditorSection,
  ButtonPart
} from "./MemoPadStyles";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import RemoveButton from "components/Buttons/RemoveButton";
import { Select, Input } from "antd";
import moment from "moment";
import PrimaryButton from "components/Buttons/PrimaryButton";
import { deleteMemo, updateMemo } from "actions/memoActions";

const DATETIME_FORMAT = "YYYY-MM-DD HH:mm";

function stateFromHtml(html) {
  const { contentBlocks, entityMap } = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  return EditorState.createWithContent(contentState);
}

function htmlFromState(state) {
  return draftToHtml(convertToRaw(state.getCurrentContent()));
}

function MemoPad(props) {
  const { labelId, memoId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedMemo, changeMemo] = useState();
  const [memoTitle, changeMemoTitle] = useState("");
  const [editorState, changeState] = useState(EditorState.createEmpty());

  const memoInfo = useSelector((state) =>
    state.memos.memos.find((memo) => memo._id === memoId)
  );

  useEffect(() => {
    if (memoId !== selectedMemo && memoInfo) {
      changeMemo(memoId);
      changeMemoTitle(memoInfo.title);
      changeState(stateFromHtml(memoInfo.content));
    }
  });

  /**
   * 없을 경우 아래 메시지 출력
   */
  if (!memoId) {
    return (
      <MemoPadWrapper>
        <div style={{ padding: "1rem" }}>선택된 메모가 없습니다!</div>
      </MemoPadWrapper>
    );
  }

  return (
    <MemoPadWrapper>
      <TitleSection>
        <Input
          value={memoTitle}
          style={{ width: "60%" }}
          onChange={(e) => changeMemoTitle(e.target.value)}
        />
        <ButtonPart>
          <PrimaryButton
            styles={{ width: "5rem", height: "1.5rem" }}
            text="메모 저장"
            onClick={() =>
              dispatch(
                updateMemo(memoId, memoTitle, htmlFromState(editorState))
              )
            }
          />
          <RemoveButton
            styles={{ width: "5rem", height: "1.5rem" }}
            text="메모 삭제"
            onClick={() => {
              dispatch(deleteMemo(memoId, labelId));
              history.push(`/label/${labelId}`);
            }}
          />
        </ButtonPart>
      </TitleSection>
      <InfoSection>
        {/* <Select
          placeholder="태그를 등록해주세요"
          mode="multiple"
          style={{ width: "60%" }}
        ></Select> */}
        <DatetimePart>
          <span>
            {memoInfo &&
              `최초 작성일: ${moment(memoInfo.createdAt).format(
                DATETIME_FORMAT
              )}`}
          </span>
          <span>
            {memoInfo &&
              `최종 수정일: ${moment(memoInfo.updatedAt).format(
                DATETIME_FORMAT
              )}`}
          </span>
        </DatetimePart>
      </InfoSection>
      <EditorSection>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={changeState}
        />
      </EditorSection>
    </MemoPadWrapper>
  );
}

export default MemoPad;
