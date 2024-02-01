
import React, {useState, useEffect} from 'react';
import styles from './review.module.css';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

const Review = ({counselorId}) => {
  const [reviewList, setreviewList] = useState("");

  useEffect(() => {
    console.log("useEffect()");
    async function fetchData() {
        try{
            const result = await axios.get(process.env.REACT_APP_DB_HOST+`/reviews/counselor/${counselorId}`);
            console.log(result.data);
            setreviewList(result.data);
        }
        catch(error){
            alert(error);
        }
    };
    fetchData();
},[]);

  const returnContent = () => {
    let content = [];

    if(reviewList.length === 0){
      return <div>등록된 후기가 없어요!</div>
    }

    for(let i = 0; i < reviewList.length; i++){
      content.push(
        <li className={`row ${styles.review}`}> 
          <p className='col-2'>{reviewList[i].schedule.user.name}</p> 
          <p className='col-4'>
            <StarRatings
            rating={reviewList[i].score}
            starRatedColor="hotpink"
            numberOfStars={5}
            name='rating'
            starDimension='1.5rem'
            starSpacing='2px'
            />
          </p> 
          <p className='col-6'>{reviewList[i].content}</p> 
        </li>
      )
    };
    return content;
  }

  return (
    <div className={styles.list}>
      {returnContent()}
  </div>
  );
}

export default Review;
