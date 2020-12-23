import React from "react";
import "../css/addUserAddress.css";
import 'reactjs-popup/dist/index.css';

const AddressPopup = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="Overlay">
        <div className="Modal">
          {children}
          <button className="modal-close" onClick={handleClose}>
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressPopup;