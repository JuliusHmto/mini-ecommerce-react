import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/merchantStoreButton.css";

class MerchantStoreButton extends Component {
  render() {
    const { user } = this.props;

    const userIsMerchant = (
      <div>
        <ul className="navbar-nav-acc ml-4 user-authentic merch-button">
          <li className="nav-item">
            <Link to={"/my-shop/catalog"}>
              <button>
                My Store
              </button>
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsNotMerchant = (
      <div className="be-merch-button nav-item">
        <Link to={"/my-shop/register"}>
          <button>
            Be a merchant
          </button>
        </Link>
      </div>
    );

    let merchantStore;

    if (user.hasMerchant) {
      merchantStore = userIsMerchant;
    } else {
      merchantStore = userIsNotMerchant;
    }
    return <div>{merchantStore}</div>;
  }
}

export default MerchantStoreButton;
