import React, { Component } from "react";
import "./App.css";
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import store from "./store";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securuityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
//import SecuredRoute from "./securuityUtils/securedRoute";

//header footer
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

//import public route
import Landing from "./components/layout/Landing";

//import user e-commerce
import Catalog from "./components/ecommerce/js/Catalog";
import ItemDetail from "./components/ecommerce/js/ItemDetail";
import CartContainer from "./components/ecommerce/js/CartContainer";
import Invoice from "./components/ecommerce/js/Invoice";
import UserProfile from "./components/profile/user/js/UserProfile";

//import user profile
import Register from "./components/profile/user/js/Register";
import Login from "./components/profile/user/js/Login";
import { logout } from "./actions/userActions";

//import merchants
import RegisterMerchant from "./components/profile/merchant/js/RegisterMerchant";
import MerchantCatalog from "./components/profile/merchant/js/MerchantCatalog";
import AddProduct from "./components/profile/merchant/js/AddProduct";
import EditProduct from "./components/profile/merchant/js/EditProduct";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/home";
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: "",
    };
  }

  handleSearchData = (search) => {
    this.setState({ searchValue: search });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Header passSearchData={this.handleSearchData} />
          <div className="body">
            {
              //Public Routes
            }
            <Switch>
            <Route
                exact
                path="/"
                render={(props) => (
                  <Landing {...props} searchValue={this.state.searchValue} />
                )}
              />
              <Route
                exact
                path="/home"
                render={(props) => (
                  <Landing {...props} searchValue={this.state.searchValue} />
                )}
              />
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>

              {
                //Private Routes
              }

              {/*user */}
              <Route
                exact
                path="/catalog"
                render={(props) => (
                  <Catalog {...props} searchValue={this.state.searchValue} />
                )}
              />
              <Route
                exact
                path="/details/:productName"
                component={ItemDetail}
              />
              <Route exact path="/cart" component={CartContainer} />
              <Redirect exact from="/cart/reload" to="/cart" />
              <Route exact path="/invoice" component={Invoice} />
              <Route exact path="/profile/:username" component={UserProfile} />

              {/*merchant */}
              <Route
                exact
                path="/my-shop/register"
                component={RegisterMerchant}
              />
              <Route
                exact
                path="/my-shop/catalog"
                component={MerchantCatalog}
              />
              <Route exact path="/my-shop/add" component={AddProduct} />
              <Route exact path="/my-shop/edit/:id" component={EditProduct} />
            </Switch>
          </div>
          <div className="foot">
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  items: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.ecommerce,
  user: state.user,
});

export default connect(mapStateToProps)(App);
