import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MetaTags from "react-meta-tags";
import { logout } from "../../actions/userActions";
import MerchantStoreButton from "../profile/merchant/js/MerchantStoreButton";
import "./HeaderStyle.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      isOpen: false,
    };
    this.logout = this.logout.bind(this);
  }

  onChange = (event) => {
    this.setState({ search: event.target.value });
  };

  submitSearch = (event) => {
    event.preventDefault();
    console.log(this.state.search);
    this.props.passSearchData(this.state.search);
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  logout = () => {
    this.props.logout();
    window.location.href = "/";
  };

  render() {
    const { validToken, user } = this.props.user;

    const userIsNotAuthenticated = (
      <div className="navbar-button search-field">
        <ul className="navbar-nav-acc">
          <li className="nav-item-si">
            <Link to="/login" className="dropdown-item nav-link">
              Sign In
            </Link>
          </li>
          <li className="nav-item-su">
            <Link to="/register" className="dropdown-item nav-link">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsAuthenticated = (
      <div>
        <ul className="navbar-nav-acc ml-4 user-authentic">
          <li className="nav-item">
            <Link to="/invoice" className="nav-link">
              <button>
               Invoice 
              </button>
            </Link>
          </li>
          <div class="dropdown-divider"></div>
          <li className="nav-item">
            <button className="be-merch">
              <MerchantStoreButton user={user} />
            </button>
          </li>
          <div class="dropdown-divider"></div>
          <li className="nav-item logout">
            <Link to="/" className="nav-link" onClick={this.logout}>
              <button>
                Logout
              </button>
            </Link>
          </li>
        </ul>
      </div>
    );

    let headerLinks;

    if (validToken && user) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <React.Fragment>
        <MetaTags>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </MetaTags>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/home" className="navbar-brand" data-abc="true">
            <img
              className="logo"
              src={require("./images/header/logo.png")}
              alt=""
            ></img>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li>
                <div className="search-menu">
                  <input
                    className="search"
                    type="text"
                    placeholder="Search"
                    onChange={this.onChange.bind(this)}
                  />
                  <Link
                    to="/"
                    className="btn"
                    type="submit"
                    onClick={this.submitSearch.bind(this)}
                  >
                    Search
                  </Link>
                </div>
              </li>
              <li class="nav-item option">
                <Link to="/home" class="nav-link">
                  Home <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li class="nav-item option">
                <Link to="/catalog" class="nav-link">
                  Catalog
                </Link>
              </li>
              <li className="nav-item option">
                <Link to="/cart" className="nav-link">
                  Cart
                </Link>
              </li>
              <li class="nav-item dropdown option">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Your Account
                </a>
                <div
                  class="dropdown-menu account-dropdown"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {headerLinks}
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  getUserData: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
