import React, { Component } from "react";
import "../css/MerchantTransaction/MerchantTransaction.css"
import PropTypes from "prop-types";
import { connect } from "react-redux";

class MerchantTransactionItem extends Component {
  
  render() {
    const {order} = this.props;
    const orders = order.cart_detail.map((order) => {
      return (
        <div class="transaction-product" key={order.cart_id}>
          <div class="transaction-product-detail">
            <img class="product-image-transaction" src={order.p_filePath}/>
  
            <span class="product-detail-transaction">
              <h5>{order.p_name}</h5>
              <h6>Rp. {order.p_price} ,-</h6>
            </span>
  
            <span class="quantity-transaction">
              <h5>{order.quantity} Pcs</h5>
            </span>
                      
            <span class="subtotal-transaction">
              <p>Sub-Total</p>
              <h5>Rp. {order.total_price} ,-</h5>
            </span>
          </div>
        </div>
      );
    })
  
    return (
      <React.Fragment>
        <div class="content-side-transaction">
          <div class="transaction">
            <div class="transaction-order-detail">
              <div class="seller-column">
                <p>Sold By</p>
                    <h6 id="seller-name-transaction">{order.merchantName}</h6>
              </div>
  
              <div>
                <p>Invoice no</p>
                  <h6>{order.id}</h6>
              </div>
  
              <div>
                <p>Order Date</p>
                <h6>{order.created_at}</h6> 
              </div>
  
              <div>
                <p>Status</p>
                <h6>{order.status} <span class="respond-time">24 Hours</span></h6>
              </div>
  
              <div class="dropdown">
                <button class="order-detail-button dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Respond Order</button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">Accept Order</a>
                  <a class="dropdown-item" href="#">Reject Order</a>
                </div>
              </div>
            </div>
  
            {orders}
  
            <hr/>
  
            <div class="price-transaction-detail">
              <div class="total-price-summary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                <p>Order Total </p>
                            
                <span>
                  <h5>Rp. {order.total_price} ,- </h5>
                  <img src={require("../css/MerchantTransaction/u0.png")}/>
                </span>
              </div>
  
              <div class="collapse" id="collapseExample">
                <div class="total-item-price-summary-transaction">
                  <p>Item Price ( 2 pcs )</p>
                  <p>Rp.4,800,000</p>
                </div>
                <div class="total-shipping-price-summary-transaction">
                  <p>Shipping ( 2 kgs )</p>
                  <p>Rp.50,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
      );
      }
    }

MerchantTransactionItem.propTypes = {
  user: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  transactions: state.transaction,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantTransactionItem);