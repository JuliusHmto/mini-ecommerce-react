import React, { Component } from "react";
import "../css/UserProfile/UserProfile.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import AddressPopup from "./AddressPopup";
import 'reactjs-popup/dist/index.css';
import { addNewAddress, loadAllAddress } from "../../../../actions/userActions";

class UserAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      address_city: "",
      address_country: "",
      address_description: "",
      address_label: "",
      address_province: "",
      address_postalCode: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitNewAddress = this.submitNewAddress.bind(this);
  }
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  modalOpen() {
    this.setState({ modal: true });
  }

  modalClose() {
    this.setState({
      modal: false
    });
  }

  componentDidMount() {
    console.log(this.props.user.user.id);
    this.props.getAddress();
  }

  submitNewAddress = (event) => {
    event.preventDefault();
    const newAddress = {
      address_label: this.state.address_label,
      address_description: this.state.address_description,
      address_city: this.state.address_city,
      address_province: this.state.address_province,
      address_country: this.state.address_country,
      address_postalCode: this.state.address_postalCode,
    };
    this.props.addNewAddress(this.props.user.user.id, newAddress);
    window.location.reload();
    this.modalClose();
  };

  render() {
    const { errors } = this.state;
    const {addresses} = this.props.address;

    return (
      <React.Fragment>
        <div class="user-address-content">
          <h4>User Address</h4>
          <hr id="horizontal-line-transaction-active"/>

      {/*<!-- alamat kedua atau yang jadi opsi -->*/}
          {addresses.map((address) => {
            return (
              <div class="second-address">
                  <div class="top-bar-address">
                      <div class="title">
                          <h5>{address.address_label}</h5>
                          <hr id="horizontal-line-transaction-active"/>
                      </div>

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
                              <p>{address.address_description}</p>
                              <p>{address.address_city}</p>
                              <p>{address.address_province + ', ' + address.address_postalCode}</p>
                              <p>{address.address_country}</p>
                          </div>
                      </span>

                      <span>
                          <p>Phone Number</p>
                          <p>089389738322</p>
                      </span>
                  </div>
              </div>
            );
          })}
          
          <div className="new-address">
            <button onClick={e => this.modalOpen(e)}> New Address </button>
            <AddressPopup show={this.state.modal} handleClose={e => this.modalClose(e)}>
              <h2>Add Address</h2>
              <div className="form-group">
                <div className="AddressLabel">
                  <p>Name</p>
                  <input
                    type="text"
                    className="form-control"
                    name="address_label"
                    onChange={this.handleChange}
                  />
                  
                </div>
                <div className="AddressDescription">
                  <p>Address</p>
                  <input
                    type="text"
                    className="form-control"
                    name="address_description"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="AddressCity">
                  <p>City</p>
                  <input
                    type="text"
                    className="form-control"
                    name="address_city"
                    onChange={this.handleChange}
                  />
                  
                </div>
                <div className="AddressProvince">
                  <p>Province</p>
                  <input
                    type="text"
                    className="form-control"
                    name="address_province"
                    onChange={this.handleChange}
                  />
                  
                </div>
                <div className="AddressCountry">
                  <p>Country</p>
                  <input
                    type="text"
                    className="form-control"
                    name="address_country"
                    onChange={this.handleChange}
                  />
                  
                </div>
                <div className="AddressPostalCode">
                  <p>Postal Code</p>
                  <input
                    type="text"
                    className="form-control"
                    name="address_postalCode"
                    onChange={this.handleChange}
                  />
                  
                </div>
              </div>
              <div className="form-group">
                <Link to={'/profile/address'}>
                  <button type="button" onClick={this.submitNewAddress}>
                    Save
                  </button>
                </Link>
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAddress);