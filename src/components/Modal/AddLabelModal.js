import React, { useState } from "react";
import { Modal, Input, message } from "antd";
import { isEmptyString } from "utils/stringUtils";

function verifyModalConfirm(handler, title) {
  if (isEmptyString(title)) {
    message.info("레이블명을 입력해주시기 바랍니다");
    return;
  }

  handler(title);
}

function AddLabelModal({
  modalVisible,
  handleOk,
  setModalVisible,
  title = "레이블 추가",
  plhdr = "추가할 레이블 명을 선택해주세요"
}) {
  const [labelName, setLabelName] = useState("");
  return (
    <Modal
      title={title}
      destroyOnClose={true}
      visible={modalVisible}
      onOk={() => verifyModalConfirm(handleOk, labelName)}
      onCancel={() => setModalVisible(false)}>
      <Input
        placeholder={plhdr}
        value={labelName}
        onChange={(e) => setLabelName(e.target.value)}
      />
    </Modal>
  );
}

export default AddLabelModal;
