import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/merchantItemCatalog.css";

class MerchantItemCatalog extends Component {
  render() {
    const { merchantItem } = this.props;
    return (
      <div className="cardProductMerchant">
        <img
          className="imageProperty"
          src={require("../../../layout/images/dummy/example-image.jpg")}
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
              <button className="DeleteProductMerch">Delete Product</button>
          </div>
      </div>
    );
  }
}

export default MerchantItemCatalog;
