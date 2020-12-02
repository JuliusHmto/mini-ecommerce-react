import React, { Component } from "react";
import "../css/TransactionStatus/TransactionStatus.css"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, NavLink } from 'react-router-dom'
import appendScript from "../../../utils/appendScript";
import TransactionStatusItem from "../js/TransactionStatusItem";


class TransactionStatus extends Component {
  componentDidMount() {
    appendScript("https://code.jquery.com/jquery-3.2.1.slim.min.js");
    appendScript("https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js");
    appendScript("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js");
  }


  render() {

    const parentPath  = this.props.match.path;

    const tabsData = [
        {
          label: "All Transactions",
          path: parentPath+"/all",
          content: (<div className="tab-content">
            <h2>All</h2>
            <TransactionStatusItem/>
          </div>),
          defaultTab: true
        },
        {
          label: "Need to Pay",
          path: parentPath+"/pay",
          content: (<div className="tab-content">
            <h2>Pay</h2>
            <TransactionStatusItem/>
          </div>),
        },
        {
          label: "Need Confirmation",
          path: parentPath+"/confirmation",
          content: (<div className="tab-content">
            <h2>Confirmation</h2>
            <TransactionStatusItem/>
          </div>),
        },
        {
            label: "Processed",
            path: parentPath+"/processed",
            content: (<div className="tab-content">
              <h2>Processed</h2>
              <TransactionStatusItem/>
            </div>),
          },
          {
            label: "Shipped",
            path: parentPath+"/shipped",
            content: (<div className="tab-content">
              <h2>Shipped</h2>
              <TransactionStatusItem/>
            </div>),
          },
          {
            label: "Finished",
            path: parentPath+"/finished",
            content: (<div className="tab-content">
              <h2>Finished</h2>
              <TransactionStatusItem/>
            </div>),
          }
      ] 

    return (
        <React.Fragment>
            <div className ="user-transaction-page">
            {/*<!-- bagian filter untuk user -->*/}
            <div className ="filter-side-user">

                {/*<!-- bagian user-profile -->*/}
                <div className ="user-profile">
                    <img src={require("../css/TransactionStatus/def-icon.png")}/>
                    <span>
                        <h3>Kevin Wijaya</h3>
                        <p>Verified Account</p>
                    </span>
                </div>

                <hr/>

                {/*<!-- opsi untuk user -->}*/}
                <div className ="filter-user-option">
                    <div className ="option">
                        <img src={require("../css/TransactionStatus/user-profile-icon.png")}/>
                        <h4>Your Account</h4>
                    </div>
        
                    <div className ="option">
                        <img src={require("../css/TransactionStatus/user-order-icon.png")}/>
                        <h4>Transaction</h4>
                    </div>
        
                    <div className ="option">
                        <img src={require("../css/TransactionStatus/user-wishlist-icon.png")}/>
                        <h4>Wishlist</h4>
                    </div>
                </div>

            </div>

            <div className ="transaction-content">
                <div className ="top-side-transaction">
                    <h3>Maintain Your Transaction</h3>
                    <div className ="transaction-status-bar">
                        {tabsData.map((data, i) => {
                            return (
                                <NavLink
                                key={i}
                                to={data.path}
                                activeClassName="active"
                                isActive={(match, location) =>
                                    data.defaultTab
                                    ? [parentPath, data.path].includes(location.pathname)
                                    : [data.path].includes(location.pathname)
                                }
                                >
                                <h4>{data.label}</h4>
                                <hr id="horizontal-line-transaction"/>
                                </NavLink>
                            );
                        })}
                    </div>
                </div>

                <div className ="filter-side-transaction">
                    <h6>Filter</h6>
                    <div className ="filter-content">

                        {/*<!-- filter tanggal -->*/}
                        <div className ="transaction-date-filter">
                            <div className ="min-date">
                                <p>From</p>
                                <input/>
                            </div>

                            <h5 className ="divider-date">-</h5>

                            <div className ="max-date">
                                <p>To</p>
                                <input/>
                            </div>
                        </div>

                        <div className ="transaction-sort-filter">
                            <p>Sort by</p>
                            <div className ="dropdown show">
                                <a className ="dropdown-toggle dropdown-transaction" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Sort Transaction
                                </a>
                            
                                <div className ="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a className ="dropdown-item" href="#">Newest</a>
                                <a className ="dropdown-item" href="#">.....</a>
                                <a className ="dropdown-item" href="#">....</a>
                                </div>
                            </div>
                        </div>

                        <div className ="search-transaction-filter">
                            <p>Find Transaction</p>
                            <input placeholder="Type product, invoice, or seller name"/>
                        </div>
                    </div>
                </div>

                {/*TransactionStatusItem*/ }
                <div>
                    <Switch>
                        {tabsData.map((data, i) => {
                        return (
                            <Route 
                            key={i}
                            component={() => data.content} 
                            exact 
                            path={
                                data.defaultTab
                                ? [parentPath, data.path]
                                : [data.path]
                            }
                            />
                        );
                        })}
                    </Switch>
                </div>
                
            </div>
        </div>
        </React.Fragment>
        );
  }
}

TransactionStatus.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionStatus);
