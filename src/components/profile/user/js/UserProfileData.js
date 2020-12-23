import React, { Component } from "react";
import "../css/UserProfile/UserProfile.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import appendScript from "../../../../utils/appendScript";

class UserProfileData extends Component {
  componentDidMount() {
    appendScript("https://code.jquery.com/jquery-3.2.1.slim.min.js");
    appendScript("https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js");
    appendScript("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js");
  }  
  render() {
    const { user } = this.props.user;

    return (
      <React.Fragment>
        <div class="user-profile-content">
        {/*<!-- bagian pertama atau user profile -->*/}
          <h4>User Profile</h4>
          <hr id="horizontal-line-transaction-active"/>
          {/*<!-- untuk edit bagian profile image -->*/}
            <div class="user-profile-input">
              <div class="image-input">
                <img src={require("../css/UserProfile/def-icon.png")}/>
                <a></a>
              </div>  
              <div class="profile-name">
                <h3>{user.username}</h3>
                <p>Verified Account</p>
              </div>           
            </div>
            {/*<!-- untuk edit bagian nama dll -->*/}
            <div class="user-profile-input-2">
              <div class="input">
                <p id="text-format-profile">Username</p>
                <p id="text-content-profile">{user.username}</p>
              </div>

              <div class="input">
                <p id="text-format-profile">Name</p>
                <input class="box-for-name" placeholder={user.username}></input>
              </div>
              
              <div class="input">
                <p id="text-format-profile">Email</p>
                <p id="text-content-profile">{user.email}</p>
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
            </div>
        </div>
        </React.Fragment>
        );
    }
  }

  UserProfileData.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileData);