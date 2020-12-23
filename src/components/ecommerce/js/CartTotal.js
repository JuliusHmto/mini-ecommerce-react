import React, { Component } from "react";
import "../css/CartStyle.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { checkOut, getTotal } from "../../../actions/cartActions";

class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  checkoutItems(){
    this.props.checkOut(this.props.history);
  }

  render() {
    const { currTotal } = this.props;

    return (
      <React.Fragment>
        <div className="order-summaryy">
          <h5 id="order-summary-titlee">Order Summary</h5>
          <hr></hr>
            <div className="total-price-summaryy">
              <h5>Sub-Total</h5>
              <span>
                <h6>Items ({currTotal.total_item})</h6>
                <h6><b>Rp. {currTotal.total_price}</b></h6>
              </span>
              <button><h6>Add Promo Code or Voucher</h6></button>
            </div>

            <button className="checkout-buttonn"
            onClick={() => {
            this.checkoutItems();}}
            >
              <h6>Check Out</h6>
            </button>
        </div>
      </React.Fragment>
    );
  }
}
CartContainer.propTypes = {
  user: PropTypes.object,
  errors: PropTypes.object,
  total: PropTypes.object
};

const mapStateToProps = (state) => ({
  total: state.total,
  user: state.user,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getTotal: (userID) => {
      dispatch(getTotal(userID));
    },
    checkOut: (history) => {
      dispatch(checkOut(history));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartContainer)
);
