import React, { Component } from 'react';
import MerchantDashboard from './MerchantDashboard';
import { Route, Switch, NavLink } from 'react-router-dom';
import '../css/MerchantTransaction/MerchantTransaction.css';
import MerchantTransactionItem from './MerchantTransactionItem';
import SecuredRoute from "../../../../securuityUtils/securedRoute";

class MerchantTransaction extends Component {

  componentDidMount() {

  }

  render() {
    const parentPath  = this.props.match.path;
    const tabsData = [
      {
        label: "All Transactions",
        path: parentPath+"/all",
        content: (<div className="tab-content">
          <MerchantTransactionItem/>
        </div>),
        defaultTab: true
      },
      {
        label: "Need Confirmation",
        path: parentPath+"/confirmation",
        content: (<div className="tab-content">
          <MerchantTransactionItem/>
        </div>),
      },
      {
          label: "Processed",
          path: parentPath+"/processed",
          content: (<div className="tab-content">
            <MerchantTransactionItem/>
          </div>),
        },
        {
          label: "Finished",
          path: parentPath+"/finished",
          content: (<div className="tab-content">
            <MerchantTransactionItem/>
          </div>),
        }
    ] 

  return ( 
  <React.Fragment>
    <div class="merchant-transaction-page">
      <MerchantDashboard/>
      <div class="merchant-transaction-content">
          <div class="top-side-merchant-transaction">
              <h3>Maintain Your Transaction</h3>

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
                          <a class="dropdown-toggle dropdown-transaction" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort Transaction
                          </a>
                        
                          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <a class="dropdown-item" href="#">Newest</a>
                            <a class="dropdown-item" href="#">.....</a>
                            <a class="dropdown-item" href="#">....</a>
                          </div>
                      </div>
                  </div>

                  <div class="search-transaction-filter">
                      <p>Find Transaction</p>
                      <input placeholder="Type product, invoice, or buyer name"></input>
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

export default MerchantTransaction;