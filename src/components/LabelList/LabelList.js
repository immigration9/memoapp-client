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

function LabelList(props) {
  const labels = useSelector((state) => state.labels.labels);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchAllLabels());
  }, []);

  return (
    <LabelListWrapper>
      <ListsSection>
        <LabelWrapper to={`/label/all`}>전체</LabelWrapper>
        {labels.map((lbl) => {
          return (
            <LabelWrapper key={lbl._id} to={`/label/${lbl._id}`}>
              {lbl.title} ({lbl.memos.length})
            </LabelWrapper>
          );
        })}
      </ListsSection>

      <PrimaryButton
        onClick={() => setModalVisible(true)}
        styles={{ height: "2rem" }}
        text="레이블 추가"
      />

      <AddLabelModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleOk={(title) => {
          dispatch(createLabel(title));
          setModalVisible(false);
        }}
      />
    </LabelListWrapper>
  );
}

export default LabelList;
