import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getMerchant, getMerchantItems } from "../../../../actions/merchantActions";
import MerchantItemCatalog from "./MerchantItemCatalog";
import { getCategory } from "../../../../actions/categoryActions";
import "../css/merchantCatalogStyle.css";
import Sidebar from "./MerchantSideBar";

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
    const { filterStr } = this.state;

    const merchantProducts = merchantItems.filter((merchantItem) =>
    merchantItem.productCategoryName.includes(filterStr)).map((merchantItem) =>
    {
      return  (
        <MerchantItemCatalog key={merchantItem.product_id} merchantItem={merchantItem}/>
      );
    });

    return (
      <div className="containerMerch">
        <Sidebar/>
        <div className="wrapperMerch">
          <h1>Your Products</h1>
          
          <div className="dropDownFilterMerchant">
            <select
              value={this.state.filterStr}
              onChange={(e) => this.setState({ filterStr: e.target.value })}
            >
              <option value="">All</option>
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

            {merchantProducts}

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
