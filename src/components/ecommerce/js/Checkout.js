import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getCouriers, selectCourier } from "../../../actions/courierActions";
import { getCart, processOrder, getTotalPrice, getTotalItem } from "../../../actions/cartActions";
import { loadAllAddress } from "../../../actions/userActions";
import "../css/CheckOut/CheckOut.css";
import CheckoutItem from './CheckoutItem';
import AlertPopup from './AlertPopup';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      address: "",
      errors: {},
    };
    this.placeOrder = this.placeOrder.bind(this);
    this.chooseCourier = this.chooseCourier.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
  }
    
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
    this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    this.props.getCouriers();
    this.props.getCart(this.props.user.user.id);
    this.props.getTotalPrice(this.props.user.user.id);
    this.props.getTotalItem(this.props.user.user.id);
    this.props.getAddress();
  }

  modalOpen() {
    this.setState({ modal: true });
  }

  modalClose() {
    this.setState({
      modal: false
    });
  }

  onAddressChange(event) {
    this.setState({
      address: event.target.value
    });
  }

  chooseCourier(courierName, merchantName){
    const courierChoice = {
      courierName: courierName,
      merchantName: merchantName,
    }
    const history = this.props.history;
    this.props.selectCourier(courierChoice, history);
  }

  placeOrder() {
    const userID = this.props.user.user.id;
    const extraDetail = {
      userAddress: this.state.address,
    }
    const history = this.props.history;
    this.props.processOrder(userID, extraDetail, history);
    this.modalClose();
  }

  render() { 
    const { cartItems } = this.props.cart;
    const { courierList } = this.props.courier;
    const {user} = this.props.user;
    const {addresses} = this.props.address;
    const totalPrice = this.props.total.totalPrice;
    const totalItem = this.props.total.totalItem;

    return ( 
      <React.Fragment>
        <div className="Check-Out-Page">
          <div className="top-side-checkout">
            <h2>Checkout Page</h2>    
            <div className="page-nav">
              <h4>Cart</h4>
              <img src={require("../css/CheckOut/long-arrow-png.png")} alt=""/>
              <h4 className="active">Check-Out</h4>
              <img src={require("../css/CheckOut/long-arrow-png.png")} alt=""/>
              <h4>Payment</h4>
            </div>
          </div>
          <div className="check-out-content">
            <div className="left-side-check-out">
              <div className="buyer-detail">
              <div className="address-label">
                <h3>Where to Send</h3>
                <hr className="horizontal-line-checkout"/>
              </div>
                {addresses.map((address) => {
                  return (
                    <div className="primary-address">
                      <input type="radio" id="address"
                        value={address.addressLabel}
                        onChange={this.onAddressChange}
                        checked={this.state.address === address.addressLabel}/>&nbsp; {address.addressLabel} 
                      <div className="primary-address-detail">
                      <span><h4 className="buyer-name">{user.username}</h4><h4 className="strip-sign"> - </h4><h4 className="buyer-phone">+62894328249</h4></span>
                        <div className="buyer-address-detail">
                          <h4>{address.addressDescription}</h4>
                          <h4>{address.addressCity}</h4>
                          <h4>{address.addressProvince + ', ' + address.addressPostalCode}</h4>
                          <h4>{address.addressCountry}</h4>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>    

                <div className="item-checkout">
                  <span><h3>Checkout</h3> <h4 className="total-product-checkout">(2 Products)</h4></span>
                  <hr className="horizontal-line-checkout"/>
                        
                  {cartItems.map((checkoutItem) => {
                    return (
                      <div className="product-detail-checkout" key={checkoutItem.id}>
                        <div className="seller-detail">
                          <h5 id="seller-name">{checkoutItem.merchantName}</h5>
                          <h5 id="seller-address">Jakarta Pusat</h5>
                        </div>

                        <CheckoutItem key={checkoutItem.p_id} checkoutItem={checkoutItem} />

                        <div className="logistic-option">
                          <h5>Shipping Logistic</h5>
                          <select id="logistic" name="logistic" onChange={(e) => this.chooseCourier(e.target.value, checkoutItem.merchantName)}>
                            <option>{checkoutItem.courierName ? checkoutItem.courierName : "Select Courier"}</option>
                            <option>---</option>
                            {courierList.map((courier) => (
                              <option key={courier.courier_id} value={courier.courierName}>{courier.courierName}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      );
                    })}
                    <div className="price-detail-checkout">
                      <h5>Product Summary 1</h5>
                      <div className="price">
                        <p className="total-price-summary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                        Total Rp.{totalPrice},- <img src={require("../css/CheckOut/u0.png")} alt=""/></p>
                        <div className="collapse" id="collapseExample">
                          <div className="total-item-price-summary">
                            <p>Item Price ( {totalItem} pcs )</p>
                            <p>Rp.5.000.000</p>
                          </div>
                          <div className="total-shipping-price-summary">
                            <p>Shipping ( 2 kgs )</p>
                            <p>Rp.50.000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        
                    <div className="total-payment-card-checkout">
                        <h3>Total Payment</h3>
                        <hr className="horizontal-line-checkout"/>
                        <div className="total-payment-checkout">
                            <div className="total-product-price-checkout">
                                <h6>Total Price</h6>
                                <h6>Rp.{totalPrice},-</h6>
                            </div>
                            <div className="total-shipping-price-checkout">
                                <h6>Total Shipping</h6>
                                <h6>Rp.100.000</h6>
                            </div>
                        </div>
                        <div className="total-price-to-pay-checkout">
                            <span>
                            <h6>Total</h6>
                            <h6 id="total-price-amount">Rp.{totalPrice},-</h6>
                            </span>
                            <button className="promo-button-checkout"><h6>Add Promo Code or Voucher</h6></button>      
                        </div>
                          <button className="proceed-button-checkout" onClick={e => this.modalOpen(e)}><h6>Proceed to Payment</h6></button>
                          <AlertPopup show={this.state.modal} handleClose={e => this.modalClose(e)}>
                          <h4>Continue Checkout?</h4>
                          <button className="proceed-button-checkout" onClick={() => { this.placeOrder(this.state.address)}}><h6>Continue</h6></button>
                          </AlertPopup>
                    </div>
                </div>
            </div>
        </React.Fragment> 
       );
    }
}

Checkout.propTypes = {
    getCart: PropTypes.func,
    selectCourier: PropTypes.func,
    user: PropTypes.object,
    address: PropTypes.object,
    errors: PropTypes.object,
  };


const mapStateToProps = (state) => ({
    cart: state.cart,
    user: state.user,
    total: state.total,
    courier: state.courier,
    address: state.address,
    errors: state.errors
})

const mapDispatchToProps = (dispatch) => {
    return {
      getAddress: () => {
        dispatch(loadAllAddress());
      },
      getCouriers: () => {
          dispatch(getCouriers());
      },
      getCart: (userID) => {
          dispatch(getCart(userID));
      },
      getTotalPrice: (userID) => {
        dispatch(getTotalPrice(userID));
      },
      getTotalItem: (userID) => {
        dispatch(getTotalItem(userID));
      },
      selectCourier: (orderIdentifier, courierChoice, history) => {
        dispatch(selectCourier(orderIdentifier, courierChoice, history));
      },
      processOrder: (orderIdentifier, userID, cartDetail, history) => {
        dispatch(processOrder(orderIdentifier, userID, cartDetail, history));
      },
    };
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));