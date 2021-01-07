import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getMerchant} from "../../../../actions/merchantActions";
import MerchantCatalog from "./MerchantCatalog";
import "../css/merchantCatalogStyle.css";

class MerchantProductCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.getMerchant(this.props.user.user.id);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const {merchant} = this.props.merchant;
    return (
      <MerchantCatalog merchant={merchant}/>
    );
  }
}

MerchantCatalog.propTypes = {
  user: PropTypes.object.isRequired,
  merchant: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  merchant: state.merchant,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMerchant: (userID) => {
      dispatch(getMerchant(userID));
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MerchantProductCatalog)
);
