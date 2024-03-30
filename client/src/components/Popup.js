import React from 'react';
import './Popup.css';

// Expects boolean isOpen, and a setOpen function (children are html elements within the Popup)
// Example on AdminRemove.js page (uses a state to keep track of whether popup is open or not)
function Popup({ isOpen, setOpen, children }) {
    return (isOpen) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => setOpen(false)}>X</button>
                { children }
            </div>
        </div>
    ) : "";
}

export default Popup;