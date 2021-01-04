import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import {
  getProduct,
  updateCurrentProduct,
  updateCurrentProductWithImage
} from "../../../../actions/merchantActions.js";
import { getCategory } from "../../../../actions/categoryActions";
import "../css/EditProduct.css";

class editProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: "",
      productName: "",
      productDescription: "",
      productPrice: "",
      productStock: "",
      productCategoryName: "",
      filePath:"",
      imagePreview: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateProductWithNewImage = this.updateProductWithNewImage.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      product_id,
      productName,
      productDescription,
      productPrice,
      productStock,
      productCategoryName,
      filePath,
    } = nextProps.currentItem;

    this.setState({
      product_id,
      productName,
      productDescription,
      productPrice,
      productStock,
      productCategoryName,
      filePath,
    });
  }

  handleUploadClick = (event) => {
    let file = event.target.files[0];
    this.setState({
      filePreview: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProduct(id, this.props.history);
    this.props.getCategory();
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateProductWithNewImage = (event) => {
    event.preventDefault();
    const merchantID = this.props.merchant.merchant.id;
    const formData = new FormData();
    formData.append("productCategoryName", this.state.productCategoryName);
    formData.append("productName", this.state.productName);
    formData.append("productDescription", this.state.productDescription);
    formData.append("productPrice", this.state.productPrice);
    formData.append("productStock", this.state.productStock);
    formData.append("file", this.state.filePreview);
    formData.append("product_id", this.state.product_id);
    this.props.updateCurrentProductWithImage(
      merchantID,
      formData,
      this.props.history
    );
  };

  updateProduct = (event) => {
    event.preventDefault();
    const merchantID = this.props.merchant.merchant.id;
    const data ={
      productCategoryName: this.state.productCategoryName,
      productName: this.state.productName,
      productDescription: this.state.productDescription,
      productPrice: this.state.productPrice,
      productStock: this.state.productStock,
      file: this.state.filePreview,
      product_id: this.state.product_id,
      fileName: this.props.currentItem.fileName,
      filePath: this.props.currentItem.filePath,
      fileType: this.props.currentItem.fileType,
      fileSize: this.props.currentItem.fileSize,
    }
    this.props.updateCurrentProduct(
      merchantID,
      data,
      this.props.history
    );
  };

  render() {
    const { errors } = this.state;
    const { categories } = this.props.category;

    return (
      <React.Fragment>
        <div className="Add-Product-Content">
        <h1>Edit Product</h1>
        <form>
          <div className="productImages">
            <h2>Product Image</h2>
            <div className="productImageInput">
              <div className="inputImage">
                <input
                  className={classnames("inputImageButton", {
                    "is-invalid": errors.file,
                  })}
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  onChange={this.handleUploadClick}
                >                                    
                </input>                   
                <img className="submitted-img"
                  src={
                    this.state.imagePreview !== ""
                      ? this.state.imagePreview
                      : this.state.filePath
                  }
                />
                <h4 id="primaryImage">Primary Image</h4>
                {errors.file && (
                  <div className="invalid-feedback">{errors.file}</div>
                )}
              </div>
              <div className="inputImage">
                <input
                  className="inputImageButton"
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                /><img/>
              </div>
              <div className="inputImage">
                <input
                  className="inputImageButton"
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                /><img/>
              </div>
              <div className="inputImage">
                <input
                  className="inputImageButton"
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                /><img/>
              </div>
              <div className="inputImage">
                <input
                  className="inputImageButton"
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                /><img/>
              </div>
            </div>
          </div>

          <div className="input-add-product">
            <div className="product-information">
              <h3>Product Information</h3>
                <div className="product-name">
                  <p>Product Name</p>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.productName,
                    })}
                    name="productName"
                    placeholder={this.state.productName}
                    onChange={this.handleChange}
                  />
                  {errors.productName && (
                    <div className="invalid-feedback">{errors.productName}</div>
                  )}
                </div>

                <div className="productCategory">
                  <p>Product Category</p>
                  <select
                    className={classnames("", {
                      "is-invalid": errors.productCategoryName,
                    })}
                    name="productCategoryName"
                    onChange={this.handleChange}
                  >
                    <option value={this.state.productCategoryName} hidden>{this.state.productCategoryName}</option>
                    <option value="">--</option>
                    {categories.map((category) => (
                      <option
                        key={category.category_id}
                        value={category.categoryName}
                      >
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                  {errors.productCategoryName && (
                    <div className="invalid-feedback">
                      {errors.productCategoryName}
                    </div>
                  )}  
                </div>
            </div>

            <div className="product-detail">
              <h3>Product Detail</h3>
                <div className="productPrices">
                  <p className="price-input">Product Price</p>
                  <p id="curr">Rp.</p>
                  <input
                    type="text"
                    className={classnames("form-control", {
                      "is-invalid": errors.productPrice,
                    })}
                    name="productPrice"
                    placeholder={this.state.productPrice}
                    onChange={this.handleChange}
                  />
                  {errors.productPrice && (
                    <div className="invalid-feedback">{errors.productPrice}</div>
                  )}
                </div>

                <div className="productDescriptions">
                    <p className="description-input">Product Description</p>
                    <textarea
                      className={classnames("text-area-add-product", {
                        "is-invalid": errors.productDescription,
                      })}
                      name="productDescription"
                      onChange={this.handleChange}
                      placeholder={this.state.productDescription}
                    />
                    {errors.productDescription && (
                      <div className="invalid-feedback">
                        {errors.productDescription}
                      </div>
                    )}
                </div>
            </div>

            <div className="product-ship-stock">
              <h3>Stock and Shipping</h3>
            
              <div className="productStocks">
                <p className="stock-input">Stock</p>
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.productStock,
                  })}
                  name="productStock"
                  placeholder={this.state.productStock}
                  onChange={this.handleChange}
                />{" "}
                <p>&nbsp;&nbsp;pcs</p>
                {errors.productStock && (
                  <div className="invalid-feedback">{errors.productStock}</div>
                )}
              </div>
            </div>

          </div>

          <div className="ButtonAddProducts">
            <button
              className="cancelButtonAP"
              type="submit"
            >
              Cancel
            </button>
            <button
              className="Save"
              type="submit"
              onClick={this.state.imagePreview !== "" ? this.updateProductWithImage : this.updateProduct}
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
    );
  }
}

editProduct.propTypes = {
  getProduct: PropTypes.func,
  updateCurrentProduct: PropTypes.func,
  user: PropTypes.object,
  currentItem: PropTypes.object,
  errors: PropTypes.object,
  category: PropTypes.object
};

const mapStateToProps = (state) => ({
  user: state.user,
  merchant: state.merchant,
  currentItem: state.merchant.currentItem,
  errors: state.errors,
  category: state.category,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => {
      dispatch(getProduct(id));
    },
    getCategory: () => {
      dispatch(getCategory());
    },
    updateCurrentProductWithImage: (merchantID, formData, history) => {
      dispatch(updateCurrentProductWithImage(merchantID, formData, history))
    },
    updateCurrentProduct: (merchantID, data, history) => {
      dispatch(updateCurrentProduct(merchantID, data, history))
    },
}};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(editProduct)
);
