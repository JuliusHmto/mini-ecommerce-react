import React, { Component } from 'react';
import appendScript from "../../../utils/appendScript";


class MerchantTransaction extends Component {

  componentDidMount() {
    appendScript("https://code.jquery.com/jquery-3.2.1.slim.min.js");
    appendScript("https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js");
    appendScript("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js");
  }

  render() { 
    return ( 
      <React.Fragment>
        <div class="merchant-transaction-page">
          {/*<!-- bagian filter untuk merchant -->*/}
          <div class="filter-side-merchant">
              <img class="logo-image" src="./logo.png"/>

              <div class="merchant-profile">
                  <img class="header-merchant-image" src="header-def-img.png"/>
                  <div class="header-overlay"></div>

                  <div class="merchant-profile-front">
                      <img src="./def-icon.png"/>
                      <h4>Bata Shop</h4>
                      <span class="loc"><p>Jakarta Pusat</p> <p>Since 2017</p></span>

                      <div class="merchant-filter-insight">
                          <span>
                              <h5>160</h5>
                              <p>Followers</p>
                          </span>

                          <span>
                              <h5>100</h5>
                              <p>Products</p>
                          </span>

                          <span>
                              <h5><img src="./star-icon.png"/> 5</h5>
                              <p>Ratings</p>
                          </span>
                      </div>
                  </div>
              </div>

              <div class="filter-merchant-option">
                  <div class="option">
                      <span>
                          <img src="./dashboard-icon.png"/>
                          <h4>Dashboard</h4>
                      </span>
                  </div>

                  <div class="option">
                      <span class="primary" data-toggle="collapse" href="#collapseProduct" role="button" aria-expanded="false" aria-controls="collapseProduct">
                          <img src="./product-icon.png"/>

                          <h4>
                            Products
                          </h4>

                          <img id="arrow-button-filter"  src="./u0.png"/>
                      </span>

                      <ul class="collapse product-collapse" id="collapseProduct">
                          <li><h5>My Product List</h5></li>
                          <li><h5>Add New Product</h5></li>
                      </ul>
                  </div>

                  <div class="option">
                      <span class="primary" data-toggle="collapse" href="#collapseOrder" role="button" aria-expanded="false" aria-controls="collapseOrder">
                          <img src="./order-icon.png"/>

                          <h4>
                            Order
                          </h4>

                          <img id="arrow-button-filter"  src="./u0.png"/>
                      </span>

                      <ul class="collapse order-collapse" id="collapseOrder">
                          <li><h5>New Orders</h5></li>
                          <li><h5>Need To Ship</h5></li>
                      </ul>
                  </div>

                  <div class="option">
                      <span>
                          <img src="./customer-satisfication-icon.png"/>
                          <h4>Feedback</h4>
                      </span>
                  </div>

                  <div class="option">
                      <span>
                          <img src="./financial-icon.png"/>
                          <h4>Financial</h4>
                      </span>
                  </div>

                  <div class="option">
                      <span  class="primary" data-toggle="collapse" href="#collapseOption" role="button" aria-expanded="false" aria-controls="collapseOption">
                          <img src="./setting-icon.png"/>

                          <h4>
                            Manage Shop
                          </h4>

                          <img id="arrow-button-filter" src="./u0.png"/>
                      </span>

                      <ul class="collapse option-collapse" id="collapseOption">
                          <li><h5>My Product List</h5></li>
                          <li><h5>Add New Product</h5></li>
                      </ul>
                  </div>

              </div>
          </div>

          <div class="merchant-transaction-content">
              <div class="top-side-merchant-transaction">
                  <h3>Maintain Your Transaction</h3>

                  <div class="transaction-status-bar">
                      <a class="active">
                          <h4>All Transaction</h4>
                          <hr id="horizontal-line-transaction"/>
                      </a>
      
                      <a>
                          <h4>Need Confirmation</h4>
                          <hr id="horizontal-line-transaction"/>
                      </a> 
                      
                      <a>
                          <h4>Processed</h4>
                          <hr id="horizontal-line-transaction"/>
                      </a> 
                      
                      <a>
                          <h4>Finished</h4>
                          <hr id="horizontal-line-transaction"/>
                      </a> 
                  </div>
              </div>

              <div class="filter-side-transaction">
                  <h6>Filter</h6>
                  <div class="filter-content">

                      <div class="transaction-date-filter">
                          <div class="min-date">
                              <p>From</p>
                              <input type="date"></input>
                          </div>

                          <h5 class="divider-date">-</h5>

                          <div class="max-date">
                              <p>To</p>
                              <input type="date"></input>
                          </div>
                      </div>

                      <div class="transaction-sort-filter">
                          <p>Sort by</p>
                          <div class="dropdown show">
                              <a class="dropdown-toggle dropdown-transaction" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Sort Transaction
                              </a>
                            
                              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a class="dropdown-item" href="#">Newest</a>
                                <a class="dropdown-item" href="#">.....</a>
                                <a class="dropdown-item" href="#">....</a>
                              </div>
                          </div>
                      </div>

                      <div class="search-transaction-filter">
                          <p>Find Transaction</p>
                          <input placeholder="Type product, invoice, or buyer name"></input>
                      </div>
                  </div>
              </div>

              <div class="content-side-transaction">
                  <div class="transaction">
                      <div class="transaction-order-detail">
                          <div class="seller-column">
                              <p>Buyer</p>
                              <h6 id="seller-name-transaction">Kevin Wijaya</h6>
                          </div>

                          <div>
                              <p>Invoice no</p>
                              <h6>13413432423</h6>
                          </div>

                          <div>
                              <p>Order Date</p>
                              <h6>20 Aug 2020</h6> 
                          </div>

                          <div>
                              <p>Status</p>
                              <h6>Need Confirmation <span class="respond-time">24 Hours</span></h6>
                          </div>

                          <div class="dropdown">
                              <button class="order-detail-button dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Respond Order</button>
                              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Accept Order</a>
                                <a class="dropdown-item" href="#">Reject Order</a>
                              </div>
                            </div>
                      </div>

                      <div class="transaction-product">
                          <div class="transaction-product-detail">
                              <img class="product-image-transaction" src="../../../layout/images/dummy/example-image.jpg"/>
      
                              <span class="product-detail-transaction">
                                  <h5>Nike Air Jordan Retro 12"FIBA White/University Red</h5>
                                  <h6>Rp.2,400,000</h6>
                                  <h6 id="quantity"><i>2 pcs (1.5 kgs)</i></h6>
                              </span>

                              <span class="address-transaction">
                                  <p>Shipping Address</p>
                                  <h5 id="nama-jalan">Jalan Kemanggisan Raya No 6B, Rt 012/005</h5>
                                  <h5>Kemanggisan, Jakarta Barat</h5>
                                  <h5>DKI Jakarta, 10610</h5>
                              </span>
                              
                              <span class="subtotal-transaction">
                                  <p>Sub-Total</p>
                                  <h5>Rp.4,800,000</h5>
                              </span>
                          </div>

                          <hr/>

                          <div class="price-transaction-detail">
                              <div class="total-price-summary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                  <p>Order Total </p>
                                  
                                  <span>
                                      <h5>Rp.4,850,000,- </h5>
                                      <img src="./u0.png"/>
                                  </span>
                              </div>

                              <div class="collapse" id="collapseExample">
                                    <div class="total-item-price-summary-transaction">
                                        <p>Item Price ( 2 pcs )</p>
                                        <p>Rp.4,800,000</p>
                                    </div>
                                    <div class="total-shipping-price-summary-transaction">
                                        <p>Shipping ( 2 kgs )</p>
                                        <p>Rp.50,000</p>
                                    </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </React.Fragment>      
      );
    }
}
 
export default MerchantTransaction;