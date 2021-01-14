import React, { Component } from 'react';
import PropTypes from "prop-types";
import MerchantDashboard from './MerchantDashboard';
import { Switch, NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import '../css/MerchantTransaction/MerchantTransaction.css';
import MerchantTransactionItem from './MerchantTransactionItem';
import SecuredRoute from "../../../../securuityUtils/securedRoute";
import { loadAllMerchantOrders } from "../../../../actions/merchantActions";

class MerchantTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantOrders: [],
    };
    this.sortBy = this.sortBy.bind(this);
  }

  componentDidMount() {
    this.props.loadAllMerchantOrders(this.props.merchant.merchant.merchantName);
  }

  shouldComponentUpdate(prevState) {
    return prevState.merchantOrders.merchantOrders !== this.state.merchantOrders;
  }

  componentDidUpdate(){
    if(this.props.merchantOrders.merchantOrders !== this.state.merchantOrders){
      this.setState({
        merchantOrders: this.props.merchantOrders.merchantOrders
      });
    }
  }

  sortBy(e) {
    const {merchantOrders} = this.state;
    let newMerchantOrders = merchantOrders;
    if(e.target.value === 'oldest'){
      newMerchantOrders = merchantOrders.sort((a, b) => (a.id - b.id));
    } else if(e.target.value === 'latest'){
      newMerchantOrders = merchantOrders.sort((a, b) => (b.id - a.id));
    } 
    this.setState({merchantOrders: newMerchantOrders});
  }

  render() {
    const parentPath  = this.props.match.path;
    const { merchantOrders } = this.state;
    
    const tabsData = [
      {
        label: "All Transactions",
        path: parentPath+"/all",
        content: (<div className="tab-content">
          {merchantOrders.map((order) => {
            return <MerchantTransactionItem order={order} key={order.id}/>
          })}
        </div>),
        defaultTab: true
      },
      {
        label: "Pending",
        path: parentPath+"/pending",
        content: (<div className="tab-content">
        {merchantOrders.map((order) => {
          return  order.status == "Paid"? <MerchantTransactionItem order={order}/> : null
        })}
        </div>),
      },
      {
          label: "On Process",
          path: parentPath+"/process",
          content: (<div className="tab-content">
          {merchantOrders.map((order) => {
            return  order.status == "Process"? <MerchantTransactionItem order={order}/> : null
          })}
          </div>),
        },
        {
          label: "Finished",
          path: parentPath+"/finished",
          content: (<div className="tab-content">
          {merchantOrders.map((order) => {
            return  order.status == "Finished"? <MerchantTransactionItem order={order}/> : null
          })}
          </div>),
        },
        {
          label: "Rejected",
          path: parentPath+"/rejects",
          content: (<div className="tab-content">
          {merchantOrders.map((order) => {
            return  order.status == "Rejected"? <MerchantTransactionItem order={order}/> : null
          })}
          </div>),
        }
      ] 

    

  return ( 
  <React.Fragment>
    <div class="merchant-transaction-page">
      <MerchantDashboard/>
      <div class="merchant-transaction-content">
          <div class="top-side-merchant-transaction">
              <h3>Maintain Your Orders</h3>

              <div class="transaction-status-bar">
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

          <div class="filter-side-transaction">
              <h6>Filter</h6>
              <div class="filter-content">
                  <div class="transaction-sort-filter">
                      <p>Sort by</p>
                      <div class="dropdown show">
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

MerchantTransaction.propTypes = {
  user: PropTypes.object,
  merchant: PropTypes.object,
  merchantOrders: PropTypes.object,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
  merchant: state.merchant,
  merchantOrders: state.merchantOrders,
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => {
return {
  loadAllMerchantOrders: (merchantName) => {
    dispatch(loadAllMerchantOrders(merchantName));
  },
};
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantTransaction);