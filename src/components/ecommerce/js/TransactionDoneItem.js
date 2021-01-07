import React, { Component } from "react";
import "../css/TransactionItem/TransactionItemDone.css"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { finishOrder } from '../../../actions/transactionActions';
import ReactStars from "react-rating-stars-component";

class TransactionDoneItem extends Component {
  constructor(props) {
    super(props);
    this.ratingChanged = this.ratingChanged.bind(this);
  }
     
  ratingChanged = (newRating) => {
    console.log(newRating);
  };

  finishTransaction(orderID, status){
    const finishStatus = {
      status: status
    }
  this.props.finishOrder(orderID, finishStatus, this.props.history);
  }

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

    const trxItemsDone = transaction.cart_detail.map((trxItem) => {
      return (
        <div className="transaction-productt" key={trxItem.cart_id}>
        
          <div className="transaction-product-detail">
            <img className="product-image-transaction" src={trxItem.p_filePath}/>

            <span className="product-detail-transaction">
              <h5>{trxItem.p_name + ' ( '+trxItem.quantity + ' pcs )'}</h5>
              <h6>Rp. {trxItem.p_price} ,-</h6>
            </span>
                      
            <span className="subtotal-transaction">
              <p>Sub-Total</p>
              <h5>Rp. {trxItem.total_price} ,-</h5>
            </span>
          </div>

          <div className="rating-comment">
          <ReactStars
            classNames="reactStars"
            count={5}
            onChange={this.ratingChanged}
            size={50}
            value={2.5}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
          <textarea
              name="text"
              className="inputNotes"
              placeholder="Testimonial..."
            ></textarea>
          <button className="buttonRate">Submit</button>
        </div>

        </div>
      );
    })

    return (
      <React.Fragment>
        <div className="content-side-transaction">
          <div className="transaction">
            <div className="transaction-order-detail">
              <div className="seller-column">
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
              {transaction.status ==='Process' 
              ? <button class="order-detail-button" onClick={() => this.finishTransaction(transaction.id, transaction.status)}>Finish Order</button>
              : null
            }
            </div>

            {transaction.status !== "Finished" ? trxItems : trxItemsDone}

            <hr/>

            <div className="price-transaction-detail">
              <div className="total-price-summary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                <p>Order Total </p>
                            
                <span>
                  <h5>Rp. {transaction.total_price},- </h5>
                  <img src={require("../css/TransactionStatus/u0.png")}/>
                </span>
              </div>

              <div className="collapse" id="collapseExample">
                <div className="total-item-price-summary-transaction">
                  <p>Item Price ( {transaction.total_item} pcs )</p>
                  <p>Rp. {transaction.total_price},-</p>
                </div>
                <div className="total-shipping-price-summary-transaction">
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

TransactionDoneItem.propTypes = {
    user: PropTypes.object,
    transactions: PropTypes.object,
    errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
  transactions: state.transaction,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => {
  return {
    finishOrder: (orderID, status, history) => {
      dispatch(finishOrder(orderID, status, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDoneItem);