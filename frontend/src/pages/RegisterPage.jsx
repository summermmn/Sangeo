import React, { useState } from "react";
import "./LoginRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RegisterPage() {
  
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Tel, setTel] = useState("");
  const [disable, setDisable] = React.useState(false);
  const [certstyle, setCertStyle] = useState({display: 'block'})
  const [ style, setStyle ] = useState({display: 'none'})


  // 오류상태 메세지
  const [IdMessage, setIdMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

  const [isId, setIsId] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isActivate, setIsActivate] = useState(false);

  useEffect(() => {
    if(isId && isPassword && isPasswordConfirm ){
      console.log("comeon!!!");
      setIsActivate(true);
    }
  }, [Tel]);



  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onUserIdHandler = (event) => {
    const regul1 = /^[a-zA-Z0-9]{4,12}$/;
    const IdCurrent = event.currentTarget.value;
    setUserId(IdCurrent);

    if(!regul1.test(IdCurrent)){
      setIdMessage('아이디는 4~12자리의 대소문자와 숫자로만 입력 가능합니다.');
      setIsId(false);
    } else {
      setIdMessage('올바른 아이디 형식입니다 :) ');
      setIsId(true);
    }

  };

  const onPasswordHandler = (event) => {

    const regul2 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const PwdCurrent = event.currentTarget.value;
    setPassword(PwdCurrent);

    if(!regul2.test(PwdCurrent)){
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요! ㅠㅠ');
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호입니다!! :)');
      setIsPassword(true);
    }

  };

  const onConfirmPasswordHandler = (event) => {
    const PwdConfirmCurrent = event.currentTarget.value;
    setConfirmPassword(PwdConfirmCurrent);

    if(password === PwdConfirmCurrent){
      setPasswordConfirmMessage('비밀번호가 일치합니다 :) ');
      setIsPasswordConfirm(true);

    } else {
      setPasswordConfirmMessage('비밀번호가 일치하지 않습니다! ');
      setIsPasswordConfirm(false);
    }

  };

  const onTelHandler = (event) => {
    setTel(event.currentTarget.value);
  };

  const navigate = useNavigate();

  function checkInput(){
    if(!name || !userId || !password || !confirmPassword || !Tel){
      alert("모든 값을 입력해주세요.");
      return false;
    }
    return true;
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if(!checkInput())
      return;

    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호확인은 같아야 합니다.");
    }

    const url = '/users'
    axios.post(process.env.REACT_APP_DB_HOST+url, {
      userId : userId,
      password : password,
      name: name,
      phoneNumber: Tel,
      profile: imgurl
    })
    .then(function(result){
      alert(result.data.userId+"님 가입을 축하드립니다.");
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

  // 기본이미지 url

  const imgurl = 'https://res.cloudinary.com/daomkhvu8/image/upload/v1660629167/59D8F27B-045C-4FA9-B831-EDF629FC9C04_jxwp1a.png';

  function onClickCounselor(event){ // 상담사 회원가입을 위해 페이지 이동
    event.preventDefault();

    if(!checkInput())
      return;

    navigate('counselor',{
      state:{
        counselorId: userId,
        password: password,
        name: name,
        phoneNumber: Tel,
        profile: imgurl,
      }
    });
  }

   function onClickCertification(event) {
     event.preventDefault();

     /* 1. 가맹점 식별하기 */
     const { IMP } = window;
     IMP.init('imp27086612') // 발급한 가맹점 식별번호 (인예림)
     //IMP.init('imp10391932') // 오픈 github에서 가져온 가맹점 식별번호
     console.log("본인 인증")
     /* 2. 본인인증 데이터 정의하기 */
     const data = {
       merchant_uid : 'merchant_' + new Date().getTime(),
       name: name,
       phone:Tel
     }
     /* 4. 본인인증 창 호출하기 */
     IMP.certification(data, callback);
     console.log("호출");
   }
   
   /* 3. 콜백 함수 정의하기 */
   function callback(response) {
     const {
       success,
       error_msg,
     } = response
     console.log(response);
     if (success) {
       console.log(response.imp_uid);
       //alert('본인인증 성공'); // 순식간에 사라져서 그냥 주석 처리
       setDisable(true);
       setCertStyle({display: 'none'}); // 인증 버튼 더이상 보이지 않도록 하기
       setStyle({display: 'block'}); // 회원가입 버튼 생성
     } else {
       alert(`본인인증 실패: ${error_msg}`);
     }
    }
   
  return (
    <div className="loginregister">
      <form>
        <div>
          <input
            name="name"
            type="text"
            placeholder="이름"
            value={name}
            onChange={onNameHandler}
            className="loginregister__input"
          />
           <div className="message"></div>
        </div>

        <div>
          <input
            name="userId"
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={onUserIdHandler}
            className="loginregister__input"
          />
          <div className="message">
          {userId.length > 0 && (
            <span className={`message ${isId ? 'success' : 'error'}`}>{IdMessage}</span>
          )}
          </div>
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
          <div className="message">
          {password.length > 0 && (
            <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>
          )}
          </div>
         
        </div>
       
        <div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
            className="loginregister__input"
          />
          <div className="message">
          {confirmPassword.length > 0 && (
            <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>
          )}
          </div>
          
        </div>
        
        <div>
          <input
            name="name"
            type="tel"
            placeholder="전화번호"
            value={Tel}
            onChange={onTelHandler}
            className="loginregister__input"
          />
        </div>
        <div>        
          <button 
          type="submit"
          disabled={!(isId && isPassword && isPasswordConfirm)}
          style={certstyle}
          onClick={onClickCertification} 
          className={'btn' + (isActivate? 'Activate' : 'Disabled')}>
          본인인증하기
          </button></div>
        <div>
          <button
            type="submit"
            disabled={!disable}
            style={style}
            onClick={onSubmit}
            className="loginregister__button"
          >
            유저 계정 생성하기
          </button>
          </div>
          <div>
          <button
            type="submit"
            disabled={!disable}
            style={style}
            onClick={onClickCounselor}
            className="loginregister__button"
          >상담사 계정 생성하기
          </button>
        </div>
      </form>
    </div>
  );
}
export default RegisterPage;
