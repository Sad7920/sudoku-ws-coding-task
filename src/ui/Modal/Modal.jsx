import React, { useEffect, useState } from 'react';
import './Modal.css';

/**
 * Modal component displays a modal overlay with content and an optional confetti effect.
 * The modal can be closed when the backdrop is clicked or programmatically via the `onClose` callback.
 * 
 * @param {string} title - The title of the modal.
 * @param {function} onClose - Callback function to handle closing the modal.
 * @param {ReactNode} children - The content to be displayed inside the modal.
 * @param {ReactNode} confetti - Optional confetti effect or animation to be displayed inside the modal.
 * 
 * @returns {JSX.Element} A modal component with an overlay and content area.
 */
const Modal = ({ title, onClose, children, confetti }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger show class in next tick for smooth transition
        const timeout = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timeout); // Clean up timeout on component unmount
    }, []);

    /**
     * Handles click events on the backdrop (outside the modal content).
     * Stops the event propagation and triggers the onClose function.
     * 
     * @param {object} e - The click event object.
     */
    const handleBackdropClick = (e) => {
        e.stopPropagation(); // Prevents the event from bubbling up
        onClose(); // Call the onClose callback to close the modal
    };

    return (
        <div className={`modal-backdrop ${visible ? 'show' : ''}`} onClick={handleBackdropClick}>
            {confetti}  {/* Optional confetti or animation */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{title}</h2>  {/* Modal title */}
                {children}        {/* Modal content */}
            </div>
        </div>
    );
};

export default Modal;
