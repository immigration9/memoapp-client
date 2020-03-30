import React, { useState } from "react";
import { Modal, Select } from "antd";

const { Option } = Select;

function AddOtherLabelModal({
  modalVisible,
  handleOk,
  labelList,
  setModalVisible,
  title
}) {
  const [selectedLabel, setSelectedLabel] = useState();

  return (
    <Modal
      title={title}
      destroyOnClose={true}
      visible={modalVisible}
      onOk={() => handleOk(selectedLabel)}
      onCancel={() => setModalVisible(false)}>
      <Select
        style={{ width: "100%" }}
        onChange={(value) => setSelectedLabel(value)}>
        {labelList.map((label) => (
          <Option value={label.id}>{label.title}</Option>
        ))}
      </Select>
    </Modal>
  );
}

export default AddOtherLabelModal;
