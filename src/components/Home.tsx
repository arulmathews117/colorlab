import React, { useState } from "react";
import { FcOpenedFolder } from "react-icons/fc";
import { FiFilePlus } from "react-icons/fi";
import { Modal, Input } from "antd";

export default function Home() {
    const [folderName, setFolderName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="icon-container">
        <div className="upload-btn-wrapper">
          <FiFilePlus size={50} className="icon" color="#ffc107" />
          <input type="file" name="myfile" />
        </div>
        
        <FcOpenedFolder size={50} className="icon" onClick={showModal} />
      </div>

      <Modal
        title="Folder Upload"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <Input placeholder="File Name..." onChange={(event) => setFolderName(event.target.value)} />
      </Modal>
    </div>
  );
}
