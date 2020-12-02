import React, { Component } from "react";
import "../css/TransactionItem/TransactionItem.css"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import appendScript from "../../../utils/appendScript";

class TransactionStatusItem extends Component {
    componentDidMount() {
      appendScript("https://code.jquery.com/jquery-3.2.1.slim.min.js");
      appendScript("https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js");
      appendScript("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js");
    }
  
  
    render() {
        return (
            <React.Fragment>
            <div class="content-side-transaction">
                <div class="transaction">
                    <div class="transaction-order-detail">
                        <div class="seller-column">
                            <p>Sold By</p>
                            <h6 id="seller-name-transaction">Toko-SneakersKu</h6>
                        </div>

                        <div>
                            <p>Invoice no</p>
                            <h6>13413432423</h6>
                        </div>

                        <div>
                            <p>Order Date</p>
                            <h6>20 Aug 2020</h6> 
                        </div>

                        <div>
                            <p>Status</p>
                            <h6>Awaiting Payment</h6>
                        </div>

                        <button class="order-detail-button">Order Detail</button>
                    </div>

                    <div class="transaction-product">
                        <div class="transaction-product-detail">
                            <img class="product-image-transaction" src="../../../layout/images/dummy/example-image.jpg"/>

                            <span class="product-detail-transaction">
                                <h5>Nike Air Jordan Retro 12"FIBA White/University Red</h5>
                                <h6>Rp.2,400,000</h6>
                            </span>

                            <span class="quantity-transaction">
                                <h5>2 Pcs</h5>
                            </span>
                            
                            <span class="subtotal-transaction">
                                <p>Sub-Total</p>
                                <h5>Rp.4,800,000</h5>
                            </span>
                        </div>

                        <hr/>

                        <div class="price-transaction-detail">
                            <div class="total-price-summary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                <p>Order Total </p>
                                
                                <span>
                                    <h5>Rp.4,850,000,- </h5>
                                    <img src="./u0.png"/>
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