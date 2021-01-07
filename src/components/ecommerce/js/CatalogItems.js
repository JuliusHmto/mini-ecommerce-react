import React, { Component } from "react";
import "../css/CatalogStyle.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { addToCart } from "../../../actions/cartActions";

class CatalogItems extends Component {
  constructor(props) {
    super(props);
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  addProductToCart(productID) {
    const userID = this.props.user.user.id;
    this.props.addToCart(productID, userID, this.props.history);
  }

  render() {
    const { item } = this.props;
    return (
      <div className="card" key={item.product_id}>
        <div className="product-detail-card">
          <Link
            to={{
              pathname: `/details/${item.productName}`,
              state: { productID: item.product_id },
            }}
          >
          <img
            className="item-image"
            src={item.filePath}
            alt="nopic"
          />

            <div className="detail-button-wrapper"></div>
            <span>
              <button className="view-detail-button">VIEW DETAILS</button>
            </span>
          </Link>
          <div className="item-text">
            <div className="item-text-2">
              <p className="productName">{item.productName}</p>
            </div>
              <p className="productCategoryCat">{item.productCategoryName}</p>
            <p className="productPrice">Rp. {item.productPrice},-</p>
          </div>
        </div>
        <div className="button-product">
          <button
            className="bn-button"
            disabled={Boolean(item.productStock !== 0) ? false : true}
            onClick={() => {
              this.addProductToCart(item.product_id);
            }}
          >
            {item.productStock !== 0 ? 'BUY NOW' : 'OUT OF STOCK'}
          </button>

          <button
            className="addToCart-button"
            disabled={Boolean(item.productStock !== 0) ? false : true}
            onClick={() => {
              this.addProductToCart(item.product_id);
            }}
          >
            <img
              className="ATC-image"
              src={require("../../layout/images/header/cart.png")}
              alt=""
            ></img>
          </button>
        </div>
      </div>
    );
  }
}

CatalogItems.propTypes = {
  items: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  merchant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.ecommerce,
  category: state.category,
  merchant: state.merchant,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (productID, userID, history) => {
      dispatch(addToCart(productID, userID, history));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatalogItems));
