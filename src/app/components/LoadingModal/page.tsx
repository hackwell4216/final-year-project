import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "black",
  },
};

function LoadingModal({ isOpen, loadedData, closeModal }: any) {
  return (
    <Modal isOpen={isOpen} style={customStyles} contentLabel="Example Modal">
      {loadedData}
    </Modal>
  );
}

export default LoadingModal;
