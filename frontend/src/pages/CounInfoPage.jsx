import React, {useEffect, useState} from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {Nav} from 'react-bootstrap';
import axios from 'axios';

export default function CounInfoPage({imageUploader}){
    const navigate = useNavigate()
    const URL = process.env.REACT_APP_DB_HOST+'/counselors/me'
    const sendURL = process.env.REACT_APP_DB_HOST+'/counselors'
    const [info,setInfo] = useState()
    const [consultTarget,setConsultTarget] = useState()
    const [phoneNumber,setPhoneNumber] = useState()
    const [shortIntroduction,setShort] = useState()
    const [longIntroduction,setLong] = useState()
    const [price,setPrice] = useState()
    const target = ['아동','청소년','성인(여)','성인(남)']
    const [targetbox,setTargetBox] = useState();

    
    useEffect(()=>{
        axios.get(URL)
        .then(response=>setInfo(response.data))
    },[])
    useEffect(()=>{
        if(info){
        setConsultTarget(info.consultTarget.split(''))
  
        setPhoneNumber(info.phoneNumber)
        setShort(info.shortIntroduction)
        setLong(info.longIntroduction)
        setPrice(info.price)
        setTargetBox(target.map((t)=><div>{t}<input onChange={TargetChange} type="checkbox" value={t}/></div>))
        console.log(info)
        }
    },[info])


    function PhoneChange(e){
        setPhoneNumber(e.target.value)
    }
    function ShortChange(e){
        setShort(e.target.value)
    }
    function PriceChange(e){
        setPrice(e.target.value)
    }
    function LongChange(e){
        setLong(e.target.value)
    }
    function TargetChange(e){
        setConsultTarget(e.target.value)
    }

    function Send(){
        let newinfo = info
        newinfo.phoneNumber = phoneNumber
        newinfo.shortIntroduction = shortIntroduction
        newinfo.price = price
        newinfo.consultTarget = consultTarget
        newinfo.longIntroduction = longIntroduction
        delete newinfo.password
        setInfo(newinfo)
        console.log(newinfo)
        axios.put(sendURL,newinfo)
    }

    function Back(){
        navigate(-1)
    }

    const onAuth =() => {
        navigate(
            '/counmypage/change/certificate',{
        state:{
            counselorId: info.counselorId
        }});

    }
    return(
        <div>강사 정보페이지
            <div>강사 등록정보수정</div>
                <div>사진</div>
                <div>전화번호 <input onChange={PhoneChange} value={phoneNumber} /></div>
                <div>소개 <input onChange={ShortChange} value={shortIntroduction} /></div>
                <div>상담비용 <input onChange={PriceChange} value={price} /></div>
                <div>상담대상
                    {targetbox} 
                </div>
                <div>상세자기소개 <input onChange={LongChange} value={longIntroduction} /></div>
                <button onClick={Send} >수정</button>
                <button onClick={Back}>나가기</button>
            <div>
                비밀번호 변경
            </div>
            <div>
                강사 자격인증
                <button onClick = {onAuth}></button>
            </div>
        </div>
    )
}