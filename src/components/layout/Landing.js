import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems } from "../../actions/catalogActions";
import { getCategory } from "../../actions/categoryActions";
import "./Landing.css";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterStr: "",
    };
  }

  componentDidMount() {
    if (this.props.user.validToken) {
      this.props.history.push("/home");
    } else {
      this.props.getItems();
    }
  }

  render() {
    const { items } = this.props.items;
    const { filterStr } = this.state;
    const searchedItem = this.props.searchValue.toLowerCase();

    //search bar item
    const searchedList = items.filter((item) =>
      item.productName.toLowerCase().includes(searchedItem)
    );

    const filteredItemsList = searchedList
      .filter((item) => item.productCategoryName.includes(filterStr))
      .map((item) => {
        return (
          <div className="card card-cont" key={item.product_id}>
            <div className="product-detail-cards-land">
              <Link to="/checkout" style={{ textDecoration: "none" }}>
                <Link
                  to={{
                    pathname: `/details/${item.productName}`,
                    state: { productID: item.product_id },
                  }}
                >
                  <img
                    className="item-image"
                    src={require("../layout/images/dummy/example-image.jpg")}
                    alt=""
                  ></img>

                  <div className="detail-button-wrapper"></div>
                  <span>
                    <button className="view-detail-button">VIEW DETAILS</button>
                  </span>
                </Link>
                <div className="item-text-land">
                  <div className="item-text-2">
                    <p className="productName-land">{item.productName}</p>
                    <p className="productCategoryCat-land">
                      {item.productCategoryName}
                    </p>
                  </div>
                  <p className="productPrice-land">Rp. {item.productPrice},-</p>
                </div>
              </Link>
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
                  className="ATC-image-land"
                  src={require("../layout/images/header/cart.png")}
                  alt=""
                ></img>
              </button>
            </div>
          </div>
        );
      });
    //main catalog
    return (
      <div className="containerLanding">
        {/* Carousel */}
        <div className="landing-banner">
          <div
            id="carouselExampleCaptions"
            className="carousel banner slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleCaptions"
                data-slide-to="0"
                className="active"
              ></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active" id="container">
                <div className="overlay-car"></div>
                <img src={require("./images/dummy/Banner1.jpg")} alt=""></img>
                <div className="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </div>
              </div>
              <div className="carousel-item" id="container">
                <div className="overlay-car"></div>
                <img src={require("./images/dummy/Banner2.jpg")} alt=""></img>
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
              <div className="carousel-item" id="container">
                <div className="overlay-car"></div>
                <img src={require("./images/dummy/Banner3.jpg")} alt=""></img>
                <div className="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleCaptions"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleCaptions"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>

          <div className="side-banner">
            <Link>
              <div id="container" className="side-banner-1">
                <div className="overlay-car"></div>
                <img
                  className="side-banner-img-1"
                  src={require("./images/dummy/Banner4.jpg")}
                  alt=""
                ></img>
                <div className="carousel-caption d-none d-md-block tes">
                  <h5>First slide label</h5>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </div>
              </div>
            </Link>

            <Link>
              <div id="container" className="side-banner-2">
                <div className="overlay-car"></div>
                <img
                  className="side-banner-img-2"
                  src={require("./images/dummy/Banner1.jpg")}
                  alt=""
                ></img>
                <div className="carousel-caption d-none d-md-block captions tes">
                  <h5>First slide label</h5>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Second Navbar */}
        {/* <div
          className="category-landing"
          value={filterStr}
          onChange={(e) => this.setState({ filterStr: e.target.value })}
        >
          <ul>
            <li value="">All</li>
            <li value="">Flash Sale</li>
            <li value="">Discount</li>
            <li value="">New Release</li>
          </ul>
        </div> */}

        <div className="event-category-container">
          <h4>See all event here</h4>
          <hr className="comp-info-hr-landing"></hr>
          <div className="event-category">
            <ul>
              <li id="first-option-event" class="active" value="">Flash Sale</li>
              <li value="">Discount</li>
              <li value="">New Release</li>
            </ul>
            <img
              className="event-image"
              src={require("../layout/images/landing/flash-sale.png")}
              alt=""
            ></img>
          </div>

        </div>

        <hr id="divider"></hr>

        <div className="shop-by-category">
          <h4>Shop by Category</h4>
          <hr className="comp-info-hr-landing"></hr>
          <div className="category-landing-2">
            <Link className="card">
              <div className="overlay"></div>
              {/* <span>
                <button className="view-detail-button-landing">
                  VIEW DETAILS
                </button>
              </span> */}
              <div className="card-body">
                <h5 className="card-title">All Products</h5>
                {/* <p className="card-text">
                  Find what you need in a second only at Sinarmas Market
                </p> */}
              </div>
            </Link>

            <Link className="card">
              <div className="overlay"></div>
              {/* <span>
                <button className="view-detail-button-landing">
                  VIEW DETAILS
                </button>
              </span> */}
              <div className="card-body">
                <h5 className="card-title">Clothes</h5>
                {/* <p className="card-text">
                  Look different from the others with new collection in Sinarmas
                  Market
                </p> */}
              </div>
            </Link>

            <Link className="card">
              <div className="overlay"></div>
              {/* <span>
                <button className="view-detail-button-landing">
                  VIEW DETAILS
                </button>
              </span> */}
              <div className="card-body">
                <h5 className="card-title">Food</h5>
                {/* <p className="card-text">
                  Search any kind of healthy and your favourite food in here
                </p> */}
              </div>
            </Link>

            <Link className="card">
              <div className="overlay"></div>
              {/* <span>
                <button className="view-detail-button-landing">
                  VIEW DETAILS
                </button>
              </span> */}
              <div className="card-body">
                <h5 className="card-title">*category*</h5>
                {/* <p className="card-text">
                  Search any kind of healthy and your favourite food in here
                </p> */}
              </div>
            </Link>

            <Link className="card">
              <div className="overlay"></div>
              {/* <span>
                <button className="view-detail-button-landing">
                  VIEW DETAILS
                </button>
              </span> */}
              <div className="card-body">
                <h5 className="card-title">*category*</h5>
                {/* <p className="card-text">
                  Search any kind of healthy and your favourite food in here
                </p> */}
              </div>
            </Link>

            <Link className="card">
              <div className="overlay"></div>
              {/* <span>
                <button className="view-detail-button-landing">
                  VIEW DETAILS
                </button>
              </span> */}
              <div className="card-body">
                <h5 className="card-title">*category*</h5>
                {/* <p className="card-text">
                  Search any kind of healthy and your favourite food in here
                </p> */}
              </div>
            </Link>

            <Link className="card">
              <div className="overlay"></div>
              {/* <span>
                <button className="view-detail-button-landing">
                  VIEW DETAILS
                </button>
              </span> */}
              <div className="card-body">
                <h5 className="card-title">*category*</h5>
                {/* <p className="card-text">
                  Search any kind of healthy and your favourite food in here
                </p> */}
              </div>
            </Link>

            <Link className="card">
              <div className="overlay"></div>
              {/* <span>
                <button className="view-detail-button-landing">
                  VIEW DETAILS
                </button>
              </span> */}
              <div className="card-body">
                <h5 className="card-title">*category*</h5>
                {/* <p className="card-text">
                  Search any kind of healthy and your favourite food in here
                </p> */}
              </div>
            </Link>

            <Link className="card">
              <div className="overlay"></div>
              {/* <span>
                <button className="view-detail-button-landing">
                  VIEW DETAILS
                </button>
              </span> */}
              <div className="card-body">
                <h5 className="card-title">*category*</h5>
                {/* <p className="card-text">
                  Search any kind of healthy and your favourite food in here
                </p> */}
              </div>
            </Link>

            <Link className="card">
              <div className="overlay"></div>
              {/* <span>
                <button className="view-detail-button-landing">
                  VIEW DETAILS
                </button>
              </span> */}
              <div className="card-body">
                <h5 className="card-title">*category*</h5>
                {/* <p className="card-text">
                  Search any kind of healthy and your favourite food in here
                </p> */}
              </div>
            </Link>

            <Link className="card">
              <div className="overlay"></div>
              {/* <span>
                <button className="view-detail-button-landing">
                  VIEW DETAILS
                </button>
              </span> */}
              <div className="card-body">
                <h5 className="card-title">*category*</h5>
                {/* <p className="card-text">
                  Search any kind of healthy and your favourite food in here
                </p> */}
              </div>
            </Link>

            <Link className="card">
              <div className="overlay"></div>
              {/* <span>
                <button className="view-detail-button-landing">
                  VIEW DETAILS
                </button>
              </span> */}
              <div className="card-body">
                <h5 className="card-title">*category*</h5>
                {/* <p className="card-text">
                  Search any kind of healthy and your favourite food in here
                </p> */}
              </div>
            </Link>
          </div>
        </div>

        <h2 className="land-prod-title">PRODUCTS</h2>

        <div className="shop-by-recent">
          <h4>Recent Seen</h4>
          <hr className="comp-info-hr-landing"></hr>
          <div className="item-list">{filteredItemsList}</div>
        </div>

        <div className="category-option">
          <div className="product-navbar">
            <Link className="category-for-user">
              <h4>Your Wishlist</h4>
              <hr className="comp-info-hr-landing-2"></hr>
            </Link>
            <Link className="category-for-user">
              <h4>Just For You</h4>
              <hr className="comp-info-hr-landing-2"></hr>
            </Link>
            <Link className="category-for-user">
              <h4>Price Reduced</h4>
              <hr className="comp-info-hr-landing-2"></hr>
            </Link>
            <Link className="category-for-user">
              <h4>Best Seller</h4>
              <hr className="comp-info-hr-landing-2"></hr>
            </Link>
          </div>
          <div className="item-list">{filteredItemsList}</div>
        </div>

        {/* <div className="item-list">
          <h3></h3>
          {filteredItemsList}
        </div> */}
      </div>
    );
  }
}

Landing.propTypes = {
  getItems: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.ecommerce,
  category: state.category,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
