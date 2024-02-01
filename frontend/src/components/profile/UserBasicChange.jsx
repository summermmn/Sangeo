import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import styles from '../../pages/UserInfoChangePage.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import setAuthorizationToken from "../../utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import PwModal from '../pwmodal/PwModal';

function UserBasicChange({imageUploader, naverUser}){
    //aixos로 최초정보 받음
    //보낼 폼 sendinfo
    //아이디 중복확인버튼 해당아이디를 사용하는 사람이 있는지 확인
    //회원탈퇴시 한번더 물어보기
    const URL = '/users/me';
    const [info,setInfo] = useState('');
    const [id,setId] = useState('');
    const [newname,setName] = useState('');
    const [newphonenumber,setPhonenumber] = useState('');
    const [newprofile,setProfile] = useState('');
    const [first,setFirst] = useState(1); //최초렌더링시 입력값이 반영안되는 문제 해결


    //파일 미리볼 url을 저장해줄 state
    const [fileImage, setFileImage] = useState("");
    const[ textValue, setTextValue] = useState("");
    const [ imgName, setImgName] = useState("");
    // 서버에서 받아온 이미지 경로
    const [ imgURL, setImgURL] = useState("");

    // 버튼 이미지 바꾸기
    const [imgbtn, setImgbtn ] = useState(true);
    const [targetimg, setTargetImg] = useState("");

    // 모달 관련
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // 모달에서 받을 비밀번호
    const [password, setPassword] = useState(null);
    // 비밀번호 체크 후 update인지 delete인지 파악
    const [isUpdate, setIsUpdate] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputRef = useRef();
    const reader = new FileReader();

    useEffect(()=>{
    axios.get(process.env.REACT_APP_DB_HOST+URL)
    .then(function (response) {
            setInfo(response.data);
            setId(info.userId);
            setName(info.name);
            setPhonenumber(info.phoneNumber);
            setProfile(info.profile);
            if (first === 1){
                setFirst(0)
            }//최초렌더링시 입력값이 반영안되는 문제 해결
    })
    .catch(function (error){
        if(error.response.status===401){ // 토큰 만료
            alert("다시 로그인해주세요.");
            // 로그아웃 처리
            localStorage.removeItem("Authorization");
            setAuthorizationToken(null);
            dispatch({type:'LOG_OUT'});
            // 로그인 페이지로 이동
            navigate('/sign_in');
        }
        else if(error.response.status===403){
            alert("로그인 후 접근 가능한 페이지입니다.");
            // 로그인 페이지로 이동
            navigate('/sign_in');
        }
        else{
            alert(error);
        }
    })
    },[first]);

    function nameChange(e){
        setName(e.target.value);
    }

    function profileChange(e){
        setProfile(e.target.value);
    }
    
    function phonenumberChange(e){
        setPhonenumber(e.target.value);
    }

    function checkInput(){
        if(!newname || !newphonenumber || !newprofile){
          alert("모든 값을 입력해주세요.");
          return false;
        }
        return true;
    }

    async function checkPassword() {
        console.log(password);
        if(password === null){
            return;
        }

        let check = false;
        await axios.post(process.env.REACT_APP_DB_HOST+`/users/password/${id}`, {
            password: password
        })
        .then(function(result){ // 비밀번호 일치
            console.log(result);
            check = true;
        }).catch(function(err){
            alert(err.response.data);
        });

        if(!check){
            return;
        }

        if(isUpdate){
            const user = {
                id: id,
                password: password
            };
            updateBasic(user);
        }
        else{
            deleteUser();
        }
    }

    async function updateBasic(user){
        // 정보 수정
        await axios.put(process.env.REACT_APP_DB_HOST+'/users', {
            name: newname,
            phoneNumber: newphonenumber,
            profile: newprofile,
            userId: id,
        })
        .then(function(result){
            // Navbar에서 바로 적용되게 새로 로그인 처리
            let login_url = naverUser ? "/auth/naver/login" : "/auth/user/login";
            console.log(user);
            axios.post(process.env.REACT_APP_DB_HOST+login_url, user)
              .then(function(result){
                localStorage.setItem("Authorization", result.data.accessToken);
                // token이 필요한 API 요청시 헤더에 token 담아서 보냄
                setAuthorizationToken(result.data.accessToken);
                dispatch({type:"LOG_IN", user: jwtDecode(result.data.accessToken)});
                alert("정보가 수정되었습니다!");
              }).catch(function(err){
                alert(err);
              });
        }).catch(function(err){
            alert(err);
        });
    }

    // 회원정보 수정
    async function onClickUpdate(){
        if(!checkInput())
        return;

        // 새로 로그인 될 user 정보
        console.log(id);
        if(!naverUser){ // naverUser는 password 없음, naverUser 아니면 비밀번호 검사
            setIsUpdate(true);
            setPassword(null); // 초기화
            handleShow();
        }
        else{
            const user = {
                id: id,
                name: newname,
                phoneNumber: newphonenumber,
                profile: newprofile
            };
            updateBasic(user);
        }
    }

    function deleteUser(){
        axios.delete(process.env.REACT_APP_DB_HOST+`/users/${id}`)
        .then(function(result){
        // 로그아웃 처리
        localStorage.removeItem("Authorization");
        setAuthorizationToken(null);
        dispatch({type:'LOG_OUT'});
        alert("탈퇴되었습니다!");
        navigate('/');
    }).catch(function(err){
        alert(err);
    });
    }

    // 회원 탈퇴
    function onClickDelete(){
        if(!naverUser){ // 일반 User는 비밀번호 필요
            setIsUpdate(false);
            setPassword(null); // 초기화
            handleShow();
        }
        else { // naverUser는 비밀번호 없음
            deleteUser();
        }
    }

     // 이미지 업로드 버튼
     const onButtonClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    }



    // 이미지 등록 버튼
    const onButtonPost = async (event) => {
        const uploaded = await imageUploader.upload(targetimg);
        // await setImgName(uploaded.original_filename);
        await setProfile(uploaded.url);
        // await console.log("gggg ", imgURL);
    }

    // 파일 저장
    const saveFileImage = async (event) => {
        if(event.target.files[0]){
            console.log("bbbbb  ",event.target.files[0]);
            setTargetImg(event.target.files[0]);
            reader.readAsDataURL(event.target.files[0]);
        }
        reader.onloadend = () => {
            const previewImgUrl = reader.result;

            if(previewImgUrl){
                setFileImage(previewImgUrl);
            }
        }

        setImgbtn(false);
    };


    return(
        <div className='text-center'>
            <div>
                {naverUser ? 
                <div className="text-success">네이버 유저</div>
                :
                <>
                <div>아이디</div>
                <div>
                    <input value={id ? id : ""} disabled/>
                </div>
                </>}
                <div>프로필</div>
                <div>
                    {/* 우선 서버 basic.png 사용 */}
                  <div>{newprofile && (<img alt="sample" src={newprofile === "basic.png" ? "https://i7e207.p.ssafy.io/basic.png" : newprofile} className = {styles.imgframe} />)}</div>
                  <input
                    ref = {inputRef}
                    className = {styles.input} 
                    name="imgUpload"
                    type="file"
                    accept="image/*"
                    onChange={saveFileImage}
                  />
                    {imgbtn ?  <button className={styles.button} onClick={onButtonClick}> 이미지 업로드 </button> :  <button className={styles.button} onClick={onButtonPost}> 등록하기 </button>}
                 
                  </div> 
                <div>이름</div>
                <div>
                    <input onChange={nameChange} value={newname ? newname : ""}/>
                </div>
                <div>연락처</div>
                <div><input onChange={phonenumberChange} value={newphonenumber ? newphonenumber  : ""} /></div>    
            </div>
            <button className={styles.ubcBtn} onClick={onClickUpdate}>수정</button>
            <br/>
            <button className={styles.ubcBtn} onClick={onClickDelete}>회원탈퇴</button>
            <PwModal show={show} handleClose={handleClose} setPassword={setPassword} checkPassword={checkPassword}></PwModal>
        </div>
    )
}

export default UserBasicChange;