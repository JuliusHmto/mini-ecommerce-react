import React, { Component } from "react";
import "../css/TransactionItem/TransactionItem.css"
import PropTypes from "prop-types";
import { connect } from "react-redux";

class TransactionStatusItem extends Component {
     
render() {
  const {transaction} = this.props;
  const trxItems = transaction.cart_detail.map((trxItem) => {
    return (
      <div class="transaction-product" key={trxItem.cart_id}>
        <div class="transaction-product-detail">
          <img class="product-image-transaction" src={trxItem.p_filePath}/>

          <span class="product-detail-transaction">
            <h5>{trxItem.p_name}</h5>
            <h6>Rp. {trxItem.p_price} ,-</h6>
          </span>

          <span class="quantity-transaction">
            <h5>{trxItem.quantity} Pcs</h5>
          </span>
                    
          <span class="subtotal-transaction">
            <p>Sub-Total</p>
            <h5>Rp. {trxItem.total_price} ,-</h5>
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
                  <h6 id="seller-name-transaction">{transaction.merchantName}</h6>
            </div>

            <div>
              <p>Invoice no</p>
                <h6>{transaction.id}</h6>
            </div>

            <div>
              <p>Order Date</p>
              <h6>{transaction.created_at}</h6> 
            </div>

            <div>
              <p>Status</p>
              <h6>{transaction.status}</h6>
            </div>
          </div>

          {trxItems}

          <hr/>

          <div class="price-transaction-detail">
            <div class="total-price-summary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
              <p>Order Total </p>
                          
              <span>
                <h5>Rp. {transaction.total_price},- </h5>
                <img src={require("../css/TransactionStatus/u0.png")}/>
              </span>
            </div>

            <div class="collapse" id="collapseExample">
              <div class="total-item-price-summary-transaction">
                <p>Item Price ( {transaction.total_item} pcs )</p>
                <p>Rp. {transaction.total_price},-</p>
              </div>
              <div class="total-shipping-price-summary-transaction">
                <p>Shipping</p>
                <p>Rp. 50,000,-</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
    );
    }
  }

TransactionStatusItem.propTypes = {
    user: PropTypes.object.isRequired,
    transactions: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionStatusItem);