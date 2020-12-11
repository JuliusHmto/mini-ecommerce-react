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
    console.log(cartItem);
    const cartItemDetail = cartItem.cart_detail.map((itemDetail) =>
    {
      return(
        <div className="product-container" key={itemDetail.cart_id}>
          <div className="column1">
            <input id="select-item" type="checkbox"></input>
              <img
                className="productImage"
                src={itemDetail.p_filePath}
                alt="nopic"
              ></img>                
          </div>

          <div className="column2">
            <h3>{itemDetail.p_name}</h3>
            <h3 className="item-price">Rp.{itemDetail.p_price},-</h3> 
            <textarea
              name="text"
              className="inputNotes"
              placeholder="Additional Notes..."
            ></textarea>
          </div>

          <div className="column3" id="qty-minplus">
            <button className="qty-min-btn" onClick={() => {this.subQty(itemDetail.p_id);}}>-</button>
            <label type="number" id="qty" name="quantity" aria-valuemin="1">{itemDetail.quantity}</label>
            <button className="qty-plus-btn" onClick={() => {this.addQty(itemDetail.p_id);}}>+</button>
          </div>

          <div className="total-price">
            <h6>Total Price</h6>
            <h3>Rp.{itemDetail.total_price},-</h3>            
          </div>

          <div className="cart-del-product">  
            <img
              src={require("../../layout/images/cart/trash-bin.png")}
              onClick={() => {
              this.removeProduct(itemDetail.p_id); }}
            ></img>
          </div>

        </div>
      );
    });

    return (
      <div className="item-detail"  key={cartItem.id}>
        <h5 className="shop-name"><input type="checkbox" id="shop-input"></input> &nbsp; {cartItem.merchantName}</h5>
        <h6 className="shop-location">Jakarta Utara</h6>
        <div className="product-to-buy">
          {cartItemDetail}
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
