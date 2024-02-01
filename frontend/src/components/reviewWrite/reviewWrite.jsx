import React, { useEffect, useState } from 'react';
import StarScore from "../starscore/starscore";
import ReviewContent from '../reviewcontent/reviewcontent';
import StarRatings from 'react-star-ratings';
import { BsXLg } from "react-icons/bs";
import axios from "axios";


function ReviewWrite({scheduleId}) {
    const [exist, setExist] = useState(false);
    const [existReview, setExistReview] = useState();
    const [content, setContent] = useState();
    const [star, setStar] = useState(3);
    const [ done, setDone] = useState(false);

    useEffect(() => {
      // 후기 있는지 확인
      axios.get(process.env.REACT_APP_DB_HOST+`/reviews/schedule/${scheduleId}`)
      .then(function(result){
        console.log(result);
        setExist(true);
        setExistReview(result.data);
      }).catch(function(err){
        console.log(err+" 후기 없음");
      });
    }, []);

    const onSetContent = (data) => {
      setContent(data);
    }

    const onSetStar = (data) => {
      setStar(data);
    }

    const onSubmit = () => {
        console.log(scheduleId+" "+star+" "+content);
        if(exist){ // 리뷰 수정
          axios.put(process.env.REACT_APP_DB_HOST+'/reviews', {
            scheduleId : scheduleId,
            score : star,
            content: content,
          })
          .then(function(result){
            alert("후기가 수정되었습니다!");
            setExist(true);
            setExistReview(result.data);
          }).catch(function(err){
            alert(err);
          });
        }
        else{ // 리뷰 작성
        axios.post(process.env.REACT_APP_DB_HOST+'/reviews', {
            scheduleId : scheduleId,
            score : star,
            content: content,
          })
          .then(function(result){
            alert("후기가 작성되었습니다!");
            setExist(true);
            setExistReview(result.data);
          }).catch(function(err){
            alert(err);
          });
      }
    }

    const onClickDelete = () => {
      axios.delete(process.env.REACT_APP_DB_HOST+`/reviews/${scheduleId}`)
      .then(function(result){
        alert("후기가 삭제되었습니다!");
        setExist(false);
        setExistReview(null);
      }).catch(function(err){
        alert(err);
      });
    } 

  return (
    <div>
      <h2 style={{width: '80%', marginLeft:'10%'}}>{exist ? "후기를 수정해보세요!" : "후기를 작성해보세요!"}</h2>
        <StarScore onSetStar = {onSetStar} writable={true} />
        <ReviewContent onSetContent={onSetContent}/>
        <button style={{width: '80%', marginLeft:'10%'}} onClick = {onSubmit}> { exist ? "수정 완료" : "작성 완료" } </button>
        {exist ?
          (
          <div style={{width: '80%', marginLeft:'10%'}} className='mt-3 p-3 border border-3'>
          <h2>나의 후기</h2>
          <div className='row'>
            <div className='col-3'>
              <StarRatings
              rating={existReview.score}
              starRatedColor="hotpink"
              numberOfStars={5}
              name='rating'
              starDimension='1.5rem'
              starSpacing='2px'
              />
            </div> 
            <div className='col-6'>{existReview.content}</div>
          </div>
          <div className='row mt-3'>
            <div className='col-lg-11 col-10'></div>
            <BsXLg className='col-lg-1 col-2' onClick={onClickDelete}/>
          </div>
          </div>
          ):
          (
            <div style={{width: '80%', marginLeft:'10%'}} className='mt-3'> 등록된 후기가 없습니다. </div>
          )
        }



  </div>
  );
}

export default ReviewWrite;
