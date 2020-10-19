import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import {
  getProduct,
  updateCurrentProduct,
} from "../../../../actions/merchantActions.js";

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
      productImage: null,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
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
      productCategory,
      productImage,
    } = nextProps.currentItem;

    this.setState({
      id,
      productName,
      productDescription,
      productPrice,
      productStock,
      productCategory,
      productImage,
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProduct(id, this.props.history);
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  updateProduct = (event) => {
    event.preventDefault();
    const updatedProduct = {
      id: this.state.id,
      productName: this.state.productName,
      productDescription: this.state.productDescription,
      productPrice: this.state.productPrice,
      productStock: this.state.productStock,
      productImage: this.state.productImage,
      productCategory: this.state.productCategory,
    };
    this.props.updateCurrentProduct(
      this.props.merchant.merchant.id,
      updatedProduct,
      this.props.history
    );
  };

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <div>Edit Product</div>
        <br />
        <form>
          <div className="productName">
            <p>Product Name: </p>
            <input
              type="text"
              className={classnames("", {
                "is-invalid": errors.productName,
              })}
              name="productName"
              value={this.state.productName}
              onChange={this.onChange}
            />
            {errors.productName && (
              <div className="invalid-feedback">{errors.productName}</div>
            )}
          </div>

          <div className="productCategory">
            <p>Product Category: </p>
            <input
              type="text"
              className={classnames("", {
                "is-invalid": errors.productCategory,
              })}
              name="productCategory"
              value={this.state.productCategory}
              onChange={this.onChange}
            />
            {errors.productCategory && (
              <div className="invalid-feedback">{errors.productCategory}</div>
            )}
          </div>

          <div className="productDescription">
            <p>Product Description:</p>
            <textarea
              className={classnames("", {
                "is-invalid": errors.productDescription,
              })}
              name="productDescription"
              value={this.state.productDescription}
              onChange={this.onChange}
            />
            {errors.productDescription && (
              <div className="invalid-feedback">
                {errors.productDescription}
              </div>
            )}
          </div>

          <div className="productPrice">
            <p>Product Price: </p>
            <input
              type="text"
              className={classnames("", {
                "is-invalid": errors.productPrice,
              })}
              name="productPrice"
              value={this.state.productPrice}
              onChange={this.onChange}
            />
            {errors.productPrice && (
              <div className="invalid-feedback">{errors.productPrice}</div>
            )}
          </div>

          <div className="productStock">
            <p>Product Stock: </p>
            <input
              type="text"
              className={classnames("", {
                "is-invalid": errors.productStock,
              })}
              name="productStock"
              value={this.state.productStock}
              onChange={this.onChange}
            />
            {errors.productStock && (
              <div className="invalid-feedback">{errors.productStock}</div>
            )}
          </div>

          <br />
          <div>
            <button
              className="btn btn-success"
              type="submit"
              onClick={this.updateProduct}
            >
              Update Product
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

editProduct.propTypes = {
  getProduct: PropTypes.func.isRequired,
  updateCurrentProduct: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  currentItem: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  merchant: state.merchant,
  currentItem: state.merchant.currentItem,
  errors: state.errors,
});

export default withRouter(
  connect(mapStateToProps, { getProduct, updateCurrentProduct })(editProduct)
);
