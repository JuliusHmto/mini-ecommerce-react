import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { deleteProduct } from "../../../../actions/merchantActions";
import "../css/merchantItemCatalog.css";

class MerchantItemCatalog extends Component {

  constructor(props) {
    super(props);
    this.state = { };
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(productID) {
    this.props.deleteProduct(productID, this.props.history);
  }

  render() {
    const { merchantItem } = this.props;
    return (
      <div className="cardProductMerchant">
        <img
          className="imageProperty"
          src={merchantItem.filePath}
          alt=""
        ></img>
        <div className="textPropertyMerch">
          <p className="productNameMerch">{merchantItem.productName}</p>
          <p className="productPriceMerch">Rp. {merchantItem.productPrice},-</p>
          <p className="productCategoryMerch">{merchantItem.productCategory}</p>
          <p className="productStockMerch">Stock&nbsp;<b>{merchantItem.productStock}</b> pcs</p>
        </div>
        <div className="buttonProductMerchant">        
            <Link to={`/my_shop/edit/${merchantItem.id}`}>
              <button className="EditProductMerch">Edit Product</button>
            </Link>
              <button className="SetProductMerch">Set Non-Active</button>
              <button className="DeleteProductMerch" onClick={() => {
                this.deleteItem(merchantItem.product_id);
              }}>Delete Product</button>
          </div>
      </div>
    );
  }
}

MerchantItemCatalog.propTypes = {
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (productID, history) => {
      dispatch(deleteProduct(productID, history));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MerchantItemCatalog));
