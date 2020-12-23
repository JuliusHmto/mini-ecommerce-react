import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getCouriers, selectCourier } from "../../../actions/courierActions";
import { getCart, processOrder } from "../../../actions/cartActions";
import appendScript from "../../../utils/appendScript";
import "../css/CheckOut/CheckOut.css";

class CheckoutItem extends Component {
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

  render() { 
    const { checkoutItem } = this.props;
    const checkouttItemDetail = checkoutItem.cart_detail.map((itemDetail) =>
    {
      return(
      <div className="item-detail-checkout" key={itemDetail.cart_id}>
      <img className="item-img-checkout" src={itemDetail.p_filePath} alt="nopic"/>
      <div className="column2-checkout">
        <h4 className="item-name-checkout">{itemDetail.p_name}</h4>
        <h5 className="item-price-checkout">Rp.{itemDetail.p_price},-</h5>
        <h5 className="note-checkout">Note <span><i>Tolong dipack dengan rapih dan aman agar sampai barangnya tidak rusak</i></span></h5>
      </div>

      <div className="column3-checkout">
        <h5 className="item-weight-checkout">{itemDetail.quantity} pcs (2 kg)</h5>
      </div>

      <div className="column4-checkout">
        <h5>Rp.{itemDetail.total_price},-</h5>
      </div>
    </div>
      );
    });
    return ( 
    <React.Fragment>
      {checkouttItemDetail}
    </React.Fragment> 
    );
  }
}

CheckoutItem.propTypes = {
    getCart: PropTypes.func.isRequired,
    selectCourier: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };


const mapStateToProps = (state) => ({
    cart: state.cart,
    user: state.user,
    courier: state.courier,
    errors: state.errors
})

const mapDispatchToProps = (dispatch) => {
    return {
        getCouriers: () => {
            dispatch(getCouriers());
        },
        getCart: (userID) => {
            dispatch(getCart(userID));
        },
      selectCourier: (orderIdentifier, courierChoice, history) => {
        dispatch(selectCourier(orderIdentifier, courierChoice, history));
      },
      processOrder: (orderIdentifier, userID, cartDetail, history) => {
        dispatch(processOrder(orderIdentifier, userID, cartDetail, history));
      },
    };
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutItem));