import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserData } from "../../../../actions/userActions";
import { getMerchant } from "../../../../actions/merchantActions";

class UserProfile extends Component {
  componentDidMount() {
    this.props.getUserData(this.props.user.user.id);
    this.props.getMerchant(this.props.merchant.merchant.id);
  }

  render() {
    const { user } = this.props.user;

    return (
      <React.Fragment>
        <div class="user-profile-page">
          {/*<!-- bagian filter untuk user -->*/}
          <div class="filter-side-user">

              {/*<!-- bagian user-profile -->*/}
              <div class="user-profile">
                  <img src="./def-icon.png"/>
                  <span>
                      <h3>Kevin Wijaya</h3>
                      <p>Verified Account</p>
                  </span>
              </div>

              <hr/>

              {/*<!-- opsi untuk user -->*/}
              <div class="filter-user-option">
                  <div class="option">
                      <img src="./profile-icon.png"/>
                      <h4>Your Account</h4>
                  </div>
      
                  <div class="option">
                      <img src="./order-icon.png"/>
                      <h4>Transaction</h4>
                  </div>
      
                  <div class="option">
                      <img src="./wishlist-icon.png"/>
                      <h4>Wishlist</h4>
                  </div>

                  <div class="option">
                      <img src="./wishlist-icon.png"/>
                      <h4>Wishlist</h4>
                  </div>

                  <div class="option">
                      <img src="./wishlist-icon.png"/>
                      <h4>Wishlist</h4>
                  </div>

                  <div class="option">
                      <img src="./wishlist-icon.png"/>
                      <h4>Wishlist</h4>
                  </div>
              </div>

          </div>

          <div class="profile-content">
              {/*<!-- bagian top atau untuk pilih option user profile, address, set password dll -->*/}
              <div class="top-side-profile">
                  <h3>Maintain Your Profile</h3>

                  <div class="profile-option-bar">
                      <a class="active">
                          <h4>User Profile</h4>
                          <hr id="horizontal-line-transaction"/>
                      </a>
      
                      <a>
                          <h4>User Address</h4>
                          <hr id="horizontal-line-transaction"/>
                      </a>                    
                      
                      <a>
                          <h4>Set Password</h4>
                          <hr id="horizontal-line-transaction"/>
                      </a> 
                  </div>
              </div>

              {/*<!-- ini konten setelah top side, semua perubahan biodata ada di bagian ini -->*/}
              <div class="user-profile-content">
              {/*<!-- bagian pertama atau user profile -->*/}
                  <h4>User Profile</h4>
                  <hr id="horizontal-line-transaction-active"/>

                  {/*<!-- untuk edit bagian profile image -->*/}
                  <div class="user-profile-input">
                      <div class="image-input">
                          <img src="./def-icon.png"/>
                          <a></a>
                      </div>  

                      <div class="profile-name">
                          <h3>Kevin Wijaya</h3>
                          <p>Verified Account</p>
                      </div>           
                  </div>

                  {/*<!-- untuk edit bagian nama dll -->*/}
                  <div class="user-profile-input-2">
                      <div class="input">
                          <p id="text-format-profile">Username</p>
                          <p id="text-content-profile">Kevin_Wijaya</p>
                      </div>

                      <div class="input">
                          <p id="text-format-profile">Name</p>
                          <input class="box-for-name" placeholder="Kevin Wijaya"></input>
                      </div>

                      <div class="input">
                          <p id="text-format-profile">Email</p>
                          <p id="text-content-profile">kevinwijaya@gmail.com</p>
                          <a>Change Email</a>
                      </div>

                      <div class="input">
                          <p id="text-format-profile">Phone Number</p>
                          <p id="text-content-profile">089234234324</p>
                          <a>Change Number</a>
                      </div>

                      <div class="input">
                          <p id="text-format-profile">Gender</p>
                          <input type="radio" id="male gender-radio-button" name="gender" value="male"></input><p for="male" id="option-1-gender">Male</p>
                          <input type="radio" id="female gender-radio-button" name="gender" value="female"></input><p for="female">Female</p>
                      </div>

                      <div class="input">
                          <p id="text-format-profile">Birthdate</p>
                          <select name="DOBDay">
                              <option>Day</option>

                          </select>

                          <select name="DOBMonth">
                              <option>Month</option>
                          </select>

                          <select name="DOBYear">
                              <option>Year</option>
                          </select>
                      </div>
                  </div>
              </div>

              {/*<!-- bagian kedua atau user address -->*/}
              <div class="user-address-content">
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
                              <h5>Alamat Kantor</h5>
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

              {/*<!-- bagian ketiga atau set password -->*/}
              <div class="user-password-content">
                  {/*<!-- bagian judul -->*/}
                  <h4>Set Password</h4>
                  <hr id="horizontal-line-transaction-active"/>
                  
                  {/*<!-- bagian yang buat isi" -->*/}
                  <div class="password-input-content">
                      <span>
                          <p id="text-format-profile">Old Password</p>
                          <input></input>
                      </span>

                      <span>
                          <p id="text-format-profile">New Password</p>
                          <input></input>
                      </span>

                      <span>
                          <p id="text-format-profile">Confirm Password</p>
                          <input></input>
                      </span>
                  </div>

                  <button>Save Password</button>
              </div>
          </div>
      </div>
      </React.Fragment>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: (id) => {
      dispatch(getUserData(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
