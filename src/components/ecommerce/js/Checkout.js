import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import  {selectCourier, getCart} from "../../../actions/cartActions";
import appendScript from "../../../utils/appendScript";
import { processOrder } from "../../../actions/cartActions";

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          errors: {},
        };
        this.placeOrder = this.placeOrder.bind(this);
      }

    componentDidMount(){
        appendScript("https://code.jquery.com/jquery-3.2.1.slim.min.js");
        appendScript("https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js");
        appendScript("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js");
        this.props.getCart(this.props.user.user.trackOrder);
    }

    chooseCourier(courierName, merchantName){
        const orderIdentifier = this.user.user.trackOrder;
        const courierChoice = {
            courierName: courierName,
            merchantName: merchantName,
        }
        const history = this.props.history;
        this.props.selectCourier(orderIdentifier, courierChoice, history);
    }

    placeOrder() {
        const orderIdentifier = this.props.user.user.trackOrder;
        const userID = this.props.user.user.id;
        let [cartDetail] = this.props.cart.cartItems;
        const history = this.props.history;
        console.log(JSON.stringify(cartDetail));
        this.props.processOrder(orderIdentifier, userID, cartDetail, history);
      }

    render() { 
        const { checkoutItems } = this.props.cart;
        const user = this.props.user;
        return ( 
            <React.Fragment>
            <div class="Check-Out-Page">
            <div class="top-side-checkout">
                <h2>Checkout Page</h2>    
                <div class="page-nav">
                    <h4>Cart</h4>
                    <img src={require("../css/CheckOut/long-arrow-png.png")} alt=""/>
                    <h4 class="active">Check-Out</h4>
                    <img src={require("../css/CheckOut/long-arrow-png.png")} alt=""/>
                    <h4>Payment</h4>
                </div>
            </div>
            <div class="check-out-content">
                <div class="left-side-check-out">
                    <div class="buyer-detail">
                        <h3>Where to Send</h3>
                        <hr class="horizontal-line-checkout"/>
                        <div class="primary-address">
                            <input type="radio" id="address" value="primary">&nbsp;Use Primary / Default Address</input>  
                            
                            <div class="primary-address-detail">
                                <span><h4 class="buyer-name">{user.username}</h4><h4 class="strip-sign">-</h4><h4 class="buyer-phone">+62894328249</h4></span>
                                <div class="buyer-address-detail">
                                    <h4>Jalan Kemanggisan Raya No 6B, RT 012/005</h4>
                                    <h4>Kemanggisan, Jakarta Barat</h4>
                                    <h4>DKI Jakarta, 10610</h4>
                                    <h4>Indonesia</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="item-checkout">
                        <span><h3>Product to Buy</h3> <h4 class="total-product-checkout">(2 Products)</h4></span>
                        <hr class="horizontal-line-checkout"/>

                        {checkoutItems.map((checkoutItem) => {
                            return (
                                <div class="product-detail-checkout">
                                    <div class="seller-detail">
                                        <h5 id="seller-name">{checkoutItem.merchantName}</h5>
                                        <h5 id="seller-address">Jakarta Pusat</h5>
                                    </div>

                                    <div class="item-detail-checkout">
                                        <img class="item-img-checkout" src={require("../css/CheckOut/item1.jpg")} alt=""/>
                                            <div class="column2-checkout">
                                            <h4 class="item-name-checkout">{checkoutItem.p_name}</h4>
                                            <h5 class="item-price-checkout">Rp.{checkoutItem.p_price},-</h5>
                                            <h5 class="note-checkout">Note <span><i>Tolong dipack dengan rapih dan aman agar sampai barangnya tidak rusak</i></span></h5>
                                        </div>

                                        <div class="column3-checkout">
                                            <h5 class="item-weight-checkout">{checkoutItem.p_qty} pcs (2 kg)</h5>
                                        </div>

                                        <div class="column4-checkout">
                                            <h5>Rp.{checkoutItem.p_price * checkoutItem.quantity},-</h5>
                                        </div>
                                    </div>

                                    <div class="logistic-option">
                                        <h5>Shipping Logistic</h5>
                                        <select id="logistic" name="logistic">
                                            <option value="JNE">JNE</option>
                                            <option value="TIKI">TIKI</option>
                                            <option value="SiCepat">SiCepat</option>
                                            <option value="JNT">J&T</option>
                                            </select>
                                    </div>

                                    <div class="price-detail-checkout">
                                        <h5>Product Summary 1</h5>
                                        <div class="price">
                                            <p class="total-price-summary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                                Total Rp.5.050.000,- <img src={require("../css/CheckOut/u0.png")} alt=""/>
                                                </p>
                                            <div class="collapse" id="collapseExample">
                                                <div class="total-item-price-summary">
                                                    <p>Item Price ( 2 pcs )</p>
                                                    <p>Rp.5.000.000</p>
                                                </div>
                                                <div class="total-shipping-price-summary">
                                                    <p>Shipping ( 2 kgs )</p>
                                                    <p>Rp.50.000</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
        
                    <div class="total-payment-card-checkout">
                        <h3>Total Payment</h3>
                        <hr class="horizontal-line-checkout"/>
                        <div class="total-payment-checkout">
                            <div class="total-product-price-checkout">
                                <h6>Total Price</h6>
                                <h6>Rp.5.000.000</h6>
                            </div>
                            <div class="total-shipping-price-checkout">
                                <h6>Total Shipping</h6>
                                <h6>Rp.100.000</h6>
                            </div>
                        </div>
                        <div class="total-price-to-pay-checkout">
                            <span>
                            <h6>Total</h6>
                            <h6 id="total-price-amount">Rp.5.100.000</h6>
                            </span>
                            <button class="promo-button-checkout"><h6>Add Promo Code or Voucher</h6></button>      
                        </div>
                        <button class="proceed-button-checkout"><h6>Proceed to Payment</h6></button>
                    </div>
                </div>
            </div>
            </React.Fragment> 
       );
    }
}

Checkout.propTypes = {
    getCart: PropTypes.func.isRequired,
    selectCourier: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };


const mapStateToProps = (state) => ({
    cart: state.cart,
    user: state.user,
    merchant: state.merchant,
    errors: state.errors
})

const mapDispatchToProps = (dispatch) => {
    return {
      getCart: (trackOrder) => {
        dispatch(getCart(trackOrder));
      },
      selectCourier: (orderIdentifier, courierChoice) => {
        dispatch(selectCourier(orderIdentifier, courierChoice));
      },
      processOrder: (orderIdentifier, userID, cartDetail, history) => {
        dispatch(processOrder(orderIdentifier, userID, cartDetail, history));
      },
    };
  };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout));