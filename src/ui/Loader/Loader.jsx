import React from "react";
import "./Loader.css";
import logo from '../../assets/logo.png'

const Loader = () => {
    return (
        <div className="loader-overlay">
            <img src={logo} alt="logo" className="logo" />
        </div>
    );
};

export default Loader;
