import React, { useState } from "react";

export default function ModalLogin({ setModalLogin }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalLogin(false);
  };

  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2>Connexion réussie !</h2>
        </div>
      </div>
    </div>
  );
}
