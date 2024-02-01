import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./UserProfile.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import setAuthorizationToken from "../../utils/setAuthorizationToken";

export default function UserProfile(){
     const URL = process.env.REACT_APP_DB_HOST+"/users/me";
     const [info,setInfo] = useState("");

     const dispatch = useDispatch();
     const navigate = useNavigate();

     useEffect(()=>{
        async function fetchData(){
            try{
                console.log("fetch Data");
                const result = await axios.get(URL);
                setInfo(result.data);
                setTimeout(5000);
            }
            catch(error){
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
            }
        };    
        fetchData();
    },[]);

    return(
        <div className={styles.profile}>
            <div className= {styles.profileImg}>
                {/* 서버에서는 이미지 링크 "https://i7e207.p.ssafy.io/basic.png"*/}
                <img src={ info.profile === "basic.png" ? "https://i7e207.p.ssafy.io/basic.png" : info.profile} alt="profile"/>
            </div>
            <div className= {styles.info}>
                <div>{info.name} 고객님</div>
                { info.naverUser ? <div className="text-success">네이버 유저</div> :  <div>{info.userId}</div>}
            </div>
            <div className={styles.btn}><button><Link to = "./change" state={{naverUser : info.naverUser}}>수정</Link></button></div>
        </div>

    )
}