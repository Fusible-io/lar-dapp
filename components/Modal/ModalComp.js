import React from "react";
import { Modal } from "antd";

const ModalComp = ({ isModalOpen, setIsModalOpen, content }) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        closable={false}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
        width={601}
      >
        {content}
      </Modal>
    </>
  );
};
export default ModalComp;
