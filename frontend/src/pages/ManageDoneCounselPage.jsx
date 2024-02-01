import React, { useEffect, useState } from 'react';
import EditorBox2 from '../components/editor/editorbox2';
import axios from 'axios';
import styles from './ManageDoneCounselPage.module.css';
import { useNavigate } from "react-router-dom";
import { useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';


// 상담사가 완료된 상담에 메세지를 남기고 이미지 업로드 하는 페이지
function ManageDoneCounselPage({imageUploader}) {

    const navigate = useNavigate();

    const user = useSelector(state => state.user.user);
    const isLogin = useSelector(state => state.user.isLogin);

    // scheduleId -> 상담사 마이페이지 구현된 후 수정, 일단은 임의로
    const scheduleId = useParams().scheduleNo;
    console.log(scheduleId);

    const [available, setAvailalbe] = useState(false);

    // // 사진 업로드 경로
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
        if(user.isUser){ // user일시 접근불가
          alert("권한이 없습니다.");
          navigate('/');
          return;
        }
        // 스케줄 아이디로 counselorId 일치 확인
        axios.get(process.env.REACT_APP_DB_HOST+`/schedules/${scheduleId}`)
        .then(function(result){
          console.log(result.data);
          if(user.id !== result.data.counselor.counselorId){ // counselorId 일치하지 않다면 접근 불가
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
          console.log(result);
          setCounselResult(result.data);
        }).catch(function(err){
          console.log(err);
        });
      }, []);

    return (
        <div>
          { available ?
          <>
           <h2 className='mb-3'>{counselResult.registeredResult ? "상담 결과 분석을 수정해보세요!" : "상담 결과 분석을 작성해보세요!"}</h2>
           <EditorBox2 imageUploader={imageUploader} scheduleId={scheduleId} registeredResult={counselResult.registeredResult} setCounselResult={setCounselResult}/>
          </> 
          : <></> }
            <div>
                { counselResult.registeredResult ? 
                (
                <div className = {`border border-3 mt-5 ${styles.resultBox}`}>
                    <h3 className='text-center mt-3'>상담 결과 분석</h3>
                    <img className = {styles.resultImg} src={counselResult.resultImg} alt="profile photo" /> 
                    <textarea className = {styles.text} placeholder={counselResult.resultContent} disabled/>
                </div>
                )
                : 
                (<div></div>) 
                }
            </div>
        </div>
    );
}

export default ManageDoneCounselPage;
