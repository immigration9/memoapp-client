import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Input } from "antd";
import moment from "moment";

import { fetchLabelsByMemoApi } from "restApi";
import RemoveButton from "components/Buttons/RemoveButton";
import PrimaryButton from "components/Buttons/PrimaryButton";
import AddOtherLabelModal from "components/Modal/AddOtherLabelModal";
import { deleteMemo, updateMemo } from "actions/memoActions";
import {
  deregisterMemoFromLabel,
  registerMemoToLabel
} from "actions/labelActions";
import {
  MemoPadWrapper,
  TitleSection,
  InfoSection,
  DatetimePart,
  LabelsPart,
  Label,
  EditorSection,
  ButtonPart,
  DatetimeInfo
} from "./MemoPadStyles";

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

function MemoPad() {
  const { labelId, memoId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedMemo, changeMemo] = useState();
  const [memoTitle, changeMemoTitle] = useState("");
  const [editorState, changeState] = useState(EditorState.createEmpty());

  const [labelList, setLabelList] = useState([]);
  const [addLabelModalVisible, setAddLabelModalVisible] = useState(false);

  const labels = useSelector(({ labels }) => labels.labels);
  const memoInfo = useSelector(({ memos }) =>
    memos.memos.find((memo) => memo.id === memoId)
  );

  useEffect(() => {
    /**
     * Memopad 내부에서 업데이트시 반영되지 않는 문제가 있음
     */
    async function getLabelsByMemo() {
      if (memoId) {
        const {
          data: { data }
        } = await fetchLabelsByMemoApi(memoId);
        setLabelList(data);
      }
    }

    getLabelsByMemo();
  }, [memoId, labels]);

  useEffect(() => {
    if (memoId !== selectedMemo && memoInfo) {
      changeMemo(memoId);
      changeMemoTitle(memoInfo.title);
      changeState(stateFromHtml(memoInfo.content));
    }
  }, [memoId, memoInfo, selectedMemo]);

  const removeMemoFromLabel = (selectedLabelId) => {
    dispatch(deregisterMemoFromLabel(selectedLabelId, memoId));
    history.push(`/label/${labelId}`);
  };

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
        <DatetimePart>
          <DatetimeInfo>
            {memoInfo &&
              `최초 작성일: ${moment(memoInfo.createdAt).format(
                DATETIME_FORMAT
              )}`}
          </DatetimeInfo>
          <DatetimeInfo>
            {memoInfo &&
              `최종 수정일: ${moment(memoInfo.updatedAt).format(
                DATETIME_FORMAT
              )}`}
          </DatetimeInfo>
        </DatetimePart>
        <LabelsPart>
          {labelList.map((label) => (
            <Label key={label.id} onClick={() => removeMemoFromLabel(label.id)}>
              {label.title}
            </Label>
          ))}
          <Label onClick={() => setAddLabelModalVisible(true)}>+</Label>
        </LabelsPart>
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
      {addLabelModalVisible && (
        <AddOtherLabelModal
          title="레이블 추가"
          modalVisible={addLabelModalVisible}
          labelList={labels.filter(
            (label) => !labelList.find((lbl) => lbl.id === label.id)
          )}
          setModalVisible={setAddLabelModalVisible}
          handleOk={(selectedLabel) => {
            dispatch(registerMemoToLabel(selectedLabel, memoId));
            setAddLabelModalVisible(false);
          }}
        />
      )}
    </MemoPadWrapper>
  );
}

export default MemoPad;
