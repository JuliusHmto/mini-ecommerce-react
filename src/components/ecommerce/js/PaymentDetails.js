import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter} from "react-router";
import { Link } from "react-router-dom";
import "../css/PaymentDetails/PaymentMethod.css";
import { getUserData } from "../../../actions/userActions";

class PaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }
    
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
    this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    this.props.getUserData(this.props.user.user.id);
  }

  render() {
    const {user} = this.props.user; 

    return ( 
      <React.Fragment>
        <div class="payment-method-page">
        <div class="top-side-payment">
          <h2>Payment Method</h2>
          
          <div class="page-nav-payment">
            <h4>Cart</h4>
            <img src={require("../css/PaymentDetails/long-arrow-png.png")}/>
            <h4>Check-Out</h4>
            <img src={require("../css/PaymentDetails/long-arrow-png.png")}/>
            <h4  class="active">Payment</h4>
          </div>
        </div>
        <div class="payment-method-content">
          <div class="left-side-payment accordion" id="accordionExample">
            <div class="bank-transfer-method">
              <div class="title-payment-method" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <h3>Bank Transfer</h3>
                <img class="drop-arrow" src={require("../css/CheckOut/u0.png")}/>
              </div>
              <hr class="hr-line-payment"/>
              <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="virtual-account-transfer">
                  <span><h4><input type="radio" name="payment" value="primary"/>&nbsp;&nbsp;&nbsp;&nbsp;Virtual Account Transfer</h4><h5>(We will send a primary code for you to pay by virtual account)</h5></span>
                    <img src={require("../css/PaymentDetails/image/Bank-Logo.png")}/>
                  </div>
                  <div class="manual-transfer">
                    <span><h4><input type="radio" name="payment" value="primary"/>&nbsp;&nbsp;&nbsp;&nbsp;Transfer</h4><h5>(You can manually transfer and upload the payment receipt)</h5></span>
                    <img src={require("../css/PaymentDetails/image/Bank-Logo.png")}/>
                  </div>
                </div>
              </div>
  
              <div class="credit-card-method">

                <div class="title-payment-method collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <h3>Credit Card</h3>
                  <img src={require("../css/CheckOut/u0.png")}/>
                </div>
                <hr class="hr-line-payment"/>

                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                  <div class="credit-card-img">
                    <input type="radio" name="payment" id="credit-card-radio" value="primary"/>
                    <img src={require("../css/PaymentDetails/image/Visa Logo.png")}/>
                    <img src={require("../css/PaymentDetails/image/mastercard-logo.png")}/>
                    <img src={require("../css/PaymentDetails/image/JCB Logo.png")}/>
                    <img id="GPN" src={require("../css/PaymentDetails/image/GPN Logo.png")}/>
                  </div>
                  <div class="credit-card-input" >
                    <div class="credit-card-left">
                      <div class="card-number">
                        <img src={require("../css/PaymentDetails/image/card-number-logo.png")}/> 
                        <input placeholder="Card Number"/>
                      </div>
      
                      <div class="card-holder">
                        <img src={require("../css/PaymentDetails/image/card-holder-logo.png")}/> 
                        <input placeholder="Cardholder's Name"/>
                      </div>
      
                      <span>
                        <div class="card-date">
                          <img src={require("../css/PaymentDetails/image/card-date-logo.png")}/> 
                          <input placeholder="00" maxlength="2"/><h5>/</h5><input placeholder="00" maxlength="2"/>
                        </div>
          
                        <div class="cvv">
                          <img src={require("../css/PaymentDetails/image/cvv-logo.png")}/> 
                          <input type="password" placeholder="CVV" maxlength="3"/>
                        </div>
                      </span>
  
                      <select class="form-control installment-option" id="sel1">
                        <option>Full Payment</option>
                        <option>3 Months Installment x (Jumlah cicilan)</option>
                        <option>6 Months Installment x (Jumlah cicilan</option>
                        <option>12 Months Installment x (Jumlah cicilan)</option>
                      </select>
          
                    </div>
  
                    <div class="credit-card-right">
                      <img class ="bank-logo-cc"src={require("../css/PaymentDetails/image/Bank-Logo.png")}/>
                      <img class ="chip"src={require("../css/PaymentDetails/image/u23.png")}/>
                      <h4 id="card-number-cc">**** **** **** ****</h4>
                      <h5 id="cardholder-cc">{user.username}</h5>
                      <h5 id="date-title-cc">Valid Thru</h5>
                      <h5 id="date-cc">**/**</h5>
                      <img class="vendor-logo-cc" src={require("../css/PaymentDetails/image/mastercard-logo.png")}/>
                    </div>
                  </div>
                </div>
            </div>
  
            <div class="other-method">
            
              <div class="title-payment-method collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <h3>Other Payment</h3>
                <img src={require("../css/CheckOut/u0.png")}/>
              </div>
              <hr class="hr-line-payment"/>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                  <div class="eMoney-method">
                    <span><h4><input type="radio" name="payment" value="primary"/>&nbsp;&nbsp;&nbsp;&nbsp;Simas E-Money</h4><h5>(Pay with your simas e-money in Simobi+ app)</h5></span>
                    <img src={require("../css/PaymentDetails/image/simas-emoney.png")}/>
                  </div>
  
                  <div class="Digital-Wallet">
                    <div class="ovo">
                      <input type="radio" name="payment" value="primary"/><img src={require("../css/PaymentDetails/image/ovo.png")}/>
                    </div>
  
                    <div class="gopay">
                      <input type="radio" name="payment" value="primary"/><img src={require("../css/PaymentDetails/image/gopay.png")}/>
                    </div>
  
                    <div class="dana">
                      <input type="radio" name="payment" value="primary"/><img src={require("../css/PaymentDetails/image/dana.png")}/>
                    </div>
                  </div>
  
                  <div class="QRIS-method">
                    <h4><input type="radio" name="payment"/>&nbsp;&nbsp;&nbsp;&nbsp;QRIS (Quick Response Code Indonesian Standard)</h4>
                    <img src={require("../css/PaymentDetails/image/qris.png")}/>
                  </div>
  
                  <div class="thirdParty-method">
                    <h4><input type="radio" name="payment"/>&nbsp;&nbsp;&nbsp;&nbsp;Third Party</h4>
                    <img src={require("../css/PaymentDetails/image/alfamart.png")}/>
                  </div>
                </div>
              </div>
              
          </div>
  
          <div class="total-payment-card-payment">
            <h3>Total Payment</h3>
            <hr class="horizontal-line-payment"/>
            <div class="total-payment-payment">
              <div class="total-product-price-payment">
                <h6>Total Price</h6>
                <h6>Rp.5.000.000</h6>
              </div>
              <div class="total-shipping-price-payment">
                <h6>Total Shipping</h6>
                <h6>Rp.100.000</h6>
              </div>
            </div>
            <div class="total-price-to-pay-payment">
              <span>
                <h6>Total</h6>
                <h6 id="total-price-amount">Rp.5.100.000</h6>
              </span>   
            </div>
            <Link to={'/transaction'}>
              <button class="proceed-button-payment"><h6>Proceed Payment</h6></button>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment> 
    );
  }
}

PaymentDetails.propTypes = {
    getCart: PropTypes.func,
    selectCourier: PropTypes.func,
    user: PropTypes.object,
    address: PropTypes.object,
    errors: PropTypes.object,
  };


const mapStateToProps = (state) => ({
    cart: state.cart,
    user: state.user,
    courier: state.courier,
    address: state.address,
    errors: state.errors
})

const mapDispatchToProps = (dispatch) => {
    return {
      getUserData: (id) => {
        dispatch(getUserData(id));
      },
    };
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentDetails));