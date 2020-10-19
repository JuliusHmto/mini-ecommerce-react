import React, { Component } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import "./FooterStyle.css";

class Footer extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <MetaTags>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </MetaTags>

        <footer className="footer">
          <div className="social-media-bar">
            <h6>Get connected with us on social networks !</h6>
            <div className="social-media-icon">
              <Link to="www.facebook.com" target="_blank">
                <img
                  className="facebookIcon"
                  src={require("./images/footer/u0.png")}
                  alt=""
                ></img>
              </Link>
              <Link to="www.twitter.com" target="_blank">
                <img
                  className="twitterIcon"
                  src={require("./images/footer/u1.png")}
                  alt=""
                ></img>
              </Link>
              <Link to="www.instagram.com" target="_blank">
                <img
                  className="igIcon"
                  src={require("./images/footer/u2.png")}
                  alt=""
                ></img>
              </Link>
              <Link to="www.youtube.com" target="_blank">
                <img
                  className="ytIcon"
                  src={require("./images/footer/u3.png")}
                  alt=""
                ></img>
              </Link>
              <Link to="www.g+.com" target="_blank">
                <img
                  className="g+Icon"
                  src={require("./images/footer/u4.png")}
                  alt=""
                ></img>
              </Link>
            </div>
          </div>

          {/* about bank */}
          <div className="footer-content">
            <div className="company-info">
              <h4>SINARMAS MARKET</h4>
              <hr className="comp-info-hr"></hr>
              <div className="provide">
                <p>by</p>
                <a href="https://www.banksinarmas.com/id/index.php" target="_blank">
                <img
                    className="logo-icon"
                    src={require("./images/header/logo.png")}
                    alt=""
                  ></img></a>
              </div>
              <img
                  className="download-icon"
                  src={require("./images/footer/download-info.png")}
                  alt=""
                ></img>
            </div>

            {/* question list */}
            <div className="question-list">
              <h4>FREQUENTLY ASKED QUESTION</h4>
              <hr className="comp-info-hr"></hr>
              <ul className="questionlist" type="none">
                <li>
                  <Link to="/">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    Transaction
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    Payment
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    Return and Refund
                  </Link>
                </li>
              </ul>
            </div>

            {/* location */}
            <div className="contact">
              <h4>CONTACT</h4>
              <hr className="comp-info-hr"></hr>
              <div className="location">
                <img
                  className="home-icon"
                  src={require("./images/merchant/HomeIcon.png")}
                  alt=""
                ></img>
                <p>
                  JL. Kiai Tapa, No. 1, RT.10/RW.10 Lower Ground D 3, Roxy Square
                  Tomang, Grogol petamburan, West Jakarta City, Jakarta 11440
                </p>                
              </div>

              <div className="mail">
                <img
                  className="mail-icon"
                  src={require("./images/merchant/OrdersIcon.png")}
                  alt=""
                ></img>
                <a href="mailto:sinarmas-help@bank.com">
                  sinarmas-help@bank.com
                </a>
              </div>

              <div className="phone">
                <h4>BANK SINARMAS CARE</h4>
                <hr className="comp-info-hr"></hr>
                  <div className="phonenumber">
                    <img
                      className="phone-icon"
                      src={require("./images/footer/u44.png")}
                      alt=""
                    ></img>
                      <p>1500153</p>
                      <p>or</p>
                      <p>(021) 501 88888</p>
                  </div>
              </div>
            </div>
          </div>

          <div className="copyright">
          <p>© 2020 Copyright :&nbsp;
          <a href="https://www.banksinarmas.com/id/index.php" target="_blank">PT Bank Sinarmas, Tbk.</a>
          &nbsp;All rights reserved.</p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
