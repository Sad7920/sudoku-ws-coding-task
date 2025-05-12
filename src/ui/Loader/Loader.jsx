import React from "react";
import "./Loader.css";
import logo from '../../assets/logo.png';

/**
 * Loader component that displays an overlay with a logo while content is loading.
 * This can be used to indicate that the app is in the process of fetching or rendering data.
 * 
 * @returns {JSX.Element} A loading overlay with the logo.
 */
const Loader = () => {
    return (
        <div className="loader-overlay">   {/* Overlay container for loader */}
            <img
                src={logo}                 // Logo image displayed during loading
                alt="logo"                 // Alt text for accessibility
                className="logo"           // CSS class for styling the logo
            />
        </div>
    );
};

export default Loader;
