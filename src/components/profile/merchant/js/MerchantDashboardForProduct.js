import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getMerchant } from "../../../../actions/merchantActions";
import '../css/MerchantProfile/merchantDashboardForProduct.css';

class MerchantDashboardForProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterStr: "",
      errors: {},
    };
  }

  componentDidMount() {
    this.props.getMerchant(this.props.user.user.id);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const {merchant} = this.props.merchant;

    return (
      <React.Fragment>
      <div className="filter-side-merchantt">
        <div className="merchant-profile">
          <img className="header-merchant-image" src={require("../css/MerchantProfile/header-def-img.png")}/>
          <div className="header-overlay"></div>

          <div className="merchant-profile-front">
            <img src={require("../css/MerchantProfile/def-icon.png")}/>
            <h4>{merchant.merchantName}</h4>
            <span className="loc"><p>{merchant.merchantAddress}</p> <p>Since 2017</p></span>

            <div className="merchant-filter-insight">
              <span>
                <h5>160</h5>
                <p>Followers</p>
              </span>

              <span>
                <h5>100</h5>
                <p>Products</p>
              </span>

              <span>
                <h5><img src={require("../css/MerchantProfile/star-icon.png")}/> 5</h5>
                <p>Ratings</p>
              </span>
            </div>
          </div>
        </div>

        <div className="filter-merchant-option">
          <div className="option">
            <span>
              <img src={require("../css/MerchantProfile/dashboard-icon.png")}/>
              <Link to={'/my-shop/profile'}><h4>Dashboard</h4></Link>
            </span>
          </div>

          <div className="option">
            <span className="primary" data-toggle="collapse" href="#collapseProduct" role="button" aria-expanded="false" aria-controls="collapseProduct">
              <img src={require("../css/MerchantProfile/product-icon.png")}/>
              <h4>Products</h4>
              <img id="arrow-button-filter"  src={require("../css/MerchantProfile/u0.png")}/>
            </span>

            <ul className="collapse product-collapse" id="collapseProduct">
              <li><Link to={'/my-shop/catalog'}><h5>My Product List</h5></Link></li>
              <li><Link to={'/my-shop/add'}><h5>Add New Product</h5></Link></li>
            </ul>
          </div>

          <div className="option">
            <span className="primary" data-toggle="collapse" href="#collapseOrder" role="button" aria-expanded="false" aria-controls="collapseOrder">
              <img src={require("../css/MerchantProfile/order-icon.png")}/>
              <h4>Order</h4>
              <img id="arrow-button-filter"  src={require("../css/MerchantProfile/u0.png")}/>
            </span>

            <ul className="collapse order-collapse" id="collapseOrder">
              <li><Link to={'/my-shop/transaction'}><h5>All Orders</h5></Link></li>
              <li><Link to={'/my-shop/transaction/pending'}><h5>Pending</h5></Link></li>
              <li><Link to={'/my-shop/transaction/processing'}><h5>Processed</h5></Link></li>
              <li><Link to={'/my-shop/transaction/finished'}><h5>Finished</h5></Link></li>
            </ul>
          </div>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  merchant: state.merchant,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMerchant: (userID) => {
      dispatch(getMerchant(userID));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MerchantDashboardForProduct)
);
