import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { createNewUser } from "../../../../actions/userActions.js";
import "../css/Register.css"

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.user.validToken) {
      this.props.history.push("/catalog");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    this.props.createNewUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <div className="sign-up-page">
          <div className="sideSU">
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
              <div class="HeroSU">         
                <img src={require("../../../layout/images/dummy/HeroImgSU.PNG")} alt=""/>
              </div>

              <div class="quotesSU">
                  <h1><i>"Work hard in silence. Let success be your noise."</i></h1>
                  <h2>Frank Ocean</h2>
              </div>
            </div>

          <div className="sign-up-content">
            <Link to="/home" data-abc="true">
              <img
                className="backLogo"
                src={require("../../../layout/images/dummy/back-arrow (2).png")}
                alt=""
              ></img>
            </Link>
            {/*<h1 id="welcome-text">Welcome to <span>Sinarmas</span> Market</h1>*/}
            <h1 id="welcome-text">Welcome to <span>XYZ</span> Market</h1>
            <h2>Create your account by filling this form below</h2>
            <div className="usernameSU">
              <input
                type="text"
                className={classnames(" form-control form-control-lg", {
                  "is-invalid": errors.username,
                })}
                name="username"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={this.onChange}
              />
              {errors.username && (
                <div className="invalid-feedback-signup">{errors.username}</div>
              )}
            </div>

            <div className="emailSU">
              <input
                type="email"
                className={classnames(" form-control form-control-lg", {
                  "is-invalid": errors.email,
                })}
                name="email"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={this.onChange}
              />
              {errors.email && (
                <div className="invalid-feedback-signup">{errors.email}</div>
              )}
            </div>

            <div className="passwordSU">
              <input
                type="password"
                className={classnames(" form-control form-control-lg", {
                  "is-invalid": errors.password,
                })}
                name="password"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.password && (
                <div className="invalid-feedback-signup">{errors.password}</div>
              )}
            </div>

            <div className="passwordSU">
              <input
                type="password"
                className={classnames(" form-control form-control-lg", {
                  "is-invalid": errors.conofirmPassword,
                })}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onChange={this.onChange}
              />
              {errors.password && (
                <div className="invalid-feedback-signup">{errors.password}</div>
              )}
            </div>

            <p className="term-and-cond">Dengan mendaftar, Anda setuju dengan <a>Syarat dan Ketentuan dari XYZ</a> serta <a>Kebijakan Privasi</a></p>
            {/*<p className="term-and-cond">Dengan mendaftar, Anda setuju dengan <a>Syarat dan Ketentuan dari Bank Sinarmas</a> serta <a>Kebijakan Privasi</a></p>*/}

            <div>
              <button
                type="submit"
                className="sign-up-buttonSU"
                onClick={this.onSubmit}
              >
                Register
              </button>
            </div>
            <div class="sign-in-buttonSU">
              <p>Already have an account?&nbsp;
              <Link to="/register">Sign In</Link> Now</p>
            </div>
          </div>

          <div className="footer-log-SU">
            <div class="contactSI">
            <h2>XYZ Care</h2>
              <p>&nbsp; &nbsp; Contact or Email Us on   
                  <div class="phonenumberSI">
                      <p> - 1500XXX</p>
                      <p> - (021) XXX YYYY</p>
                  </div>
                  <a href="">xyz-help@bank.com</a>       
              </p>
              {/*<h2>Bank Sinarmas Care</h2>
              <p>&nbsp; &nbsp; Contact or Email Us on   
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

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.user,
});

export default connect(mapStateToProps, { createNewUser })(Register);