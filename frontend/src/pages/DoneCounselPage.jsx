
import {useParams} from 'react-router-dom';
import React, {useEffect, useState }from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector} from 'react-redux';

import ReviewWrite from '../components/reviewWrite/reviewWrite';
import axios from 'axios';

// 회원이 상담완료 후, 코멘트와 그림을 다시 확인하고 리뷰를 작성하는 페이지
function DoneCounselPage() {

  const navigate = useNavigate();

  const user = useSelector(state => state.user.user);
  const isLogin = useSelector(state => state.user.isLogin);

  const scheduleId = useParams().scheduleNo;

  const [available, setAvailalbe] = useState(false);

  const [ counselResult, setCounselResult] = useState({
    scheduleId: '', 
    registeredResult: '',
    resultImg:'',
    resultContent: '' 
});

useEffect(() => {
    if(!isLogin){
      alert("로그인 후 접근 가능한 페이지입니다.");
      navigate('/sign_in');
      return;
    }
    else{
      // user인지 counselor인지 구분
      if(!user.isUser){ // counselor일시 접근불가
        alert("권한이 없습니다.");
        navigate('/');
        return;
      }
      // 스케줄 아이디로 userId 일치 확인
      axios.get(process.env.REACT_APP_DB_HOST+`/schedules/${scheduleId}`)
      .then(function(result){
        console.log(result.data);
        if(user.id !== result.data.user.userId){ // userId 일치하지 않다면 접근 불가
          alert("권한이 없습니다.");
          navigate('/');
          return;
        }
        else{
          setAvailalbe(true);
        }
        }).catch(function(err){
          console.log(err);
        });
      }

    // 상담 결과 있는지 확인
    axios.get(process.env.REACT_APP_DB_HOST+`/schedules/result/${scheduleId}`)
    .then(function(result){
      setCounselResult(result.data);
    }).catch(function(err){
      console.log(err);
    });
  }, []);




  return (
    <div>
      {/* 리뷰작성 */}
      { available ? <ReviewWrite scheduleId = {scheduleId}/> : <></>  }
      {/* 상담 결과 분석 조회 */}
      <div>
        { counselResult.registeredResult ? 
        (
        <div style={{width: '80%', marginLeft:'10%'}} className = {`border border-3 mt-5 `}>
            <h2 className='text-center mt-3'>상담 결과 분석</h2>
            <img style={{width: '60%', marginLeft:'20%'}} className='mt-3' src={counselResult.resultImg} alt="profile photo" /> 
            <textarea style={{width: '80%', marginLeft:'10%',  height: '200px', resize: 'none'}} className='mt-3' placeholder={counselResult.resultContent} disabled/>
        </div>
        )
        : 
        (<div></div>) 
        }
      </div>
   </div>
  );
}

export default DoneCounselPage;
