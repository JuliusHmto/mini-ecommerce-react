import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getCouriers, selectCourier } from "../../../actions/courierActions";
import { getCart, processOrder, getTotalPrice, getTotalItem } from "../../../actions/cartActions";
import { loadAllAddress } from "../../../actions/userActions";
import { loadVouchers, applyVoucher, cancelVoucher, getVoucherStatus } from "../../../actions/voucherActions";
import "../css/CheckOut/CheckOut.css";
import CheckoutItem from './CheckoutItem';
import AlertPopup from './AlertPopup';
import VoucherPopup from './VoucherPopup';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAlert: false,
      modalVoucher: false,
      address: "",
      errors: {},
    };
    this.placeOrder = this.placeOrder.bind(this);
    this.chooseCourier = this.chooseCourier.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.cancelChosenVoucher = this.cancelChosenVoucher.bind(this);
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
    this.props.loadVouchers();
    this.props.getVoucherStatus(this.props.user.user.id);
  }

  modalVoucherOpen() {
    this.setState({ modalVoucher: true });
  }

  modalVoucherClose() {
    this.setState({ modalVoucher: false });
  }

  modalAlertOpen() {
    this.setState({ modalAlert: true });
  }

  modalAlertClose() {
    this.setState({ modalAlert: false });
  }

  onAddressChange(event) {
    this.setState({
      address: event.target.value
    });
  }

  applyChosenVoucher(voucher){
    const voucherCode = {
      voucherCode: voucher
    }
    this.props.applyVoucher(this.props.user.user.id, voucherCode);
    this.modalVoucherClose();
  }

  cancelChosenVoucher(){
    this.props.cancelApplyVoucher(this.props.user.user.id);
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
    this.modalAlertClose();
  }

  render() { 
    const { cartItems } = this.props.cart;
    const { courierList } = this.props.courier;
    const { user } = this.props.user;
    const { addresses } = this.props.address;
    const { vouchers } = this.props.voucher;
    const totalPrice = this.props.total.totalPrice;
    const totalItem = this.props.total.totalItem;
    const hasVoucher = this.props.voucher.hasVoucher;

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
                      <span><h4 className="buyer-name">{user.username}</h4></span>
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
                      <h5>Product Summary</h5>
                      <div className="price">
                        <p className="total-price-summary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                        Total Rp.{totalPrice},- <img src={require("../css/CheckOut/u0.png")} alt=""/></p>
                        <div className="collapse" id="collapseExample">
                          <div className="total-item-price-summary">
                            <p>Item Price ( {totalItem} pcs )</p>
                            <p>Rp.{totalPrice},-</p>
                          </div>
                          <div className="total-shipping-price-summary">
                            <p>Shipping</p>
                            <p>Rp.10.000,-</p>
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
                          <h6>Rp.10.000,-</h6>
                      </div>
                  </div>
                  <div className="total-price-to-pay-checkout">
                    <span>
                      <h6>Total</h6>
                      <h6 id="total-price-amount">Rp.{totalPrice},-</h6>
                    </span>
                    { hasVoucher === 'No' ? 
                    <button className="promo-button-checkout" onClick={() => this.modalVoucherOpen()}><h6>Add Promo Code or Voucher</h6></button>
                    :
                    <button className="promo-button-checkout" onClick={this.cancelChosenVoucher}><h6>Cancel Voucher</h6></button>
                    }  
                  </div>

                  <VoucherPopup show={this.state.modalVoucher} handleClose={() => this.modalVoucherClose()}>
                    <div className="voucherStyles">
                      <h2>Vouchers</h2>
                    </div> 
                    <div className="voucherModal">
                      {vouchers.map((voucher) => {
                        return(
                          <div className="voucherDetail" key={voucher.id}>
                            <div className="voucherText">
                              <h4 className="voucher-name">{voucher.voucherName}</h4>
                              <h6 className="voucher-code">{voucher.voucherCode}</h6>
                              <p className="voucher-desc">{voucher.voucherDescription}</p>
                            </div>
                            <div className="voucherSelectButton">
                              <button className="usePromo" onClick={() => this.applyChosenVoucher(voucher.voucherCode)}><h6>Use Promo</h6></button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </VoucherPopup>

                  <button className="proceed-button-checkout" onClick={() => this.modalAlertOpen()}><h6>Proceed to Payment</h6></button>
                  <AlertPopup show={this.state.modalAlert} handleClose={() => this.modalAlertClose()}>
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
    voucher: state.voucher,
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
      loadVouchers: () => {
        dispatch(loadVouchers());
      },
      getVoucherStatus: (userID) => {
        dispatch(getVoucherStatus(userID));
      },
      applyVoucher: (userID, voucher) => {
        dispatch(applyVoucher(userID, voucher));
      },
      cancelApplyVoucher: (userID) => {
        dispatch(cancelVoucher(userID));
      },
    };
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));