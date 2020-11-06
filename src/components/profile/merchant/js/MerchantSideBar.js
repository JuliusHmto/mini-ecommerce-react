import React, {Component} from 'react';

class Sidebar extends Component {
  render() { 
    return ( 
      <div className="navsideMerch">
        <div className="store-info">
          <img
            src={require("../../../layout/images/dummy/profileimage.png")}
            alt=""
          />
          <div className="store-name">
            <h4>Store's Name</h4>
            <h5>Trusted Seller</h5>
          </div>
        </div>
        <div className="optionList">
          <div className="Dashboard-option">
            <img
              src={require("../../../layout/images/merchant/DashboardIcon.png")}
              alt=""
            />
            <h5>Dashboard</h5>
          </div>
          <div className="MyShop-option">
            <img
              src={require("../../../layout/images/merchant/HomeIcon.png")}
              alt=""
            />
            <h5>My Shop</h5>
          </div>
          <div className="Listing-option">
            <img
              src={require("../../../layout/images/merchant/ListingIcon.png")}
              alt=""
            />
            <h5>Listing</h5>
          </div>
          <div className="Order-option">
            <img
              src={require("../../../layout/images/merchant/OrdersIcon.png")}
              alt=""
            />
            <h5>Orders</h5>
          </div>
          <div className="CS-option">
            <img
              src={require("../../../layout/images/merchant/CustomerSatisficationIcon.png")}
              alt=""
            />
            <h5>Customer Satisfication</h5>
          </div>
          <div className="Financial-option">
            <img
              src={require("../../../layout/images/merchant/FinancialsIcon.png")}
              alt=""
            />
            <h5>Financial</h5>
          </div>
          <div className="StoreSettings-option">
            <img
              src={require("../../../layout/images/merchant/SettingIcon.png")}
              alt=""
            />
            <h5>Store Setting</h5>
          </div>
        </div>
      </div> 
    );
  }
}
 
export default Sidebar;
