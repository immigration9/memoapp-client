import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  LabelListWrapper,
  LabelWrapper,
  ListsSection
} from "./LabelListStyles";
import PrimaryButton from "components/Buttons/PrimaryButton";
import { fetchAllLabels, createLabel } from "actions/labelActions";
import AddLabelModal from "components/Modal/AddLabelModal";

function LabelList() {
  const labels = useSelector((state) => state.labels.labels);
  const dispatch = useDispatch();

  const [totalMemoCount, setTotalMemoCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchAllLabels());
  }, [dispatch]);

  useEffect(() => {
    setTotalMemoCount(labels.reduce((acc, curr) => acc + curr.memoCount, 0));
  }, [labels]);

  return (
    <LabelListWrapper>
      <ListsSection>
        <LabelWrapper to={`/label/all`}>전체 ({totalMemoCount})</LabelWrapper>
        {labels.map((lbl) => {
          return (
            <LabelWrapper key={lbl.id} to={`/label/${lbl.id}`}>
              {lbl.title} ({lbl.memoCount})
            </LabelWrapper>
          );
        })}
      </ListsSection>

      <PrimaryButton
        onClick={() => setModalVisible(true)}
        size="big"
        text="레이블 추가"
      />

      {modalVisible && (
        <AddLabelModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleOk={(title) => {
            dispatch(createLabel(title));
            setModalVisible(false);
          }}
        />
      )}
    </LabelListWrapper>
  );
}

export default LabelList;
