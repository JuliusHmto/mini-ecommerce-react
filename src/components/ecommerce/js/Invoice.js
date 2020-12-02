import React, { Component } from "react";
import "../css/InvoiceStyle.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllInvoice } from "../../../actions/transactionActions";

class Invoice extends Component {
  componentDidMount() {
    this.props.getAllInvoice(this.props.user.user.id);
  }

  render() {
    return <React.Fragment></React.Fragment>;
  }
}

Invoice.propTypes = {
  getAllInvoice: PropTypes.func.isRequired,
  transactions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  transactions: state.transaction,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllInvoice: (userID) => {
      dispatch(getAllInvoice(userID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
