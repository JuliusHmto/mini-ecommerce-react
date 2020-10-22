import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getItemDetail } from "../../../actions/catalogActions";
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
  }

  addProductToCart(productID) {
    const userID = this.props.user.user.id;
    const orderNum = {
      orderIdentifier: this.props.user.user.trackOrder,
    };
    console.log(this.props.history);
    this.props.addToCart(productID, userID, orderNum, this.props.history);
  }

  render() {
    const { itemDetail } = this.props.itemDetail;
    return (
      <React.Fragment>
        <div class="item-detail-page">
          <div class="item-detail2">
            <div class="picture-detail">
              <div class="primary-picture-detail">
                <img
                  class="picture-detail-1"
                  src={itemDetail.filePath}
                  alt=""
                ></img>
              </div>

              <div class="interaction">
                <button class="fav-detail">
                  <img src={require("../css/ItemDetail/fav-icon.png")}>
                  </img>
                  <p>Add to Favourite</p>
                </button>

              <div class="border-purpose"></div>

                <button class="share-detail">
                  <img src={require("../css/ItemDetail/share-icon.png")}>
                  </img>
                  <p>Share</p>
                </button>
              </div>

              <div class="secondary-picture-detail">
                <img
                    class="item-image-2 image-active"
                    src={itemDetail.filePath}
                    alt=""
                ></img>
                <img
                  class="item-image-2"
                  src={require("../css/ItemDetail/item2.jpg")}
                  alt=""
                ></img>
                <img
                  class="item-image-2"
                  src={require("../css/ItemDetail/item3.jpg")}
                  alt=""
                ></img>
                <img
                  class="item-image-2"
                  src={require("../css/ItemDetail/item4.jpg")}
                  alt=""
                ></img>
                <img
                  class="item-image-2"
                  src={require("../css/ItemDetail/item5.jpg")}
                  alt=""
                ></img>
              </div>
            </div>

            <div class="item-detail-text">
              <h3 class="productCategory-detail">{itemDetail.productCategoryName}</h3>
              <h2 class="productName-detail">{itemDetail.productName}</h2>
              <h3 class="productPrice-detail">Rp. {itemDetail.productPrice} ,-</h3>
              <p class="productStock-detail">Availibility : <b>in stock ({itemDetail.productStock})</b></p>

              <div class="productInfo-detail">
                <h3>Product Info</h3>
                <hr class="horizontal-line-detail"></hr>

                <div class="product-info">
                  <div class="product-weight">
                    <p>Weight</p>
                    <h4>1.8kg</h4>
                  </div>

                  <div class="product-rate">
                    <p>Rating</p>
                    <div class="review-total">
                      <img src={require("../css/ItemDetail/star-icon.png")}></img>
                      <h4>4.5 / 5 <span id="buyer-total">( 500 Buyer )</span></h4>
                    </div>
                  </div>

                  <div class="wishlist-info">
                    <p>Wishlist for</p>
                    <h4>5 users</h4>
                  </div>
                </div>
              </div>

              <div class="productInfo-detail2">
                <div class="productQty-detail">
                  <h3>Quantity</h3>
                  <hr class="horizontal-line-detail"></hr>
                  
                  <div class="input-qty">
                    <img class="minus-icon" src={require("../css/ItemDetail/min-icon-qty.png")}></img>
                    <input type="number" id="quantity" name="quantity" min="1"></input>
                    <img class="plus-icon" src={require("../css/ItemDetail/plus-icon-qty.png")}></img>
                  </div>
                </div>

                <div class="shipping-info-detail">
                  <h3>Shipping</h3>
                  <hr class="horizontal-line-detail-shipping"></hr>

                  <div class="shipping-city">
                    <div class="city-1">
                      <p>From</p>
                      <h4>Jakarta</h4>
                    </div>

                    <div class="city-2">
                      <p>To</p>
                      <input placeholder="Jakarta"></input>
                    </div>
                  </div>

                  <p class="shipping-price">Start from Rp.15.000 - Rp.30.000 (in 2 - 5 days)</p>
                </div>
              </div>

              {/*<div class="benefit-info-detail">
                <h3>Shop with safe</h3>
                <hr class="horizontal-line-detail"></hr>

                <div class="benefit">
                  <div class="benefit-1">
                    <img src="def-icon.png">
                    </img>
                    <h4>Item send in 2 days</h4>
                  </div>

                  <div class="benefit-2">
                    <img src="def-icon.png">
                    </img>
                    <h4>Free Refund</h4>
                  </div>
                </div>
              </div>*/}

              <div class="button-item-detail">
                <button class="buy-now-detail">
                  Buy Now
                </button>

                <button class="ATC-detail">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div class="seller-info">
            <h2>Seller Information</h2>
            <hr class="horizontal-line-detail-3"></hr>

            <div class="seller-info-detail"> 
              <div class="seller-info-detail-1">
                <img src={require("../css/ItemDetail/def-icon.png")}></img>

                <div class="seller-data">
                  <h3>Toko_SneakersKu</h3>
                  <p class="seller-city">Jakarta Pusat</p>

                  <div class="seller-button">
                    <button class="chat-button">
                      Chat Seller
                    </button>
                    <button class="view-shop">
                      View Shop
                    </button>
                  </div>
                </div>
              </div>

              <div class="seller-info-detail-2">
                <div class="seller-rating">
                  <p>Seller Rating</p>
                  <span><img src="star-icon.png"></img><h4>5/5</h4></span>
                </div>

                <div class="total-product">
                  <p>Total Products</p>
                  <h4>500</h4>
                </div>

                <div class="response-time">
                  <p>Response Time</p>
                  <h4> ± 5 Minutes</h4>
                </div>

                <div class="seller-follower">
                  <p>Followers</p>
                  <h4>505</h4>
                </div>
              </div>
            </div>
          </div>

          <div class="item-interaction"> 
            <div class="productDescription-detail">
              <h2>Product Description</h2>
              <hr class="horizontal-line-detail-3"></hr>
              <p><b>Deskripsi {itemDetail.productName}</b></p>
              <p>{itemDetail.productDescription}</p>
            </div>

            <div class="productRating-detail">
              <h2>Product Rating</h2>
              <hr class="horizontal-line-detail-3"></hr>
              <div class="rate">
                <div class="left-side-rate-detail">
                  <p class="number">5</p>

                  <div class="value-rate">
                    <img src={require("../css/ItemDetail/star-icon.png")}></img>
                    <img src={require("../css/ItemDetail/star-icon.png")}></img>
                    <img src={require("../css/ItemDetail/star-icon.png")}></img>
                    <img src={require("../css/ItemDetail/star-icon.png")}></img>
                    <img src={require("../css/ItemDetail/star-icon.png")}></img>
    
                    <p class="total-user-rate">From 100 review</p>
                  </div>
                </div>

                <div class="rate-filter">
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

              <div class="review">
                <img src={require("../css/ItemDetail/def-icon.png")}></img>
                <div class="review-text">
                  <h4>Alexander</h4>
                  <img src={require("../css/ItemDetail/star-icon.png")}></img>
                  <img src={require("../css/ItemDetail/star-icon.png")}></img>
                  <img src={require("../css/ItemDetail/star-icon.png")}></img>
                  <img src={require("../css/ItemDetail/star-icon.png")}></img>
                  <img src={require("../css/ItemDetail/star-icon.png")}></img>
                  <p class="review-date">Tanggal 29-07-2020</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa eos ad enim natus at impedit. Culpa assumenda explicabo minus natus facere, dolorem sapiente iure, a omnis cupiditate, fugiat doloribus. Ad?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur culpa quo commodi sapiente odit maiores? Nulla, voluptatem iure maxime magni dicta quod distinctio praesentium doloribus quis eius nesciunt autem accusantium.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="item-recommendation">
            <h2>Recommended for you</h2>
            <hr class="horizontal-line-detail-3"></hr>
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
  itemDetail: state.ecommerce,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getItemDetail: (productID) => {
      dispatch(getItemDetail(productID));
    },
    addToCart: (productID, userID, orderNum, history) => {
      dispatch(addToCart(productID, userID, orderNum, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
