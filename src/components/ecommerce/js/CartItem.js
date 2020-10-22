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
    const orderNum = {
      orderIdentifier: this.props.user.user.trackOrder,
    };
    this.props.addQuantity(productID, userID, orderNum, this.props.history);
  }

  subQty(productID) {
    const userID = this.props.user.user.id;
    const orderNum = {
      orderIdentifier: this.props.user.user.trackOrder,
    };
    this.props.subQuantity(productID, userID, orderNum, this.props.history);
  }

  removeProduct(productID) {
    const orderIdentifier = this.props.user.user.trackOrder;
    this.props.removeFromCart(productID, orderIdentifier, this.props.history);
  }

  render() {
    const { cartItem } = this.props;
    return (
      <div className="content cf" key={cartItem.id}>
        <table>
          <tbody>
            <tr className="row2A">
              <td className="column1A">
                <img
                  className="productImage"
                  src={require("../../layout/images/dummy/example-image.jpg")}
                  alt=""
                ></img>
              </td>
              <td className="column2A">
                {cartItem.p_Name}
                <br />
                <textarea
                  name="text"
                  className="inputNotes"
                  placeholder=" Additional Notes..."
                ></textarea>
              </td>
              <td>x {cartItem.quantity}</td>
              <td className="column3A">Rp. {cartItem.p_price}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <button
            type="button"
            className="btn btn-danger btn-circle btn-sm"
            onClick={() => {
              this.subQty(cartItem.p_id);
            }}
          >
            -
          </button>
          <button
            type="button"
            className="btn btn-success btn-circle btn-sm"
            onClick={() => {
              this.addQty(cartItem.p_id);
            }}
          >
            +
          </button>
        </div>

        <div
          className="btn btn-danger"
          onClick={() => {
            this.removeProduct(cartItem.p_id);
          }}
        >
          Remove
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
