import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FcOpenedFolder } from "react-icons/fc";
import { FiFilePlus, FiLogOut } from "react-icons/fi";
import { Modal, Input } from "antd";

export default function Home() {
  const [folderName, setFolderName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  let navigate = useNavigate();
  const logout = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (response) {
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div>
      <div className="icon-container">
        <div className="upload-btn-wrapper">
          <FiFilePlus size={50} className="icon" color="#ffc107" />
          <input type="file" name="myfile" />
        </div>

        <FcOpenedFolder size={50} className="icon" onClick={showModal} />

        <FiLogOut size={50} className="icon" color="#ffc107" onClick={logout} />
      </div>

      <Modal
        title="Folder Upload"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <Input
          placeholder="File Name..."
          onChange={(event) => setFolderName(event.target.value)}
        />
      </Modal>
    </div>
  );
}
