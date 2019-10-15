import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  MemoListWrapper,
  MemoSection,
  LabelSection,
  ButtonPart
} from "./MemoListStyles";
import MemoCard from "components/MemoCard/MemoCard";
import PrimaryButton from "components/Buttons/PrimaryButton";
import {
  fetchMemosByLabel,
  fetchAllMemos,
  createMemo,
  deleteMemo
} from "actions/memoActions";
import RemoveButton from "components/Buttons/RemoveButton";
import { deleteLabel, updateLabel } from "actions/labelActions";
import AddLabelModal from "components/Modal/AddLabelModal";

function MemoList(props) {
  const { labelId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, changeLabel] = useState();
  const memos = useSelector((state) => state.memos.memos);
  const labelInfo = useSelector((state) =>
    state.labels.labels.find((lbl) => lbl._id === labelId)
  );

  /**
   * LabelId가 변경될 때 Memo를 다시 가져온다.
   */
  useEffect(() => {
    if (labelId !== selectedLabel) {
      changeLabel(labelId);
      if (labelId === "all") {
        dispatch(fetchAllMemos());
      } else {
        dispatch(fetchMemosByLabel(labelId));
      }
    }
  });

  return (
    <MemoListWrapper>
      <LabelSection>
        {(labelInfo && labelInfo.title) || "전체"}
        {labelId !== "all" && (
          <ButtonPart>
            <PrimaryButton
              styles={{ width: "6rem", height: "1.5rem", fontSize: "0.9rem" }}
              text="레이블 수정"
              onClick={() => setModalVisible(true)}
            />
            <RemoveButton
              styles={{ width: "6rem", height: "1.5rem", fontSize: "0.9rem" }}
              text="레이블 삭제"
              onClick={() => {
                dispatch(deleteLabel(labelId));
                history.push(`/label/all`);
              }}
            />
          </ButtonPart>
        )}
      </LabelSection>
      <MemoSection>
        {memos.map((memo) => {
          return <MemoCard key={memo._id} labelId={labelId} memo={memo} />;
        })}
        {memos.length === 0 && "등록된 메모가 없습니다"}
      </MemoSection>

      {/* 만약 선택된 항목이 있다면 Remove Memo를, 없다면 Add Memo를 */}
      {/* LabelId가 있고, all이 아니라면 List에도 추가해줘야 한다. */}
      <PrimaryButton
        onClick={() => dispatch(createMemo("noname", "", labelId))}
        styles={{ height: "2rem" }}
        text="메모 추가"
      />

      <AddLabelModal
        title="레이블명 변경"
        plhdr="변경할 레이블명을 선택해주세요"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        defaultValue={labelInfo && labelInfo.title}
        handleOk={(title) => {
          dispatch(updateLabel(labelId, title));
          setModalVisible(false);
        }}
      />
    </MemoListWrapper>
  );
}

export default MemoList;
