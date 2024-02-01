import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { width } from '@mui/system';


class StarScore extends React.Component {
  state = {
    rating: 3
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
    this.props.onSetStar(nextValue);
  }

  render() {
    const { rating } = this.state;

     return (                
      <div style={{width: '80%', marginLeft:'10%'}}>
        <p>별점: { rating }</p>
        <StarRatingComponent 
          name="rate2" 
          editing={this.props.writable}
          starCount={5}
          renderStarIcon = {()=> <span>  <FontAwesomeIcon icon ={faStar} />  </span>}
          emptyStarColor={`#e2e2e2`}
          value={ rating }
          onStarClick={this.onStarClick.bind(this)}
        />

      </div>
    );
  }
}
 
export default StarScore;