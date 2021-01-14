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
        <div className="payment-method-page">
        <div className="top-side-payment">
          <h2>Payment Method</h2>
          
          <div className="page-nav-payment">
            <h4>Cart</h4>
            <img src={require("../css/PaymentDetails/long-arrow-png.png")}/>
            <h4>Check-Out</h4>
            <img src={require("../css/PaymentDetails/long-arrow-png.png")}/>
            <h4  className="active">Payment</h4>
          </div>
        </div>
        <div className="payment-method-content">
          <div className="left-side-payment accordion" id="accordionExample">
            <div className="bank-transfer-method">
              <div className="title-payment-method" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <h3>Bank Transfer</h3>
                <img className="drop-arrow" src={require("../css/CheckOut/u0.png")}/>
              </div>
              <hr className="hr-line-payment"/>
              <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div className="virtual-account-transfer">
                  <span><h4><input type="radio" name="payment" value="primary"/>&nbsp;&nbsp;&nbsp;&nbsp;Virtual Account Transfer</h4><h5>(We will send a primary code for you to pay by virtual account)</h5></span>
                    <img src={require("../css/PaymentDetails/image/logoXYZ.png")}/>
                    {/*<img src={require("../css/PaymentDetails/image/Bank-Logo.png")}/>*/}
                  </div>
                  <div className="manual-transfer">
                    <span><h4><input type="radio" name="payment" value="primary"/>&nbsp;&nbsp;&nbsp;&nbsp;Transfer</h4><h5>(You can manually transfer and upload the payment receipt)</h5></span>
                    <img src={require("../css/PaymentDetails/image/logoXYZ.png")}/>
                    {/*<img src={require("../css/PaymentDetails/image/Bank-Logo.png")}/>*/}
                  </div>
                </div>
              </div>
  
              <div className="credit-card-method">

                <div className="title-payment-method collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <h3>Credit Card</h3>
                  <img src={require("../css/CheckOut/u0.png")}/>
                </div>
                <hr className="hr-line-payment"/>

                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                  <div className="credit-card-img">
                    <input type="radio" name="payment" id="credit-card-radio" value="primary"/>
                    <img src={require("../css/PaymentDetails/image/Visa Logo.png")}/>
                    <img src={require("../css/PaymentDetails/image/mastercard-logo.png")}/>
                    <img src={require("../css/PaymentDetails/image/JCB Logo.png")}/>
                    <img id="GPN" src={require("../css/PaymentDetails/image/GPN Logo.png")}/>
                  </div>
                  <div className="credit-card-input" >
                    <div className="credit-card-left">
                      <div className="card-number">
                        <img src={require("../css/PaymentDetails/image/card-number-logo.png")}/> 
                        <input placeholder="Card Number"/>
                      </div>
      
                      <div className="card-holder">
                        <img src={require("../css/PaymentDetails/image/card-holder-logo.png")}/> 
                        <input placeholder="Cardholder's Name"/>
                      </div>
      
                      <span>
                        <div className="card-date">
                          <img src={require("../css/PaymentDetails/image/card-date-logo.png")}/> 
                          <input placeholder="00" maxlength="2"/><h5>/</h5><input placeholder="00" maxlength="2"/>
                        </div>
          
                        <div className="cvv">
                          <img src={require("../css/PaymentDetails/image/cvv-logo.png")}/> 
                          <input type="password" placeholder="CVV" maxlength="3"/>
                        </div>
                      </span>
  
                      <select className="form-control installment-option" id="sel1">
                        <option>Full Payment</option>
                        <option>3 Months Installment x (Jumlah cicilan)</option>
                        <option>6 Months Installment x (Jumlah cicilan</option>
                        <option>12 Months Installment x (Jumlah cicilan)</option>
                      </select>
          
                    </div>
  
                    <div className="credit-card-right">
                      {/*<img src={require("../css/PaymentDetails/image/Bank-Logo.png")}/>*/}
                      <img className ="bank-logo-cc"src={require("../css/PaymentDetails/image/logoXYZ.png")}/>
                      <img className ="chip"src={require("../css/PaymentDetails/image/u23.png")}/>
                      <h4 id="card-number-cc">**** **** **** ****</h4>
                      <h5 id="cardholder-cc">{user.username}</h5>
                      <h5 id="date-title-cc">Valid Thru</h5>
                      <h5 id="date-cc">**/**</h5>
                      <img className="vendor-logo-cc" src={require("../css/PaymentDetails/image/mastercard-logo.png")}/>
                    </div>
                  </div>
                </div>
            </div>
  
            <div className="other-method">
            
            <div className="title-payment-method" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                <h3>Other Payment</h3>
                <img src={require("../css/CheckOut/u0.png")}/>
              </div>
              <hr className="hr-line-payment"/>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                  <div className="eMoney-method">
                    <span><h4><input type="radio" name="payment" value="primary"/>&nbsp;&nbsp;&nbsp;&nbsp;XYZ Money</h4><h5>(Pay with your XYZ Money in XYZ app)</h5></span>
                    <img src={require("../css/PaymentDetails/image/logoXYZ.png")}/>
                    {/*<span><h4><input type="radio" name="payment" value="primary"/>&nbsp;&nbsp;&nbsp;&nbsp;Simas E-Money</h4><h5>(Pay with your simas e-money in Simobi+ app)</h5></span>
                        <img src={require("../css/PaymentDetails/image/simas-emoney.png")}/>*/}
                  </div>
  
                  <div className="Digital-Wallet">
                    <div className="ovo">
                      <input type="radio" name="payment" value="primary"/><img src={require("../css/PaymentDetails/image/ovo.png")}/>
                    </div>
  
                    <div className="gopay">
                      <input type="radio" name="payment" value="primary"/><img src={require("../css/PaymentDetails/image/gopay.png")}/>
                    </div>
  
                    <div className="dana">
                      <input type="radio" name="payment" value="primary"/><img src={require("../css/PaymentDetails/image/dana.png")}/>
                    </div>
                  </div>
  
                  <div className="QRIS-method">
                    <h4><input type="radio" name="payment"/>&nbsp;&nbsp;&nbsp;&nbsp;QRIS (Quick Response Code Indonesian Standard)</h4>
                    <img src={require("../css/PaymentDetails/image/qris.png")}/>
                  </div>
  
                  <div className="thirdParty-method">
                    <h4><input type="radio" name="payment"/>&nbsp;&nbsp;&nbsp;&nbsp;Third Party</h4>
                    <img src={require("../css/PaymentDetails/image/alfamart.png")}/>
                  </div>
                </div>
              </div>
              
          </div>
  
          <div className="total-payment-card-payment">
            <h3>Total Payment</h3>
            <hr className="horizontal-line-payment"/>
            <div className="total-payment-payment">
              <div className="total-product-price-payment">
                <h6>Total Price</h6>
                <h6>Rp.1.000.000 ,-</h6>
              </div>
              <div className="total-shipping-price-payment">
                <h6>Total Shipping</h6>
                <h6>Rp.10.000 ,-</h6>
              </div>
            </div>
            <div className="total-price-to-pay-payment">
              <span>
                <h6>Total</h6>
                <h6 id="total-price-amount">Rp.1.000.000 ,-</h6>
              </span>   
            </div>
            <Link to={'/transaction'}>
              <button className="proceed-button-payment"><h6>Proceed Payment</h6></button>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment> 
    );
  }
}

PaymentDetails.propTypes = {
    user: PropTypes.object,
    errors: PropTypes.object,
  };


const mapStateToProps = (state) => ({
    user: state.user,
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