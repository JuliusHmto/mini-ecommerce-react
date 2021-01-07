import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getItemDetail, getItemDetailWithProps,  getItems } from "../../../actions/catalogActions";
import { addToCart } from "../../../actions/cartActions";
import "../css/ItemDetail/ItemDetail.css";

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  componentDidMount() {
    const { productID } = this.props.location.state;
    this.props.getItemDetail(productID);
    this.props.getItems();
  }

  getItemToProps(productID, productName) {
    this.props.getItemDetailWithProps(productID, productName, this.props.history);
  }

  addProductToCart(productID) {
    const userID = this.props.user.user.id;
    this.props.addToCart(productID, userID, this.props.history);
  }

  render() {
    const { itemDetail } = this.props.itemDetail;
    const { items } = this.props.items;
    const filteredItemsList = items.map((item) => {
      return (
        <div className="card card-cont" key={item.product_id}>
          <div className="product-detail-cards-land">
            <button className="item-button" onClick={() => this.getItemToProps(item.product_id, item.productName)}>
              <img
                className="item-image"
                src={item.filePath}
                alt=""
              ></img>

              <div className="detail-button-wrapper"></div>
              <span>
                <button className="view-detail-button">VIEW DETAILS</button>
              </span>
            </button>
            <div className="item-text-land">
              <div className="item-text-2">
                <p className="productName-land">{item.productName}</p>
                <p className="productCategoryCat-land">
                  {item.productCategoryName}
                </p>
              </div>
              <p className="productPrice-land">Rp. {item.productPrice},-</p>
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
                className="ATC-image-land"
                src={require("../../layout/images/header/cart.png")}
                alt=""
              ></img>
            </button>
          </div>
        </div>
      );
    });

    return (
      <React.Fragment>
        <div className="item-detail-page">
          <div className="item-detail2">
            <div className="picture-detail">
              <div className="primary-picture-detail">
                <img
                  className="picture-detail-1"
                  src={itemDetail.filePath}
                  alt="nopic"
                ></img>
              </div>

              <div className="interaction">
                <button className="fav-detail">
                  <img src={require("../css/ItemDetail/fav-icon.png")} alt="nopic"/>
                  <p>Add to Favourite</p>
                </button>

              <div className="border-purpose"></div>

                <button className="share-detail">
                  <img src={require("../css/ItemDetail/share-icon.png")} alt="nopic"/>
                  <p>Share</p>
                </button>
              </div>

              <div className="secondary-picture-detail">
                <img
                    className="item-image-2 image-active"
                    src={itemDetail.filePath}
                    alt=""
                ></img>
                <img
                  className="item-image-2"
                  src={require("../css/ItemDetail/item2.jpg")}
                  alt="nopic"
                ></img>
                <img
                  className="item-image-2"
                  src={require("../css/ItemDetail/item3.jpg")}
                  alt="nopic"
                ></img>
                <img
                  className="item-image-2"
                  src={require("../css/ItemDetail/item4.jpg")}
                  alt="nopic"
                ></img>
                <img
                  className="item-image-2"
                  src={require("../css/ItemDetail/item5.jpg")}
                  alt="nopic"
                ></img>
              </div>
            </div>

            <div className="item-detail-text">
              <h3 className="productCategory-detail">{itemDetail.productCategoryName}</h3>
              <h2 className="productName-detail">{itemDetail.productName}</h2>
              <h3 className="productPrice-detail">Rp. {itemDetail.productPrice} ,-</h3>
              <p className="productStock-detail">Availibility : <b>in stock ({itemDetail.productStock})</b></p>

              <div className="productInfo-detail">
                <h3>Product Info</h3>
                <hr className="horizontal-line-detail"></hr>

                <div className="product-info">
                  <div class="product-weight">
                    <p>Weight</p>
                    <h4>1.8kg</h4>
                  </div>

                  <div className="product-rate">
                    <p>Rating</p>
                    <div className="review-total">
                      <img src={require("../css/ItemDetail/star-icon.png")} alt="nopic"/>
                      <h4>4.5 / 5 <span id="buyer-total">( 500 Buyer )</span></h4>
                    </div>
                  </div>

                  <div class="wishlist-info">
                      <p>Wishlist for</p>
                      <h4>5 users</h4>
                  </div>
                </div>
              </div>

              <div className="productInfo-detail2">
                <div className="productQty-detail">
                  <h3>Quantity</h3>
                  <hr className="horizontal-line-detail"></hr>
                  
                  <div className="input-qty">
                    <img className="minus-icon" src={require("../css/ItemDetail/min-icon-qty.png")} alt="nopic"/>
                    <input type="number" id="quantity" name="quantity" min="1"/>
                    <img className="plus-icon" src={require("../css/ItemDetail/plus-icon-qty.png")} alt="nopic"/>
                  </div>
                </div>

                <div className="shipping-info-detail">
                  <h3>Shipping</h3>
                  <hr className="horizontal-line-detail-shipping"></hr>

                  <div className="shipping-city">
                    <div className="city-1">
                      <p>From</p>
                      <h4>Jakarta</h4>
                    </div>

                    <div className="city-2">
                      <p>To</p>
                      <input placeholder="Jakarta"/>
                    </div>
                  </div>

                  <p className="shipping-price">Start from Rp.15.000 - Rp.30.000 (in 2 - 5 days)</p>
                </div>
              </div>

              <div className="button-item-detail">
                <button className="buy-now-detail">
                  Buy Now
                </button>

                <button className="ATC-detail">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="seller-info">
            <h2>Seller Information</h2>
            <hr className="horizontal-line-detail-3"></hr>

            <div className="seller-info-detail"> 
              <div className="seller-info-detail-1">
                <img src={require("../css/ItemDetail/def-icon.png")} alt="nopic"/>

                <div className="seller-data">
                  <h3>Toko_SneakersKu</h3>
                  <p className="seller-city">Jakarta Pusat</p>

                  <div className="seller-button">
                    <button className="chat-button">
                      Chat Seller
                    </button>
                    <button className="view-shop">
                      View Shop
                    </button>
                  </div>
                </div>
              </div>

              <div className="seller-info-detail-2">
                <div className="seller-rating">
                  <p>Seller Rating</p>
                  <span><img src={require("../css/ItemDetail/star-icon.png")} alt="nopic"/><h4>5/5</h4></span>
                </div>

                <div className="total-product">
                  <p>Total Products</p>
                  <h4>500</h4>
                </div>

                <div className="response-time">
                  <p>Response Time</p>
                  <h4> ± 5 Minutes</h4>
                </div>

                <div className="seller-follower">
                  <p>Followers</p>
                  <h4>505</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="item-interaction"> 
            <div className="productDescription-detail">
              <h2>Product Description</h2>
              <hr className="horizontal-line-detail-3"></hr>
              <p><b>Deskripsi {itemDetail.productName}</b></p>
              <p>{itemDetail.productDescription}</p>
            </div>

            <div className="productRating-detail">
              <h2>Product Rating</h2>
              <hr className="horizontal-line-detail-3"></hr>
              <div className="rate">
                <div className="left-side-rate-detail">
                  <p className="number">5</p>

                  <div className="value-rate">
                    <img src={require("../css/ItemDetail/star-icon.png")} alt="nopic"/>
                    <img src={require("../css/ItemDetail/star-icon.png")} alt="nopic"/>
                    <img src={require("../css/ItemDetail/star-icon.png")} alt="nopic"/>
                    <img src={require("../css/ItemDetail/star-icon.png")} alt="nopic"/>
                    <img src={require("../css/ItemDetail/star-icon.png")} alt="nopic"/>
    
                    <p className="total-user-rate">From 100 review</p>
                  </div>
                </div>

                <div className="rate-filter">
                  <button>
                    All Review
                  </button>
  
                  <button>
                    5 Star
                  </button>
  
                  <button>
                    4 Star
                  </button>
  
                  <button>
                    3 Star
                  </button>
  
                  <button>
                    2 Star
                  </button>
  
                  <button>
                    1 Star
                  </button>
                </div>
              </div>

              <div className="review">
                <img src={require("../css/ItemDetail/def-icon.png")} alt="nopic"/>
                <div className="review-text">
                  <h4>Alexander</h4>
                  <img src={require("../css/ItemDetail/star-icon.png")} alt="nopic"/>
                  <img src={require("../css/ItemDetail/star-icon.png")} alt="nopic"/>
                  <img src={require("../css/ItemDetail/star-icon.png")} alt="nopic"/>
                  <img src={require("../css/ItemDetail/star-icon.png")} alt="nopic"/>
                  <img src={require("../css/ItemDetail/star-icon.png")} alt="nopic"/>
                  <p className="review-date">Tanggal 29-07-2020</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa eos ad enim natus at impedit. Culpa assumenda explicabo minus natus facere, dolorem sapiente iure, a omnis cupiditate, fugiat doloribus. Ad?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur culpa quo commodi sapiente odit maiores? Nulla, voluptatem iure maxime magni dicta quod distinctio praesentium doloribus quis eius nesciunt autem accusantium.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="item-recommendation">
            <h2>Recommended for you</h2>
            <hr className="horizontal-line-detail-3"></hr>
            <div className="item-list">{filteredItemsList}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ItemDetail.propTypes = {
  getItemDetail: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  itemDetail: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.ecommerce,
  itemDetail: state.ecommerce,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getItemDetail: (productID) => {
      dispatch(getItemDetail(productID));
    },
    getItemDetailWithProps: (productID, productName, history) => {
      dispatch(getItemDetailWithProps(productID, productName, history));
    },
    addToCart: (productID, userID, orderID, history) => {
      dispatch(addToCart(productID, userID, orderID, history));
    },
    getItems: () => {
      dispatch(getItems());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
