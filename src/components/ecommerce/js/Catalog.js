import React, { Component } from "react";
import "../css/CatalogStyle.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { getItems } from "../../../actions/catalogActions";
import { addToCart } from "../../../actions/cartActions";
import { getCategory } from "../../../actions/categoryActions";

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterStr: "",
    };
    this.addProductToCart = this.addProductToCart.bind(this);
    
  }

  componentDidMount() {
    this.props.getItems();
    this.props.getCategory();
  }

  addProductToCart(productID) {
    const userID = this.props.user.user.id;
    const orderNum = {
      orderIdentifier: this.props.user.user.trackOrder,
    };
    this.props.addToCart(productID, userID, orderNum, this.props.history);
  }

  render() {
    const { items } = this.props.items;
    const { categories } = this.props.category;
    const { filterStr } = this.state;
    const searchedItem = this.props.searchValue.toLowerCase();

    //search bar item
    const searchedList = items.filter((item) =>
      item.productName.toLowerCase().includes(searchedItem)
    );

    //filter dropdown
    const filteredItemsList = searchedList
      .filter((item) => item.productCategoryName.includes(filterStr))
      .map((item) => {
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
                alt=""
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
                onClick={() => {
                  this.addProductToCart(item.product_id);
                }}
              >
                BUY NOW
              </button>

              <button
                className="addToCart-button"
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
      });

    //main catalog
    return (
      <React.Fragment>
        <MetaTags>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </MetaTags>
        <div className="wrap-cat all">
          <div className="filter-options">
            <div className="text">
              <h5>Tell us more what you need?</h5>
            </div>
            <div className="input-filter">
              <div className="categoryFilter">
                <h5>Category</h5>
                <select
                  value={filterStr}
                  onChange={(e) => this.setState({ filterStr: e.target.value })}
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
              </div>
              {/* masih bbuat hiasan */}
              <div class="priceFilter">
                <h5>Price</h5>
                <div className="inputPriceFilter">
                  <label className="Min" min="1" for="InputMin">
                    Min&nbsp; <span>Rp.</span>
                  </label>
                  <input
                    className="InputMin"
                    type="number"
                    placeholder="0"
                    min="0"
                  ></input>
                  <br></br>
                  <label className="Max" for="InputMax">
                    Max <span>Rp.</span>
                  </label>
                  <input
                    className="InputMax"
                    type="number"
                    placeholder="0"
                    min="0"
                  ></input>
                </div>
              </div>
            </div>
            {/* tombol sidenav */}
            <div className="button">
              <input
                className="ResetFilter"
                type="button"
                value="Reset Filter"
              ></input>
              <input
                className="AddFilter"
                type="button"
                value="Add Filter"
              ></input>
            </div>
          </div>

          <div className="catalog-content">
            <div className="catalog-navs">
              <div className="product-total">
                <h2>
                  <span>10</span> Products Shown
                </h2>
              </div>
              <div class="dropdown dropdown-catalog">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Sort By &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">
                    Most Related
                  </a>
                  <a class="dropdown-item" href="#">
                    Lowest Price
                  </a>
                  <a class="dropdown-item" href="#">
                    Highest Price
                  </a>
                </div>
              </div>
            </div>

            <div className="tables">{filteredItemsList}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Catalog.propTypes = {
  getItems: PropTypes.func.isRequired,
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
    getCategory: () => {
      dispatch(getCategory());
    },
    getItems: () => {
      dispatch(getItems());
    },
    addToCart: (productID, userID, invoiceIdentifer, history) => {
      dispatch(addToCart(productID, userID, invoiceIdentifer, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
