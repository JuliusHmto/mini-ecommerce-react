import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { createProduct } from "../../../../actions/merchantActions";
import { getCategory } from "../../../../actions/categoryActions";
import "../css/AddProduct.css";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productCategory: "",
      productDesciption: "",
      productPrice: "",
      productStock: "",
      productImage: null,
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitNewProduct = this.submitNewProduct.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
  }

  componentDidMount() {
    this.props.getCategory();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleUploadClick = (event) => {
    let file = event.target.files[0];
    this.setState({
      file: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  submitNewProduct = (event) => {
    event.preventDefault();
    const merchantID = this.props.merchant.merchant.id;
    const formData = new FormData();
    formData.append("productCategoryName", this.state.productCategoryName);
    formData.append("productName", this.state.productName);
    formData.append("productDescription", this.state.productDescription);
    formData.append("productPrice", this.state.productPrice);
    formData.append("productStock", this.state.productStock);
    formData.append("file", this.state.file);

    this.props.createProduct(merchantID, formData);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { errors } = this.state;
    const { categories } = this.props.category;

    return (
      <React.Fragment>
        <div className="Add-Product-Content">
          <h1>Add New Product</h1>
          <form>
            <div className="productImages">
              <h2>Product Image</h2>
              <div className="productImageInput">
                <div className="inputImage">
                  <input
                    className="inputImageButton"
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
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
                </div>
                <div className="inputImage">
                  <input
                    className="inputImageButton"
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                  ></input>
                </div>
                <div className="inputImage">
                  <input
                    className="inputImageButton"
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                  ></input>
                </div>
                <div className="inputImage">
                  <input
                    className="inputImageButton"
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                  ></input>
                </div>
                <div className="inputImage">
                  <input
                    className="inputImageButton"
                    type="file"
                    id="img"
                    name="img"
                    accept="image/*"
                  ></input>
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
                      value={this.state.productCategoryName}
                      name="productCategoryName"
                      onChange={this.handleChange}
                    >
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
                        placeholder="Write your product description here..."
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
                className="SaveAndAddNew"
                type="submit"
                onClick={this.submitNewProduct}
              >
                Save and Add New
              </button>

              <button
                className="Save"
                type="submit"
                onClick={this.submitNewProduct}
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

AddProduct.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  category: state.category,
  merchant: state.merchant,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: () => {
      dispatch(getCategory());
    },
    createProduct: (merchantID, formData) => {
      dispatch(createProduct(merchantID, formData));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddProduct)
);
