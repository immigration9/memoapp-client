import React, { useEffect, useState, useMemo, useCallback } from "react";
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
import {
  deregisterMemoFromLabel,
  registerMemoToLabel
} from "actions/labelActions";
import RemoveButton from "components/Buttons/RemoveButton";
import { deleteLabel, updateLabel } from "actions/labelActions";
import AddLabelModal from "components/Modal/AddLabelModal";
import AddOtherLabelModal from "components/Modal/AddOtherLabelModal";

function MemoList() {
  const { labelId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const labels = useSelector(({ labels }) => labels.labels);
  const memos = useSelector(({ memos }) => memos.memos);
  const labelInfo = useSelector(({ labels }) =>
    labels.labels.find((lbl) => lbl.id === labelId)
  );
  const [selectedMemos, setSelectedMemos] = useState([]);

  const [nameChangeModalVisible, setNameChangeModalVisible] = useState(false);
  const [addLabelModalVisible, setAddLabelModalVisible] = useState(false);

  /**
   * LabelId가 변경될 때 Memo를 다시 가져온다.
   */
  useEffect(() => {
    if (labelId === "all") {
      dispatch(fetchAllMemos());
    } else {
      dispatch(fetchMemosByLabel(labelId));
    }
    setSelectedMemos([]);
  }, [dispatch, labelId]);

  const setMemoList = useCallback(
    (e, id) => {
      const isChecked = e.target.checked;
      if (isChecked) {
        setSelectedMemos([...selectedMemos, id]);
      } else {
        setSelectedMemos(selectedMemos.filter((memo) => memo !== id));
      }
    },
    [setSelectedMemos, selectedMemos]
  );

  const removeSelectedMemos = () => {
    const confirmDelete = window.confirm("선택된 메모들을 삭제하시겠습니까?");
    if (confirmDelete) {
      selectedMemos.forEach((memoId) => {
        dispatch(deleteMemo(memoId, labelId));
      });
    }
    setSelectedMemos([]);
  };
  const removeSelectedMemosFromLabel = () => {
    const confirmDelete = window.confirm(
      "선택된 메모들을 레이블에서 제거하시겠습니까?"
    );
    if (confirmDelete) {
      selectedMemos.forEach((memoId) => {
        dispatch(deregisterMemoFromLabel(labelId, memoId));
      });
    }
    setSelectedMemos([]);
  };

  const memoList = useMemo(
    () =>
      memos.map((memo) => {
        const isChecked = selectedMemos.find((label) => label === memo.id);
        return (
          <MemoCard
            isChecked={isChecked ? true : false}
            changeStatus={(e) => setMemoList(e, memo.id)}
            key={memo.id}
            labelId={labelId}
            memo={memo}
          />
        );
      }),
    [memos, labelId, selectedMemos, setMemoList]
  );

  return (
    <MemoListWrapper>
      <LabelSection>
        {(labelInfo && labelInfo.title) || "전체"}
        {labelId !== "all" && (
          <ButtonPart>
            <PrimaryButton
              styles={{ width: "6rem" }}
              text="레이블 수정"
              onClick={() => setNameChangeModalVisible(true)}
            />
            <RemoveButton
              styles={{ width: "6rem" }}
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
        {memoList}
        {memos.length === 0 && "등록된 메모가 없습니다"}
      </MemoSection>

      {/* 만약 선택된 항목이 있다면 Remove Memo를, 없다면 Add Memo를 */}
      {/* LabelId가 있고, all이 아니라면 List에도 추가해줘야 한다. */}

      {selectedMemos.length === 0 ? (
        <PrimaryButton
          onClick={() => dispatch(createMemo("noname", "", labelId))}
          size="big"
          text="메모 추가"
        />
      ) : (
        <>
          <PrimaryButton
            onClick={() => setAddLabelModalVisible(true)}
            size="big"
            styles={{ marginBottom: "1rem" }}
            text="다른 레이블에 추가"
          />
          {labelId !== "all" && (
            <RemoveButton
              onClick={removeSelectedMemosFromLabel}
              size="big"
              styles={{ marginBottom: "1rem" }}
              text="선택된 메모 해제"
            />
          )}
          <RemoveButton
            onClick={removeSelectedMemos}
            size="big"
            text="선택된 메모 삭제"
          />
        </>
      )}

      {nameChangeModalVisible && (
        <AddLabelModal
          title="레이블명 변경"
          plhdr="변경할 레이블명을 선택해주세요"
          modalVisible={nameChangeModalVisible}
          setModalVisible={setNameChangeModalVisible}
          defaultValue={labelInfo && labelInfo.title}
          handleOk={(title) => {
            dispatch(updateLabel(labelId, title));
            setNameChangeModalVisible(false);
          }}
        />
      )}
      {addLabelModalVisible && (
        <AddOtherLabelModal
          title="레이블 추가"
          modalVisible={addLabelModalVisible}
          labelList={labels}
          setModalVisible={setAddLabelModalVisible}
          handleOk={(selectedLabel) => {
            dispatch(registerMemoToLabel(selectedLabel, selectedMemos));
            setAddLabelModalVisible(false);
          }}
        />
      )}
    </MemoListWrapper>
  );
}

export default MemoList;
