import React, { useState } from "react";
import "./LoginRegister.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RegisterCounselorPage() {
  const navigate = useNavigate();

  const [shortIntroduction, setShortIntroduction] = useState("");
  const [contactStartTime, setContactStartTime] = useState("");
  const [contactEndTime, setContactEndTime] = useState("");

  const onShortIntroductionHandler = (event) => {
    setShortIntroduction(event.currentTarget.value);
  };
  const onContactStartTimeHandler = (event) => {
    setContactStartTime(event.currentTarget.value);
  };

  const onContactEndTimeHandler = (event) => {
    setContactEndTime(event.currentTarget.value);
  };

  function checkInput(){
    if(!shortIntroduction || !contactStartTime || !contactEndTime){
      alert("모든 값을 입력해주세요.");
      return false;
    }
    return true;
  }

  const location = useLocation();

  const onSubmit = (event) => {
    event.preventDefault();

    if(!checkInput())
    return;

    const url = '/counselors'
    const lState = location.state; // 이전 페이지에서 전달된 state
    axios.post(process.env.REACT_APP_DB_HOST+url, {
        counselorId: lState.counselorId,
        password: lState.password,
        name: lState.name,
        phoneNumber: lState.phoneNumber,
        profile: lState.profile,
        shortIntroduction: shortIntroduction,
        contactStartTime: contactStartTime,
        contactEndTime: contactEndTime
    })
    .then(function(result){
      alert(result.data.name+"님 가입을 축하드립니다.");
      // 로그인 페이지로 이동하게 수정
      navigate('../sign_in');
    }).catch(function(err){
      if(err.response.status===401){
        alert("이미 가입된 사용자입니다.");
      }
      else{
        alert(err);
      }
    })
  };
   
  return (
    <div className="loginregister">
      <form>
        <div>
          <input
            name="shortIntroduction"
            type="text"
            placeholder="한줄 자기소개"
            value={shortIntroduction}
            onChange={onShortIntroductionHandler}
            className="loginregister__input"
          />
        </div>
        <div>
        <div className="text-center">연락가능 시작시간</div>
          <input
            name="contactStartTime"
            type="time"
            placeholder="연락가능 시작시간"
            value={contactStartTime}
            onChange={onContactStartTimeHandler}
            className="loginregister__input"
          />
        </div>
        <div>
          <div className="text-center">연락가능 종료시간</div>
          <input
            name="contactEndTime"
            type="time"
            placeholder="연락가능 종료시간"
            value={contactEndTime}
            onChange={onContactEndTimeHandler}
            className="loginregister__input"
          />
        </div>
        <div>
          <button
            type="submit"
            onClick={onSubmit}
            className="loginregister__button"
          >상담사 계정 생성하기
          </button>
        </div>
      </form>
    </div>
  );
}
export default RegisterCounselorPage;
