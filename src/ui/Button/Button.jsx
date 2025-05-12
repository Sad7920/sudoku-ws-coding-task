import React from 'react';
import './Button.css';

/**
 * Button component renders a button element with customizable text, click behavior, and disabled state.
 *
 * @param {string} text - The text to display inside the button.
 * @param {function} onClick - The function to call when the button is clicked.
 * @param {boolean} disabled - Flag to disable the button (defaults to false).
 * 
 * @returns {JSX.Element} A button element with custom text, click handler, and disabled state.
 */
const Button = ({ text, onClick, disabled }) => {
    return (
        <button
            onClick={onClick}      // Button click handler
            disabled={disabled}   // Button disabled state
            className='button'    // Button CSS class for styling
        >
            {text}  {/* Button text */}
        </button>
    );
};

export default Button;
