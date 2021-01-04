import React, { Component } from "react";
import "../css/UserProfile/UserProfile.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import AddressPopup from "./AddressPopup";
import { addNewAddress, loadAllAddress, updateAddress, deleteAddress } from "../../../../actions/userActions";

class UserAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      medol: false,
      address_id: "",
      addressCity: "",
      addressCountry: "",
      addressDescription: "",
      addressLabel: "",
      addressProvince: "",
      addressPostalCode: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitNewAddress = this.submitNewAddress.bind(this);
    this.updateCurrentAddress = this.updateCurrentAddress.bind(this);
  }
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  modalOpen() {
    this.setState({ modal: true });
  }

  modalClose() {
    this.setState({ modal: false});
  }

  closeModalWithAddress() {
    this.setState({ 
      medol: false,
      address_id: "",
      addressCity: "",
      addressCountry: "",
      addressDescription: "",
      addressLabel: "",
      addressProvince: "",
      addressPostalCode: "",
    });
  }

  componentDidMount() {
    this.props.getAddress();
  }

  submitNewAddress = (event) => {
    event.preventDefault();
    const newAddress = {
      addressLabel: this.state.addressLabel,
      addressDescription: this.state.addressDescription,
      addressCity: this.state.addressCity,
      addressProvince: this.state.addressProvince,
      addressCountry: this.state.addressCountry,
      addressPostalCode: this.state.addressPostalCode,
    };
    this.props.addNewAddress(this.props.user.user.id, newAddress);
    this.modalClose();
    window.location.reload();
  };

  updateCurrentAddress = (event) => {
    event.preventDefault();
    const updatedAddress = {
      address_id: this.state.address_id,
      addressLabel: this.state.addressLabel,
      addressDescription: this.state.addressDescription,
      addressCity: this.state.addressCity,
      addressProvince: this.state.addressProvince,
      addressCountry: this.state.addressCountry,
      addressPostalCode: this.state.addressPostalCode,
    };
    this.props.updateAddress(this.props.user.user.id, updatedAddress);
    this.closeModalWithAddress();
    window.location.reload();
  };

  removeAddress(addressID) {
    this.props.deleteAddress(addressID, this.props.history);
    window.location.reload();
  }

  render() {
    const { errors } = this.state;
    const {addresses} = this.props.address;
    const {user} = this.props.user;

    return (
      <React.Fragment>
        <div class="user-address-content">
          <h4>User Address</h4>
          <hr id="horizontal-line-transaction-active"/>

      {/*<!-- alamat kedua atau yang jadi opsi -->*/}
          {addresses.length !== 0 ? 
            addresses.map((address) => {
              return (
                <div class="second-address">
                    <div class="top-bar-address">
                        <div class="title">
                            <h5>{address.addressLabel}</h5>
                            <hr id="horizontal-line-transaction-active"/>
                        </div>
  
                        <div class="address-option">
                          <div className="new-address">
                          <div className="buttonWrapper">
                            <button className="buttonUpdateAddress" onClick={() =>
                              this.setState({
                                medol: true,
                                address_id: address.address_id,
                                addressCity: address.addressCity,
                                addressCountry: address.addressCountry,
                                addressDescription: address.addressDescription,
                                addressLabel: address.addressLabel,
                                addressProvince: address.addressProvince,
                                addressPostalCode: address.addressPostalCode,
                              })
                            }>Update</button>
                            </div>
                            <AddressPopup show={this.state.medol} handleClose={e => this.closeModalWithAddress(e)}>
                              <h2>Update Address</h2>
                              <div className="paddings">
                                <div className="form-group">
                                  <div className="detail-form">
                                    <p>Label</p>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="addressLabel"
                                      onChange={this.handleChange}
                                      placeholder={this.state.addressLabel}
                                    />
                                    
                                  </div>
                                  <div className="detail-form">
                                    <p>Address</p>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="addressDescription"
                                      onChange={this.handleChange}
                                      placeholder={this.state.addressDescription}
                                    />
                                  </div>

                                  <div className="detail-form">
                                    <p>City</p>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="addressCity"
                                      onChange={this.handleChange}
                                      placeholder={this.state.addressCity}
                                    />
                                    
                                  </div>
                                  <div className="detail-form">
                                    <p>Province</p>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="addressProvince"
                                      onChange={this.handleChange}
                                      placeholder={this.state.addressProvince}
                                    />
                                    
                                  </div>
                                  <div className="detail-form">
                                    <p>Country</p>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="addressCountry"
                                      onChange={this.handleChange}
                                      placeholder={this.state.addressCountry}
                                    />
                                    
                                  </div>
                                  <div className="detail-form">
                                    <p>Postal Code</p>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="addressPostalCode"
                                      onChange={this.handleChange}
                                      placeholder={this.state.addressPostalCode}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <div className="buttonLocation">
                                  <Link to={'/profile/address'}>
                                    <button type="button" className="buttonSave" onClick={this.updateCurrentAddress}>
                                      Save
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </AddressPopup>
                          </div>
                          <div className="buttonWrapper">
                            <button className="buttonDeleteAddress" onClick={() => {this.removeAddress(address.address_id); }}>Delete</button>
                          </div>  
                        </div>
                    </div>
  
                    <div class="address-detail-profile">
                        <span class="name-address">
                            <p>Name</p>
                            <p>{user.username}</p>
                        </span>
  
                        <span>
                          <p>Address</p>
                          <div class="buyer-address-detail">
                            <p>{address.addressDescription}</p>
                            <p>{address.addressCity}</p>
                            <p>{address.addressProvince + ', ' + address.addressPostalCode}</p>
                            <p>{address.addressCountry}</p>
                          </div>
                        </span>
                    </div>
                </div>
              );
            })
            :
            <div className="emptyWrapper">
              <h2 className="emptyText">You have no addresses.</h2>  
            </div>
          }
          
          
          <div className="new-address">
            <div className="buttonWrapper">
              <button onClick={e => this.modalOpen(e)} className="buttonNewAddress"> New Address </button>
            </div>
            <AddressPopup show={this.state.modal} handleClose={e => this.modalClose(e)}>
              <h2>Add Address</h2>
              <div className="paddings">
                <div className="form-group">
                  <div className="detail-form">
                    <p>Label</p>
                    <input
                      type="text"
                      className="form-control"
                      name="addressLabel"
                      onChange={this.handleChange}
                    />
                    
                  </div>
                  <div className="detail-form">
                    <p>Address</p>
                    <input
                      type="text"
                      className="form-control"
                      name="addressDescription"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="detail-form">
                    <p>City</p>
                    <input
                      type="text"
                      className="form-control"
                      name="addressCity"
                      onChange={this.handleChange}
                    />
                    
                  </div>
                  <div className="detail-form">
                    <p>Province</p>
                    <input
                      type="text"
                      className="form-control"
                      name="addressProvince"
                      onChange={this.handleChange}
                    />
                    
                  </div>
                  <div className="detail-form">
                    <p>Country</p>
                    <input
                      type="text"
                      className="form-control"
                      name="addressCountry"
                      onChange={this.handleChange}
                    />
                    
                  </div>
                  <div className="detail-form">
                    <p>Postal Code</p>
                    <input
                      type="text"
                      className="form-control"
                      name="addressPostalCode"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="buttonLocation">
                  <Link to={'/profile/address'}>
                    <button type="button" className="buttonSave" onClick={this.submitNewAddress}>
                      Save
                    </button>
                  </Link>
                </div>
              </div>
            </AddressPopup>
          </div>
      </div>
    </React.Fragment>
    );
    }
  }

UserAddress.propTypes = {
  user: PropTypes.object,
  address: PropTypes.object,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
  address: state.address,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAddress: () => {
      dispatch(loadAllAddress());
    },
    addNewAddress: (userID, newAddress) => {
      dispatch(addNewAddress(userID, newAddress));
    },
    updateAddress: (userID, newAddress) => {
      dispatch(updateAddress(userID, newAddress));
    },
    deleteAddress: (addressID) => {
      dispatch(deleteAddress(addressID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAddress);