import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../css/ItemDetail/ItemDetail.css";
import ReactStars from "react-rating-stars-component";

class ItemRating extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {ratingList} = this.props;
    //const ratingList = findRating !== 10 ? ratings.filter((rating) => rating.ratingValue === findRating) : ratings;

    return (
      <React.Fragment>
        {ratingList.map((rating) => {
          return(
            <div className="revieww">
              <img src={require("../css/ItemDetail/def-icon.png")} alt="nopic"/>
              <div className="review-textt">
                <h4>{rating.username}</h4>
                <ReactStars
                  classNames="reactStars"
                  count={5}
                  size={12}
                  value={rating.ratingValue}
                  isHalf={true}
                  edit={false}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
                <p>{rating.comment_message}</p>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

ItemRating.propTypes = {
  user: PropTypes.object,
  itemDetail: PropTypes.object,
  testimonial: PropTypes.object,
};

const mapStateToProps = (state) => ({
  items: state.ecommerce,
  itemDetail: state.ecommerce,
  testimonial: state.testimonial,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemRating);
