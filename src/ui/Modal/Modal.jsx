import React, { useEffect, useState } from 'react';
import './Modal.css';

const Modal = ({ title, onClose, children, confetti }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger show class in next tick
        const timeout = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    const handleBackdropClick = (e) => {
        e.stopPropagation();
        onClose();
    };

    return (
        <div className={`modal-backdrop ${visible ? 'show' : ''}`} onClick={handleBackdropClick}>
            {confetti}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;
