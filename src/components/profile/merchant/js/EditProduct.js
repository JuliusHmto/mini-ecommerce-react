import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import {
  getProduct,
  updateCurrentProduct,
} from "../../../../actions/merchantActions.js";
import { getCategory } from "../../../../actions/categoryActions";
import "../css/EditProduct.css";

class editProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      productName: "",
      productDescription: "",
      productPrice: "",
      productStock: "",
      productCategory: "",
      filePath:"",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      productName,
      productDescription,
      productPrice,
      productStock,
      productCategoryName,
      filePath,
    } = nextProps.currentItem;

    this.setState({
      id,
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
      filePath: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProduct(id, this.props.history);
    this.props.getCategory();
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateProduct = (event) => {
    event.preventDefault();
    const merchantID = this.props.merchant.merchant.id;
    const formData = new FormData();
    formData.append("productCategoryName", this.state.productCategoryName);
    formData.append("productName", this.state.productName);
    formData.append("productDescription", this.state.productDescription);
    formData.append("productPrice", this.state.productPrice);
    formData.append("productStock", this.state.productStock);
    formData.append("filePath", this.state.filePath);

    this.props.updateCurrentProduct(
      merchantID,
      formData,
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
                  src={this.state.filePath}
                  onChange={this.handleUploadClick}
                >                                    
                </input>                   
                <img className="submitted-img"
                  src={
                    this.state.imagePreview !== null
                      ? this.state.imagePreview
                      : null
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

              <div className="productWeight">
                <p>Weight</p>
                <input>
                </input>
                <select>
                  <option>Kg</option>
                  <option>g</option>
                </select>
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
              onClick={this.updateProduct}
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
    updateCurrentProduct: (merchantID, updatedProduct, history) => {
      dispatch(updateCurrentProduct(merchantID, updatedProduct, history))
    },
}};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(editProduct)
);
