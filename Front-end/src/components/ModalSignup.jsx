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
          <h2>Inscription réussie !</h2>
          <p>Veuillez-vous connecter </p>
          <span className="close" onClick={closeModal}>
            Ok je me connecte
          </span>
        </div>
      </div>
    </div>
  );
}
