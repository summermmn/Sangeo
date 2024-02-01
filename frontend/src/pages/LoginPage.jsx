import React, { useState, useEffect } from "react";
import "./LoginRegister.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import NaverLogin from '../components/naver/NaverLogin';

const LoginPage = () =>{
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let localStorage = window.localStorage;

  // input check 추가

  const onUserIdHandler = (event) => {
    setUserId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmit = (isUser, event) => { // isUser가 true이면 user, false이면 counselor
    event.preventDefault();
 
    let url = "/auth/user/login";
    if(!isUser){
      url = "/auth/counselor/login";
    }

    axios.post(process.env.REACT_APP_DB_HOST+url, {
      id : userid,
      password : password
    })
    .then(function(result){
      alert(result.data.message);
      localStorage.setItem("Authorization", result.data.accessToken);
      // token이 필요한 API 요청시 헤더에 token 담아서 보냄
      setAuthorizationToken(result.data.accessToken);
      dispatch({type:"LOG_IN", user: jwtDecode(result.data.accessToken)});
      navigate('/');
    }).catch(function(err){
      if(err.response.status === 401 || err.response.status === 404){
        alert("아이디 혹은 비밀번호가 틀렸습니다.");
      }
      else{
          alert(err);
      }
    });

  };

//   const onLogin =(event) => {
//     event.preventDefault();
//     authService//
//     .login(event.currentTarget.textContent)
//     .then(data => goToCunslList(data.user.uid));
// }

// useEffect(() => {
//   authService
//   .onAuthChange(user => {
//       user && goToCunslList(user.uid);
//   })
// })

  return (
    <div className="loginregister">
      <form>
        <div>
          <input
            name="userid"
            type="email"
            placeholder="아이디"
            value={userid}
            onChange={onUserIdHandler}
            className="loginregister__input"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onPasswordHandler}
            className="loginregister__input"
          />
        </div>
        <div>
          <button
            type="submit"
            onClick={(event) => {onSubmit(true, event)}}
            className="loginregister__button"
          >
            유저 로그인
          </button>
        </div>
        <div>
          <button
            type="submit"
            onClick={(event) => {onSubmit(false, event)}}
            className="loginregister__button w-btn-gra-anim"
          >
            상담사 로그인
          </button>
        </div>
        <div className="naverLoginBtn">간편 유저가 되고싶다면? <NaverLogin></NaverLogin></div>
      </form>
    </div>
    
  );
}

export default LoginPage;
