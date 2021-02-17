import React, { Component } from "react";
import "../css/TransactionStatus/TransactionStatus.css"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Switch, NavLink, Link } from 'react-router-dom';
import TransactionDoneItem from "../js/TransactionDoneItem";
import SecuredRoute from "../../../securuityUtils/securedRoute";
import { getAllTransactions } from "../../../actions/transactionActions";

class TransactionStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
    this.sortBy = this.sortBy.bind(this);
  }

  componentDidMount() {
    this.props.getAllTransactions(this.props.user.user.id);
    
  }

  componentDidUpdate(){
    if(this.props.transactions.transactions !== this.state.transactions){
      this.setState({
        transactions: this.props.transactions.transactions
      });
    }
  }

  sortBy(e) {
    const {transactions} = this.state;
    let newTransactions = transactions;
    if(e.target.value === 'oldest'){
      newTransactions = transactions.sort((a, b) => (a.id - b.id));
    } else if(e.target.value === 'latest'){
      newTransactions = transactions.sort((a, b) => (b.id - a.id));
    } 
    this.setState({transactions: newTransactions});
  }

  render() {
    const parentPath  = this.props.match.path;
    const {transactions} = this.state;
    const {user} = this.props.user;

    const tabsData = [
        {
          label: "All Transactions",
          path: parentPath+"/all",
          content: (
            <div className="tab-content">
              {transactions.map((transaction) => {
                return <TransactionDoneItem transaction={transaction} user={user} key={transaction.id}/>
              })}
            </div>),
          defaultTab: true
        },
        {
          label: "Need Confirmation",
          path: parentPath+"/confirmation",
          content: (<div className="tab-content">
          {transactions.map((transaction) => {
            return transaction.status == "Paid"? <TransactionDoneItem transaction={transaction} user={user} key={transaction.id}/> : null
          })}
          </div>),
        },
        {
            label: "On Process",
            path: parentPath+"/process",
            content: (<div className="tab-content">
            {transactions.map((transaction) => {
              return transaction.status == "Process"? <TransactionDoneItem transaction={transaction} user={user} key={transaction.id}/> : null
            })}
            </div>),
          },
          {
            label: "Finished",
            path: parentPath+"/finished",
            content: (<div className="tab-content">
            {transactions.map((transaction) => {
              return transaction.status == "Finish"? <TransactionDoneItem transaction={transaction} user={user} key={transaction.id}/> : null
            })}
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
                        <h3>{user.username}</h3>
                        <p>Verified Account</p>
                    </span>
                </div>

                <hr/>

                {/*<!-- opsi untuk user -->}*/}
                <div className ="filter-user-option">
                    <div className ="option">
                        <img src={require("../css/TransactionStatus/user-profile-icon.png")}/>
                        <Link to={'/profile'}><h4>Your Account</h4></Link>
                    </div>
        
                    <div className ="option">
                        <img src={require("../css/TransactionStatus/user-order-icon.png")}/>
                        <Link to={'/transaction'}><h4>Transaction</h4></Link>
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
                                style={{ textDecoration: 'none' }}
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
                    <h6>Filters</h6>
                    <div className ="filter-content">
                        <div className ="transaction-sort-filter">
                            <p>Sort by</p>
                            <div className ="dropdown show">
                              <select
                                className="dropdown-transaction"
                                onChange={(e)=> this.sortBy(e)}
                              >
                                <option value="" disabled selected>Sort By:</option>
                                <option value="latest">Latest</option>
                                <option value="oldest">Oldest</option>
                              </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/*TransactionStatusItem*/ }
                <div>
                    <Switch>
                        {tabsData.map((data, i) => {
                        return (
                            <SecuredRoute 
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
  transactions: state.transactions,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTransactions: (userID) => {
      dispatch(getAllTransactions(userID));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionStatus));
