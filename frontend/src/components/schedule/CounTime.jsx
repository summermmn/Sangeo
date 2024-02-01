import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';



export default function CounTime(data) {
    const month1 = ('0' + (new Date().getMonth() + 1)).slice(-2)
    const month2 = ('0' + (new Date().getMonth() + 2)).slice(-2)
    const year = new Date().getFullYear()
    const { setData, id } = data
    const [info, setInfo] = useState()
    const [holidays1, setHolidays1] = useState()
    const [holidays2, setHolidays2] = useState()
    const user = useSelector(state => state.user.user);
    const URL = process.env.REACT_APP_DB_HOST + `/counselors/me` //강사정보
    const URLT = process.env.REACT_APP_DB_HOST + `/schedules/counselors/holidays/${user.id}/${year}-${month1}` //휴일정보 이번달
    const URLN = process.env.REACT_APP_DB_HOST + `/schedules/counselors/holidays/${user.id}/${year}-${month2}` //휴일정보 다음달
    useEffect(() => {
        axios.get(URL)
            .then(function (response) {
                console.log(response.data, 'dddd')
                if(response.data.holiday===null)  // 최초 회원가입시 아무 데이터 없는것 예외처리
                    response.data.holiday = '/';
                setInfo(response.data)
                axios.get(URLT)
                    .then(function (response) {
                        console.log(response.data, '8월')
                        setHolidays1(response.data.map((x) => ` ${x.holiday}일`))
                    })
                axios.get(URLN)
                    .then(function (response) {
                        console.log(response.data, '9월')
                        setHolidays2(response.data.map((x) => ` ${x.holiday}일`))
                    })
            })
    }, [])

    function Change() {
        setData(true)
    }
    return (
        <div className='text-left'>
            <div>연락가능 시간 : {info ? `${info.contactStartTime.slice(0, 5)}~${info.contactEndTime.slice(0, 5)}` : null}</div>
            <div className='mt-2'>상담가능 시간 : {info ? `${info.reserveStartTime.slice(0, 5)}~${info.reserveEndTime.slice(0, 5)}` : null}</div>
            {info ?
                <div className='mt-2'>상담요일 :
                    {info.holiday.includes('1') ? null : <span> 월</span>}
                    {info.holiday.includes('2') ? null : <span> 화</span>}
                    {info.holiday.includes('3') ? null : <span> 수</span>}
                    {info.holiday.includes('4') ? null : <span> 목</span>}
                    {info.holiday.includes('5') ? null : <span> 금</span>}
                    {info.holiday.includes('6') ? null : <span> 토</span>}
                    {info.holiday.includes('0') ? null : <span> 일</span>}
                </div>
                : null}
            <div>
                <div className='mt-2'>이번달 휴일 : {holidays1 ? ` ${month1}월 ${holidays1}` : null}</div>
                <div className='mt-2'>다음달 휴일 : {holidays2 ? ` ${month2}월 ${holidays2}` : null}</div>
            </div>
            <button className='mt-2' onClick={Change}>일정변경</button>
        </div>
    )
}


