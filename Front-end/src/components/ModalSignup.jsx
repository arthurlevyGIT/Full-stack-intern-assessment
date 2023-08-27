import React, { useState } from "react";

export default function ModalSignup({ setModalSignup }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalSignup(false);
  };

  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2>Inscription réussie !</h2>
          <p>Veuillez-vous connecter </p>
        </div>
      </div>
    </div>
  );
}
