import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getMerchant, getMerchantItems } from "../../../../actions/merchantActions";
import MerchantItemCatalog from "./MerchantItemCatalog";
import { getCategory } from "../../../../actions/categoryActions";
import "../css/merchantCatalogStyle.css";

class MerchantCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterStr: "",
      errors: {},
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    this.props.getMerchant(this.props.user.user.id);
    this.props.getMerchantItems(this.props.merchant.merchant.id);
    this.props.getCategory();
  }

  render() {
    const { merchantItems } = this.props.merchantItem;
    const { categories } = this.props.category;

    return (
      <div className="containerMerch">
        <div className="navsideMerch">
          <div className="store-info">
            <img
              src={require("../../../layout/images/dummy/profileimage.png")}
              alt=""
            ></img>
            <div className="store-name">
              <h4>Store's Name</h4>
              <h5>Trusted Seller</h5>
            </div>
          </div>
          <div className="optionList">
            <div className="Dashboard-option">
              <img
                src={require("../../../layout/images/merchant/DashboardIcon.png")}
                alt=""
              ></img>
              <h5>Dashboard</h5>
            </div>
            <div className="MyShop-option">
              <img
                src={require("../../../layout/images/merchant/HomeIcon.png")}
                alt=""
              ></img>
              <h5>My Shop</h5>
            </div>
            <div className="Listing-option">
              <img
                src={require("../../../layout/images/merchant/ListingIcon.png")}
                alt=""
              ></img>
              <h5>Listing</h5>
            </div>
            <div className="Order-option">
              <img
                src={require("../../../layout/images/merchant/OrdersIcon.png")}
                alt=""
              ></img>
              <h5>Orders</h5>
            </div>
            <div className="CS-option">
              <img
                src={require("../../../layout/images/merchant/CustomerSatisficationIcon.png")}
                alt=""
              ></img>
              <h5>Customer Satisfication</h5>
            </div>
            <div className="Financial-option">
              <img
                src={require("../../../layout/images/merchant/FinancialsIcon.png")}
                alt=""
              ></img>
              <h5>Financial</h5>
            </div>
            <div className="StoreSettings-option">
              <img
                src={require("../../../layout/images/merchant/SettingIcon.png")}
                alt=""
              ></img>
              <h5>Store Setting</h5>
            </div>
          </div>
        </div>

        <div className="wrapperMerch">
          <h1>Your Products</h1>
          
          <div className="dropDownFilterMerchant">
            <select
              value={this.state.filterStr}
              onChange={(e) => this.setState({ filterStr: e.target.value })}
            >
              {categories.map((category) => (
                <option
                  key={category.category_id}
                  value={category.categoryName}
                  onChange={this.handleChange}
                >
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="tableProductMerchant">
            {merchantItems.map((merchantItem) => {
              return (
                <MerchantItemCatalog
                  key={merchantItem.product_id}
                  merchantItem={merchantItem}
                />
              );
            })}
            <div className="AddProductMerch">
              <Link to={"/my-shop/add"}>
                <button className="AddProductText">
                  <img
                    src={require("../../../layout/images/cart/PlusLogoCircle.png")}
                    alt=""
                  />{" "}
                  <span>Add Another Product</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MerchantCatalog.propTypes = {
  user: PropTypes.object.isRequired,
  merchant: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  category: state.category,
  merchant: state.merchant,
  merchantItem: state.merchantItem,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMerchant: (userID) => {
      dispatch(getMerchant(userID));
    },
    getCategory: () => {
      dispatch(getCategory());
    },
    getMerchantItems: (merchantID) => {
      dispatch(getMerchantItems(merchantID));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MerchantCatalog)
);
