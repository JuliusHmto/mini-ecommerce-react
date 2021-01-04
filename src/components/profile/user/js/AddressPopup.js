import React from "react";
import '../css/addressPopup.css'

const AddressPopup = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="Overlay">
        <div className="Modal">
        <div className="header">
          <button className="xButton">
            <img src={require("../../../layout/images/main/x-mark.png")} className="closeIcon" onClick={handleClose}/>
          </button>
        </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AddressPopup;