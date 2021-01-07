import React, { Component } from "react";
import "../css/CatalogStyle.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getItems } from "../../../actions/catalogActions";
import { getCategory } from "../../../actions/categoryActions";
import { getUserData } from "../../../actions/userActions";
import CatalogItems from "./CatalogItems";

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterStr: "",
      minPrice: 0,
      maxPrice: 0,
      minPriceTemp: "",
      maxPriceTemp: 0,
      catalogItems: [],
    };
    this.sortBy = this.sortBy.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.applyPrice = this.applyPrice.bind(this);
    this.resetPrice = this.resetPrice.bind(this);
  }

  componentDidMount() {
    this.props.getUserData(this.props.user.user.id);
    this.props.getItems();
    this.props.getCategory();
    
  }

  componentDidUpdate(){
    if(this.props.items.items !== this.state.catalogItems){
      const maxValue = Math.max.apply(Math, this.props.items.items.map(function(item) { return item.productPrice; }));
      this.setState({
        catalogItems: this.props.items.items,
        maxPrice: maxValue,
        maxPriceTemp: maxValue,
      });
    }
  }

  sortBy(e) {
    const {catalogItems} = this.state;
    let newCatalogItems = catalogItems;
    if(e.target.value === 'lowPrice'){
      newCatalogItems = catalogItems.sort((a, b) => (a.productPrice - b.productPrice));
    } else if(e.target.value === 'highPrice'){
      newCatalogItems = catalogItems.sort((a, b) => (b.productPrice - a.productPrice));
    } 
    this.setState({catalogItems: newCatalogItems});
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  applyPrice() {
   this.setState({
     minPrice: this.state.minPriceTemp,
     maxPrice: this.state.maxPriceTemp
   });
  }

  resetPrice(){
    const {catalogItems} = this.state;
    const maxValue = Math.max.apply(Math, catalogItems.map(function(item) { return item.productPrice; }));
    this.setState({
      minPrice: "",
      maxPrice: maxValue,
    });
  }


  render() {
    const { categories } = this.props.category;
    const { catalogItems, filterStr, minPrice, maxPrice } = this.state;
    const searchedItem = this.props.searchValue.toLowerCase();


    //search bar item
    const searchedList = catalogItems.filter((item) =>
      item.productName.toLowerCase().includes(searchedItem)
    );

    const priceRangeList = searchedList.filter((item) =>
      item.productPrice >= minPrice && item.productPrice <= maxPrice
    );

    //filter dropdown
    const filteredItemsList = priceRangeList
      .filter((item) => item.productCategoryName.includes(filterStr))
      .map((item) => {
        return (
          <CatalogItems key={item.product_id} item={item}/>
        );
      });

    //main catalog
    return (
      <React.Fragment>
        <div className="wrap-cat all">
          <div className="filter-options">
            <div className="text">
              <h5>Filters</h5>
            </div>
            <div className="input-filter">
              <div className="categoryFilter">
                <h5>Category</h5>
                <select
                  value={filterStr}
                  onChange={(e) => this.setState({ filterStr: e.target.value })}
                >
                  <option value="">All</option>
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
                    name="minPriceTemp"
                    value={this.state.minPriceTemp}
                    onChange={this.handleChange}
                  ></input>
                  <br></br>
                  <label className="Max" for="InputMax">
                    Max <span>Rp.</span>
                  </label>
                  <input
                    className="InputMax"
                    type="number"
                    placeholder="0"
                    name="maxPriceTemp"
                    value={this.state.maxPriceTemp}
                    onChange={this.handleChange}
                  ></input>
                </div>
              </div>
            </div>
            {/* tombol sidenav */}
            <div className="button">
              <button className="ResetFilter" onClick={this.resetPrice}>Reset</button>
              <button className="AddFilter" onClick={this.applyPrice}>Add Filter</button>
            </div>
          </div>

          <div className="catalog-content">
            <div className="catalog-navs">
              <div className="product-total">
                <h2>
                  All Products
                </h2>
              </div>
              <div className="dropdown dropdown-catalog">
                <select
                  className="btn btn-secondary dropdown-toggle"
                  onChange={(e)=> this.sortBy(e)}
                >
                  <option value="" disabled selected>Sort By:</option>
                  <option value="lowPrice">Lowest Price</option>
                  <option value="highPrice">Highest Price</option>
                </select>
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
    getUserData: (id) => {
      dispatch(getUserData(id));
    },
    getCategory: () => {
      dispatch(getCategory());
    },
    getItems: () => {
      dispatch(getItems());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
