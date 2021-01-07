import React from "react";
import '../css/VoucherPopup.css'

const VoucherPopup = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="Overlay1">
        <div className="Modal1">
          <div className="header1">
            <button className="xButton1">
              <img src={require("../../layout/images/main/x-mark.png")} className="closeIcon" onClick={handleClose}/>
            </button>
          </div>
          <div className="modalBody1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherPopup;