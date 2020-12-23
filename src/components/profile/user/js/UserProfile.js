import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserData } from "../../../../actions/userActions";
import appendScript from "../../../../utils/appendScript";
import "../css/UserProfile/UserProfile.css";
import { Route, Switch, NavLink } from 'react-router-dom'
import UserProfileData from "./UserProfileData";
import UserAddress from "./UserAddress";
import SecuredRoute from "../../../../securuityUtils/securedRoute";

class UserProfile extends Component {
  componentDidMount() {
    this.props.getUserData(this.props.user.user.id);
  }

  render() {
    const { user } = this.props.user;
    const parentPath  = this.props.match.path;
    const tabsData = [
      {
        label: "User Profile",
        path: parentPath+"/data",
        content: (<div className="tab-content">
          <UserProfileData/>
        </div>),
        defaultTab: true
      },
      {
        label: "User Address",
        path: parentPath+"/address",
        content: (<div className="tab-content">
          <UserAddress/>
        </div>),
      }
    ]

    return (
      <React.Fragment>
        <div class="user-profile-page">
          {/*<!-- bagian filter untuk user -->*/}
          <div class="filter-side-user">

              {/*<!-- bagian user-profile -->*/}
              <div class="user-profile">
                  <img src={require("../css/UserProfile/def-icon.png")}/>
                  <span>
                      <h3>{user.username}</h3>
                      <p>Verified Account</p>
                  </span>
              </div>

              <hr/>

              {/*<!-- opsi untuk user -->*/}
              <div class="filter-user-option">
                  <div class="option">
                      <img src={require("../css/UserProfile/profile-icon.png")}/>
                      <h4>Your Account</h4>
                  </div>
      
                  <div class="option">
                      <img src={require("../css/UserProfile/order-icon.png")}/>
                      <h4>Transaction</h4>
                  </div>
              </div>

          </div>

          <div class="profile-content">
              {/*<!-- bagian top atau untuk pilih option user profile, address, set password dll -->*/}
              <div class="top-side-profile">
                  <h3>Maintain Your Profile</h3>

                  <div class="profile-option-bar">
                    {tabsData.map((data, i) => {
                      return (
                          <NavLink
                          style={{ textDecoration: 'none' }}
                          key={i}
                          to={data.path}
                          activeClassName="active"
                          isActive={(match, location) =>
                              data.defaultTab
                              ? [parentPath, data.path].includes(location.pathname)
                              : [data.path].includes(location.pathname)
                          }
                          >
                          <h4>{data.label}</h4>
                          <hr id="horizontal-line-transaction"/>
                          </NavLink>
                      );
                  })} 
                  </div>
              </div>

              {/*<!-- ini konten setelah top side, semua perubahan biodata ada di bagian ini -->*/}
              <div>
                <Switch>
                  {tabsData.map((data, i) => {
                    return (
                      <SecuredRoute 
                        key={i}
                        component={() => data.content} 
                        exact 
                        path={
                          data.defaultTab
                          ? [parentPath, data.path]
                          : [data.path]
                          }
                        />
                      );
                   })}
                </Switch>
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
