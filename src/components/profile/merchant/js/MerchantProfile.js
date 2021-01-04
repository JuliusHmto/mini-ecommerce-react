import React, { Component } from 'react';
import PropTypes from "prop-types";
import MerchantDashboard from './MerchantDashboard';
import { getMerchant } from "../../../../actions/merchantActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class MerchantProfile extends Component {
  componentDidMount() {
    this.props.getMerchant(this.props.user.user.id);
  }

  render() { 
    const {merchant} = this.props.merchant;
    const {user} = this.props.user;

    return (
      <React.Fragment>
      <div class="merchant-profile-page">
        <MerchantDashboard/>
        <div class="merchant-profile-content">
            {/*<!-- bagian top atau untuk pilih opsi shop profile dll -->*/}
            <div class="top-side-merchant-profile1">
                <h3>More About Your Shop</h3>
            </div>

            {/*<!-- bagin dimana user / seller bisa input data toko -->*/}
            <div class="merch-profile-content">
                <h4>Shop Profile</h4>
                <hr id="horizontal-line-transaction-active"/>

                <div class="merchant-input">
                    {/*<!-- untuk edit bagian profile image -->*/}
                    <div class="merchant-profile-insight" >
                        <img class="header-merch-profile-image" src={require("../css/MerchantProfile/header-def-img.png")}/>
                        <h7>Change Header</h7>

                        <div class="merch-profile-image">
                            <img src={require("../css/MerchantProfile/header-def-img.png")}/>
                            <a></a>
                        </div>


                        <div class ="merch-profile-insight-data">
                            <h5 class="merchant-shop-name">{merchant.merchantName}</h5>
                            <p class="join-date">Join in 20 Oct 2020</p>
                            
                            <div class="insight">
                                <div class="total-product">
                                    <p>Total Product</p>
                                    <h5>150 Products</h5>
                                </div>

                                <div class="total-follower">
                                    <p>Total Followers</p>
                                    <h5>157 Followers</h5>
                                </div>

                                <div class="response-time">
                                    <p>Response Time</p>
                                    <h5>Under an hour</h5>
                                </div>

                                <div class="rating">
                                    <p>Rating</p>
                                    <span>
                                        <h5>5 / 5</h5>
                                        <img src={require("../css/MerchantProfile/star-icon.png")}/>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div class="merchant-profile-data">
                        <div class="data merchant-profile-name">
                            <p>Shop Name</p>
                            <p>{merchant.merchantName}</p>
                            <p id="change-button">Change</p>
                        </div>

                        <div class="data domain">
                            <p>Domain</p>
                            <p>www.bank-sinarmasmarket.com /</p>
                            <input id="domain-input" placeholder={merchant.merchantName}/>
                        </div>

                        <div class="data">
                            <p>Address</p>
                            <p>{merchant.merchantAddress}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      </div>
      </React.Fragment>
            
    );
  }
}
 
MerchantProfile.propTypes = {
  user: PropTypes.object.isRequired,
  merchant: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  merchant: state.merchant,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMerchant: (userID) => {
      dispatch(getMerchant(userID));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MerchantProfile)
);