import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {
  addQuantity,
  subQuantity,
  removeFromCart
} from "../../../actions/cartActions";
import "../css/CartItem.css";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };

    this.addQty = this.addQty.bind(this);
    this.subQty = this.subQty.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }

  addQty(productID) {
    const userID = this.props.user.user.id;
    this.props.addQuantity(productID, userID, this.props.history);
  }

  subQty(productID) {
    const userID = this.props.user.user.id;
    this.props.subQuantity(productID, userID, this.props.history);
  }

  removeProduct(productID) {
    this.props.removeFromCart(productID, this.props.history);
  }

  render() {
    const { cartItem } = this.props;
    return (
      <div className="item-detail"  key={cartItem.merchantName}>
        <h5 className="shop-name"><input type="checkbox" id="shop-input"></input> &nbsp; {cartItem.merchantName}</h5>
        <h6 className="shop-location">Jakarta Utara</h6>
          <span className="product-to-buy">
          
            <div className="column1">
              <input id="select-item" type="checkbox"></input>
              <img
                className="productImage"
                src={cartItem.p_filePath}
                alt="nopic"
              ></img>                
            </div>

            <div className="column2">
              <h3>{cartItem.p_name}</h3>
              <h3 className="item-price">Rp.{cartItem.p_price},-</h3> 
              <textarea
              name="text"
              className="inputNotes"
              placeholder="Additional Notes..."
               ></textarea>
            </div>

            <div className="column3" id="qty-span">
              <button
                type="button"
                className="min-btn"
                onClick={() => {
                  this.subQty(cartItem.p_id);
                }}
              >
              -
              </button>
              <label type="number" id="quantity" name="quantity" aria-valuemin="1">{cartItem.quantity}</label>
              <button
                type="button"
                className="plus-btn"
                onClick={() => {
                this.addQty(cartItem.p_id);}}
              >
              +
              </button>
            </div>

            <div className="total-price">
              <h6>Total Price</h6>
              <h3>Rp.{cartItem.total_price},-</h3>            
            </div>

          </span>

          <div className="cart-interaction">  
            <img
              className="delete-product"
              src={require("../../layout/images/cart/trash-bin.png")}
              onClick={() => {
              this.handleRemove(cartItem.p_id); }}
            ></img>
          </div>
      </div>
    );
  }
}

CartItem.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addQuantity: (productID, userID, orderNum, history) => {
      dispatch(addQuantity(productID, userID, orderNum, history));
    },
    subQuantity: (productID, userID, orderNum, history) => {
      dispatch(subQuantity(productID, userID, orderNum, history));
    },
    removeFromCart: (productID, orderNum, history) => {
      dispatch(removeFromCart(productID, orderNum, history));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartItem)
);
