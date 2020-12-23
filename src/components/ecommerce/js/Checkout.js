import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getCouriers, selectCourier } from "../../../actions/courierActions";
import { getCart, processOrder, getTotal } from "../../../actions/cartActions";
import { loadAllAddress } from "../../../actions/userActions";
import appendScript from "../../../utils/appendScript";
import "../css/CheckOut/CheckOut.css";
import CheckoutItem from './CheckoutItem';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.props.getTotal(this.props.user.user.id);
    this.props.getAddress();
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
    const orderIdentifier = this.props.user.user.trackOrder;
    const userID = this.props.user.user.id;
    let [cartDetail] = this.props.cart.cartItems;
    const history = this.props.history;
    this.props.processOrder(orderIdentifier, userID, cartDetail, history);
  }

  render() { 
    const { cartItems } = this.props.cart;
    const { courierList } = this.props.courier;
    const {user} = this.props.user;
    const {addresses} = this.props.address;
    
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
                        value={address.address_description}
                        onChange={this.onAddressChange}
                        checked={this.state.address === address.address_description}/>&nbsp; {address.address_label} 
                      <div className="primary-address-detail">
                      <span><h4 className="buyer-name">{user.username}</h4><h4 className="strip-sign"> - </h4><h4 className="buyer-phone">+62894328249</h4></span>
                        <div className="buyer-address-detail">
                          <h4>{address.address_description}</h4>
                          <h4>{address.address_city}</h4>
                          <h4>{address.address_province + ', ' + address.address_postalCode}</h4>
                          <h4>{address.address_country}</h4>
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
                          <select id="logistic" name="logistic" onChange={(e) => this.chooseCourier(checkoutItem.orderIdentifier, e.target.value, checkoutItem.merchantName)}>
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
                        Total Rp.5.050.000,- <img src={require("../css/CheckOut/u0.png")} alt=""/></p>
                        <div className="collapse" id="collapseExample">
                          <div className="total-item-price-summary">
                            <p>Item Price ( 2 pcs )</p>
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
                                <h6>Rp.5.000.000</h6>
                            </div>
                            <div className="total-shipping-price-checkout">
                                <h6>Total Shipping</h6>
                                <h6>Rp.100.000</h6>
                            </div>
                        </div>
                        <div className="total-price-to-pay-checkout">
                            <span>
                            <h6>Total</h6>
                            <h6 id="total-price-amount">Rp.5.100.000</h6>
                            </span>
                            <button className="promo-button-checkout"><h6>Add Promo Code or Voucher</h6></button>      
                        </div>
                        <button className="proceed-button-checkout"><h6>Proceed to Payment</h6></button>
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
      getTotal: (userID) => {
        dispatch(getTotal(userID));
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