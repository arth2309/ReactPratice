import React, { useState, useEffect } from 'react';
import "./Modal.css";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [modalStyle, setModalStyle] = useState({});

  
  const updateModalStyle = () => {
    const width = window.innerWidth > 600 ? '60%' : '90%';
    const height = window.innerHeight > 600 ? '70%' : '90%';
    const top = `50%`;
    const left = `50%`;
    const transform = `translate(-50%, -50%)`;

    setModalStyle({
      width,
      height,
      top,
      left,
      transform,
    });
  };


  useEffect(() => {
    window.addEventListener('resize', updateModalStyle);
    return () => window.removeEventListener('resize', updateModalStyle);
  }, []);

  useEffect(() => {
    if (isOpen) {
      updateModalStyle();
    }
  }, [isOpen]);


  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal" style={modalStyle}>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;