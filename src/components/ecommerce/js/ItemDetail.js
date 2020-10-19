import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getItemDetail } from "../../../actions/catalogActions";
import { addToCart } from "../../../actions/cartActions";
import { Button } from "reactstrap";
import "../css/ItemDetail.css";

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  componentDidMount() {
    const { productID } = this.props.location.state;
    this.props.getItemDetail(productID);
  }

  addProductToCart(productID) {
    const userID = this.props.user.user.id;
    const orderNum = {
      orderIdentifier: this.props.user.user.trackOrder,
    };
    console.log(this.props.history);
    this.props.addToCart(productID, userID, orderNum, this.props.history);
  }

  render() {
    const { itemDetail } = this.props.itemDetail;
    return (
      <React.Fragment>
        <div className="test">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="picture"></div>
          <div className="productName">{itemDetail.productName}</div>
          <div className="productPrice">{itemDetail.productPrice}</div>
          <div className="productStock">{itemDetail.productStock}</div>
          <div className="proudctDescription">
            {itemDetail.productDescription}
          </div>
          <Link to="/cart">
            <Button
              onClick={() => {
                this.addProductToCart(itemDetail.product_id);
              }}
            >
              Add to Cart
            </Button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

ItemDetail.propTypes = {
  getItemDetail: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  itemDetail: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  itemDetail: state.ecommerce,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getItemDetail: (productID) => {
      dispatch(getItemDetail(productID));
    },
    addToCart: (productID, userID, orderNum, history) => {
      dispatch(addToCart(productID, userID, orderNum, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
