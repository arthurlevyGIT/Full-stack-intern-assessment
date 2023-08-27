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
          <h2>Connexion réussie !</h2>
          <span className="close" onClick={closeModal}>
            Poursuivre sur le site
          </span>
        </div>
      </div>
    </div>
  );
}
