import React, { Component } from 'react';

class MerchantProfile extends Component {
  componentDidMount() {
    appendScript("https://code.jquery.com/jquery-3.2.1.slim.min.js");
    appendScript("https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js");
    appendScript("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js");
  }

  render() { 
    return (
      <React.Fragment>
      <div class="merchant-profile-page">
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

        <div class="merchant-profile-content">
            {/*<!-- bagian top atau untuk pilih opsi shop profile dll -->*/}
            <div class="top-side-merchant-profile">
                <h3>More About Your Shop</h3>
                <div class="merchant-profile-option-bar">
                    <a class="active">
                        <h4>Shop Profile</h4>
                        <hr id="horizontal-line-transaction"/>
                    </a>
    
                    <a>
                        <h4 >Shop Address</h4>
                        <hr id="horizontal-line-transaction"/>
                    </a>                    
                </div>
            </div>

            {/*<!-- bagin dimana user / seller bisa input data toko -->*/}
            <div class="merch-profile-content">
                <h4>Shop Profile</h4>
                <hr id="horizontal-line-transaction-active"/>

                <div class="merchant-input">
                    {/*<!-- untuk edit bagian profile image -->*/}
                    <div class="merchant-profile-insight" >
                        <img class="header-merch-profile-image" src="./header-def-img.png"/>
                        <h7>Change Header</h7>

                        <div class="merch-profile-image">
                            <img src="./header-def-img.png"/>
                            <a></a>
                        </div>


                        <div class ="merch-profile-insight-data">
                            <h5 class="merchant-shop-name">Bata Shop</h5>
                            <p class="join-date">Join in 20 Oct 2020</p>
                            
                            <div class="insight">
                                <div class="total-product">
                                    <P>Total Product</P>
                                    <h5>150 Products</h5>
                                </div>

                                <div class="total-follower">
                                    <P>Total Followers</P>
                                    <h5>157 Followers</h5>
                                </div>

                                <div class="response-time">
                                    <P>Response Time</P>
                                    <h5>Under an hour</h5>
                                </div>

                                <div class="rating">
                                    <P>Rating</P>
                                    <span>
                                        <h5>5 / 5</h5>
                                        <img src="./star-icon.png"/>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div class="merchant-profile-data">
                        <div class="data merchant-profile-name">
                            <p>Shop Name</p>
                            <p>Bata Shop</p>
                            <p id="change-button">Change</p>
                        </div>

                        <div class="data domain">
                            <p>Domain</p>
                            <p>www.bank-sinarmasmarket.com /</p>
                            <input id="domain-input"/>
                        </div>

                        <div class="data">
                            <p>Slogan</p>
                            <input/> 
                        </div>

                        <div class="data merchant-desc">
                            <p>Description</p>
                            <textarea placeholder="Type your shop description"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div class="merch-address-content">
                {/*<!-- bagian pertama atau tulisan judul -->*/}
                <h4>User Address</h4>
                <hr id="horizontal-line-transaction-active"/>

                {/*<!-- alamat pertama atau yang jadi default adress -->*/}
                <div class="default-address">

                    <div class="top-bar-address">
                        <div class="title">
                            <h5>Alamat Rumah</h5>
                            <hr id="horizontal-line-transaction-active"/>
                        </div>

                        <h5 class="address-status">Default Address</h5>

                        <div class="address-option">
                            <p>Edit Address</p>
                            <p>Delete</p>
                        </div>
                    </div>

                    <div class="address-detail-profile">
                        <span class="name-address">
                            <p>Name</p>
                            <p>Kevin Hendrawan</p>
                        </span>

                        <span>
                            <p>Address</p>
                            <div class="buyer-address-detail">
                                <p>Jalan Kemanggisan Raya No 6B, RT 012/005</p>
                                <p>Kemanggisan, Jakarta Barat</p>
                                <p>DKI Jakarta, 10610</p>
                                <p>Indonesia</p>
                            </div>
                        </span>

                        <span>
                            <p>Phone Number</p>
                            <p>089389738322</p>
                        </span>
                    </div>
                </div>

                {/*<!-- alamat kedua atau yang jadi opsi -->*/}
                <div class="second-address">
                    <div class="top-bar-address">
                        <div class="title">
                            <h5>Alamat Gudang</h5>
                            <hr id="horizontal-line-transaction-active"/>
                        </div>

                        <div class="address-option">
                            <p>Set As Default</p>
                            <p>Edit Address</p>
                            <p>Delete</p>
                        </div>
                    </div>

                    <div class="address-detail-profile">
                        <span class="name-address">
                            <p>Name</p>
                            <p>Kevin Hendrawan</p>
                        </span>

                        <span>
                            <p>Address</p>
                            <div class="buyer-address-detail">
                                <p>Jalan Kemanggisan Raya No 10, RT 02/005</p>
                                <p>Kemanggisan, Jakarta Barat</p>
                                <p>DKI Jakarta, 10610</p>
                                <p>Indonesia</p>
                            </div>
                        </span>

                        <span>
                            <p>Phone Number</p>
                            <p>089389738322</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
      </div>
      </React.Fragment>
            
    );
  }
}
 
export default MerchantProfile;