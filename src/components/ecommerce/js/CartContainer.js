import React, { Component } from "react";
import "../css/CartStyle.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import CartItem from "./CartItem";
import { getCart } from "../../../actions/cartActions";
import { processOrder } from "../../../actions/cartActions";

class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
    this.placeOrder = this.placeOrder.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    this.props.getCart(this.props.user.user.trackOrder);
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
    const { cartItems } = this.props.cart;

    return (
      <React.Fragment>
        <div className="cart">
          <div className="top-side-cart">
            <div className="top-left-side">
              <h2 id="cart-title">Shopping Cart</h2>
              <h3 id="total-item-in-cart">You have 2 products on your cart</h3>
            </div>

            <div class="page-nav-cart">
                <h4 className="active">Cart</h4>
                <img
                    src={require("../../layout/images/cart/long-arrow-png.png")}
                    alt=""
                  ></img>    
                <h4>Check-Out</h4>
                <img
                    src={require("../../layout/images/cart/long-arrow-png.png")}
                    alt=""
                  ></img>    
                <h4>Payment</h4>
            </div>
          </div>
          <div className="cart-body">
            <div className="item-summary">
                {cartItems.map((cartItem) => {
                return <CartItem key={cartItem.p_id} cartItem={cartItem} />;
              })}
              <div>
                  <button className="add-another-product-button">
                  <img
                    className="add-img"
                    src={require("../../layout/images/cart/PlusLogoCircle.png")}
                    alt=""
                  ></img>    
                    Add Another Product
                  </button>          
              </div>
            </div>

            <div className="order-summary">
              <h5 id="order-summary-title">Order Summary</h5>
              <hr></hr>
                <div className="total-price-summary">
                  <h5>Sub-Total</h5>
                  <span>
                    <h6>Items (2)</h6>
                    <h6><b>Rp. 200.000</b></h6>
                  </span>
                <button><h6>Add Promo Code or Voucher</h6></button>
                </div>

                <button className="checkout-button"
                onClick={() => {
                this.placeOrder();}}
                >
                  <h6>Check Out</h6>
                </button>
            </div>
          </div>

        </div>
        
          <div className="item-recommend-cart">
            <div>
              <h4>Your Wishlist</h4>   
              <hr></hr>           
            </div>

            <div>
              <h4>Last Seen</h4>
              <hr></hr> 
            </div>

            <div>
              <h4>Recommended for You</h4>
              <hr></hr> 
            </div>
          </div>
      </React.Fragment>
    );
  }
}
CartContainer.propTypes = {
  getCart: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  user: state.user,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (trackOrder) => {
      dispatch(getCart(trackOrder));
    },
    processOrder: (orderIdentifier, userID, cartDetail, history) => {
      dispatch(processOrder(orderIdentifier, userID, cartDetail, history));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartContainer)
);
