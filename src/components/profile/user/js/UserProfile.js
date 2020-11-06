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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
        <form>
          <button>Edit Profile</button>
          <br/>
          <p>{user.username}</p>
          <br />
          <p>{user.email}</p>
        </form>
      </React.Fragment>
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  merchant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  merchant: state.merchant,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: (id) => {
      dispatch(getUserData(id));
    },
    getMerchant: (id) => {
      dispatch(getMerchant(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
