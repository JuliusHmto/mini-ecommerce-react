import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../../../../actions/userActions.js";
import "../css/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.user.validToken) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.validToken) {
      this.props.history.push("/home");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const LoginRequest = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.login(LoginRequest, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <div className="login-page">
          <div className="side">
            <Link to="/" data-abc="true">
              <img
                className="logoHero"
                src={require("../../../layout/images/header/logoXYZ.png")}
                alt=""
              ></img>
              {/*<img
                className="logoHero"
                src={require("../../../layout/images/header/logo.png")}
                alt=""
              ></img>*/}

            </Link>
            <div class="Hero">         
              <img src={require("../../../layout/images/dummy/HeroImg.png")} alt=""/>
            </div>

            <div class="quotes">
                <h1><i>"Be a man of integrity, be responsible to your family, job, and society."</i></h1>
                {/*<h2>Eka Tjipta - Founder Sinarmas Group</h2>*/}
                <h2>XXX - YYY ZZZ</h2>
            </div>
          </div>

          <div className="sign-in-content">
          <Link to="/" data-abc="true">
              <img
                className="backLogo"
                src={require("../../../layout/images/dummy/back-arrow (2).png")}
                alt=""
              ></img>

            </Link>
            <div className="input">
              <h1 id="welcome-text">Welcome to <span>XYZ</span> Market</h1>
              {/*<h1 id="welcome-text">Welcome to <span>Sinarmas</span> Market</h1>*/}
              <h2>This day will be a great day</h2>
              <form>
                <div className="email">
                  <input
                    type="email"
                    className={classnames(" form-control form-control-lg", {
                      "is-invalid": errors.email,
                    })}
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange} 
                    placeholder="Enter your username or email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback-signin">{errors.email}</div>
                    )}
                </div>

                <div className="password">
                  <input
                    type="password"
                    className={classnames(" form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    placeholder="Enter your password"
                    />
                  {errors.password && (
                    <div className="invalid-feedback-signin">{errors.password}</div>
                    )}
                </div>
                <br />
                <div className="sign-in-button">
                  <button
                    type="submit"
                    onClick={this.onSubmit}
                    >
                    Login
                  </button>
                </div>
                <div class="sign-up-button">
                  <p>Don't have an account?&nbsp;
                  <Link to="/register">Sign Up</Link> Now</p>
                </div>
              </form>
            </div>
          </div>

          <div className="footer-log">
            <div class="contactSI">
              <h2>XYZ Care</h2>
              <p>&nbsp; &nbsp; Contact or Email Us on   
                  <div class="phonenumberSI">
                      <p> - 1500XXX</p>
                      <p> - (021) XXX YYYY</p>
                  </div>
                  <a href="">xyz-help@bank.com</a>       
              </p>
              {/*<p>&nbsp; &nbsp; Contact or Email Us on   
                  <div class="phonenumberSI">
                      <p> - 1500153</p>
                      <p> - (021) 501 88888</p>
                  </div>
                  <a href="mailto:sinarmas-help@bank.com">sinarmas-help@bank.com</a>       
              </p>*/}
            </div>
            
            <div class="findUsSI">
              <div class="socialmediacontact">
                <h2 class="findusText">Find us on</h2>
                <div className="socialMediaIcon">
                  <a href="www.facebook.com" target="new">
                    <img
                      className="facebookIcon"
                      src={require("../../../layout/images/footer/facebook.png")}
                      alt=""
                    ></img>
                  </a>
                  <a href="www.twitter.com" target="new">
                    <img
                      className="twitterIcon"
                      src={require("../../../layout/images/footer/twitter.png")}
                      alt=""
                    ></img>
                  </a>
                  <a href="www.instagram.com" target="new">
                    <img
                      className="instagramIcon"
                      src={require("../../../layout/images/footer/instagram.png")}
                      alt=""
                    ></img>
                  </a>
                  <a href="www.youtube.com" target="new">
                    <img
                      className="youtubeIcon"
                      src={require("../../../layout/images/footer/youtube.png")}
                      alt=""
                    ></img>
                  </a>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors,
});

export default connect(mapStateToProps, { login })(Login);
