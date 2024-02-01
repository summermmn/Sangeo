import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CounHolidayChange from './CounHolidayChange';
import CounHolidayChange2 from './CounHolidayChange2';
import styles from '../../pages/CounMypage.module.css';

export default function CounTimeUpdate(data) {
    const { setData, id } = data
    const user = useSelector(state => state.user.user);
    const [info, setInfo] = useState()
    const datable = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    const [holiday, setHoliday] = useState([false, false, false, false, false, false, false]) //일하는 요일
    const [dayoption, setDayoption] = useState(holiday.map((day, idx) => <div>
        <span>{datable[idx]}</span>
        <input className={styles.dayInput} onChange={changeCheck} type="checkbox" value={idx} />
    </div>))
    const [start, setStart] = useState() // 예약 시작시간
    const [end, setEnd] = useState() // 예약 종료시간
    const [rstart, setRStart] = useState() // 연락 시작시간
    const [rend, setREnd] = useState() // 연락 종료시간



    const URL = process.env.REACT_APP_DB_HOST + `/counselors/${user.id}` //강사정보

    useEffect(() => {
        axios.get(URL)
            .then(function (response) {
                if(response.data.holiday===null)
                    response.data.holiday = '/';
                setInfo(response.data)
            })

    }, [])

    useEffect(() => {
        console.log(info, 'info')
        if (info) {
            setStart(info.reserveStartTime)
            setEnd(info.reserveEndTime)
            setRStart(info.contactStartTime)
            setREnd(info.contactEndTime)
            let a = [false, false, false, false, false, false, false]
            for (let i = 0; i < 7; i++) {
                if (info.holiday.includes(`${i}`)) { a[i] = false }
                else {
                    a[i] = true
                }
            }
            setHoliday(a)
            console.log(holiday, '할리데이1')
        }

    }, [info])

    useEffect(() => {
        setDayoption(datable.map((day, idx) => <div>
            <span>{datable[idx]}</span>
            {holiday[idx] ?
                <input className={styles.dayInput} onChange={changeCheck} type="checkbox" checked value={idx} />
                : <input className={styles.dayInput} onChange={changeCheck} type="checkbox" value={idx} />
            }
        </div>))
    }, [holiday])


    const timetable = []
    for (let i = 0; i < 49; i++) { timetable[i] = `${('0' + parseInt(i / 2)).slice(-2)}:${i % 2 ? '30' : '00'}` }


    const timestartoption = timetable.map((time) =>
    <option value={time}>{time}</option>
    )

    function Change() {
        setData(false)
    }

    function changeStart(e) {
        setStart(e.target.value)
    }
    function changeEnd(e) {
        setEnd(e.target.value)
    }
    function changeRStart(e) {
        setRStart(e.target.value)
    }
    function changeREnd(e) {
        setREnd(e.target.value)
    }
    function changeCheck(e) {
        console.log(e.target.value)
        let tmp = holiday
        tmp[e.target.value] = !holiday[e.target.value]
        setHoliday(tmp)
        setDayoption(datable.map((day, idx) => <div>
            <span>{datable[idx]}</span>
            {holiday[idx] ?
                <input className={styles.dayInput} onChange={changeCheck} type="checkbox" checked value={idx} />
                : <input className={styles.dayInput} onChange={changeCheck} type="checkbox" value={idx} />
            }
        </div>))
    }

    function Submit() {
        console.log(rstart+" "+rend)
        console.log(start+" "+end)
        console.log(holiday)
        let hol = []
        for (let i = 0; i < 7; i++) {
            if (holiday[i] === false) { hol.push(`${i}`) }
        }
        console.log(hol.join('/'))
        let newinfo = info
        delete newinfo.password
        delete newinfo.id
        newinfo.holiday = hol.join('/')
        if (start == info.reserveStartTime) {
            newinfo.reserveStartTime = info.reserveStartTime
        }
        else { newinfo.reserveStartTime = start + ':00' }

        if (end == info.reserveEndTime) {
            newinfo.reserveEndTime = info.reserveEndTime
        }
        else { newinfo.reserveEndTime = end + ':00' }

        if (rstart == info.contactStartTime) {
            newinfo.contactStartTime = info.contactStartTime
        }
        else { newinfo.contactStartTime = rstart + ':00' }

        if (rend == info.contactEndTime) {
            newinfo.contactEndTime = info.contactEndTime
        }
        else { newinfo.contactEndTime = rend + ':00' }

        console.log('newinfo', newinfo)
        axios.put(process.env.REACT_APP_DB_HOST + `/counselors`,
            newinfo)
            .then(response => {
                console.log(response);
                alert('정보가 수정되었습니다');
            }
        )
    }


    return (
        <div>
            <h5>일정 수정</h5>
            <div>
                <div>연락가능시간</div>
                <label className={styles.selectBox}>
                    <select onChange={changeRStart}>
                        {timestartoption}
                    </select>
                    <span> ~ </span>
                    <select onChange={changeREnd}>
                        {timestartoption}
                    </select>
                </label>
            </div>
            <div>
                <div className='mt-2'>상담가능시간</div>
                <label className={styles.selectBox}>
                    <select onChange={changeStart}>
                        {timestartoption}
                    </select>
                    <span> ~ </span>
                    <select onChange={changeEnd}>
                        {timestartoption}
                    </select>
                </label>
            </div>
            <div className={`mt-2`}>상담가능요일</div>
            <div className={styles.dayOption}>
                {dayoption}
            </div>
            <div className='mt-2'>
                <CounHolidayChange />
            </div>
            <div className='mt-2'>
                <CounHolidayChange2 />
            </div>
            <div className='mt-2'>
                <button onClick={Submit}>제출</button>
                <button onClick={Change}>취소</button>
            </div>
        </div>
    )
}