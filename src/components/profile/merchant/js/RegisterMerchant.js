import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { withRouter, Link } from "react-router-dom";
import { createNewMerchant } from "../../../../actions/merchantActions";
import "../css/registerMerchant.css"

class registerMerchant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      merchantName: "",
      merchantAddress: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("merchantName", this.state.merchantName);
    formData.append("merchantAddress", this.state.merchantAddress);
    this.props.createNewMerchant(
      formData,
      this.props.user.user.id,
      this.props.history
    );
  };

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <div className="register-merch-page">        
          <div className="side-reg-merch">
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
                ></img> */}
            </Link>
            <div class="hero-reg-merch">         
              <img src={require("../../../layout/images/dummy/hero3.jpg")} alt=""/>
            </div>
            <div class="quotes-reg-merch">
                <h1><i>"Be a man of integrity, be responsible to your family, job, and society."</i></h1>
                {/*<h2>Eka Tjipta - Founder Sinarmas Group</h2>*/}
                <h2>XXX - YYY ZZZ</h2>
            </div>
          </div>

          <div className="reg-merch-content">
            <Link to="/" data-abc="true">
              <img
                className="backLogo"
                src={require("../../../layout/images/dummy/back-arrow (2).png")}
                alt=""
                ></img>
            </Link>
            
            <div className="reg-merch-input">
              <h1 id="welcome-text-reg-merch">Be a <span>Our Partner</span> and <span>Merchant</span></h1>
              <h2>Start Your Dream Here and Let Us Help You Reach It</h2>
              <form>
                <div className="merch-name">
                  <input
                    type="text"
                    className={classnames(" form-control form-control-lg", {
                      "is-invalid": errors.merchantName,
                    })}
                    name="merchantName"
                    onChange={this.onChange} placeholder="Your Store Name"
                    />
                  {errors.merchantName && (
                    <div className="invalid-feedback-register">{errors.merchantName}</div>
                    )}
                </div>

                <div className="merch-address">
                  <input
                    type="textarea"
                    className={classnames(" form-control form-control-lg", {
                      "is-invalid": errors.merchantAddress,
                    })}
                    name="merchantAddress"
                    onChange={this.onChange} placeholder="Your Store Address"
                    />
                  {errors.merchantAddress && (
                    <div className="invalid-feedback">{errors.merchantAddress}</div>
                    )}
                </div>
                <br />
                <div className="reg-merch-button">
                
                    <button
                      type="submit"
                      onClick={this.onSubmit}
                      >
                      Register as Merchant
                    </button>
                  
                </div>
              </form>
            </div>
          </div>

          <div className="footer-reg-merch">
            <div class="contact-reg-merch">
              <h2>XYZ Care</h2>
              <p>&nbsp; &nbsp; Contact or Email Us on   
                  <div class="phonenumber-reg-merch">
                      <p> - 1500XXX</p>
                      <p> - (021) XXX YYYYY</p>
                  </div>
                  <a href="">xyz-help@bank.com</a>       
              </p>
              {/*<h2>Bank Sinarmas Care</h2>
              <p>&nbsp; &nbsp; Contact or Email Us on   
                  <div class="phonenumber-reg-merch">
                      <p> - 1500153</p>
                      <p> - (021) 501 88888</p>
                  </div>
                  <a href="mailto:sinarmas-help@bank.com">sinarmas-help@bank.com</a>       
              </p>*/}
            </div>

            <div class="findUs-reg-merch">
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

registerMerchant.propTypes = {
  createNewMerchant: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.user,
});

export default withRouter(
  connect(mapStateToProps, { createNewMerchant })(registerMerchant)
);
