import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CounSchedule from './CounSchedule'
import axios from 'axios';
import Pagination from 'react-js-pagination';
import styles from './Schedulebox.module.css';

export default function ScheduleBox(props) {
    //본인인경우 아니면 오류페이지로
    const user = useSelector(state => state.user.user);
    const [conference, setConference] = useState([]) //리스트들
    const [onoff, setOnoff] = useState("오래된")
    const [list, setList] = useState() //컨퍼런스 복사한 리스트
    const [page, setPage] = useState(1);
    const URL = process.env.REACT_APP_DB_HOST + `/schedules/counselors/${user.id}`




    useEffect(() => {
        //console.log(process.env.REACT_APP_DB_HOST//+URL)
        axios.get(URL)
            .then(function (response) {
                let data = response.data;
                console.log(data, 'data')
                setConference(data.filter(x => x.userId !== null))
            }
            )
    }, [])

    useEffect(() => {
        //console.log(process.env.REACT_APP_DB_HOST//+URL)
        if (conference.length > 0) {
            setList(conference.map((x) => (<CounSchedule props={x} />)))
        }
    }, [conference])

    function clickButton() {
        console.log("버튼")
        setList(list.reverse())
        if (onoff === "최신순") { setOnoff("오래된") }
        else { setOnoff("최신순") }
    }

    function changeSee(e) {
        console.log(e.target.value)

        setPage(page => 1);

        if (e.target.value === "모두") { setList(conference.map((x) => (<CounSchedule props={x} />))); console.log("모두", list) }
        else if (e.target.value === "요청") { setList(conference.filter(c => c.confirmed === false).map((x) => (<CounSchedule props={x} />))); console.log("요청", list) }
        else if (e.target.value === "완료") { setList(conference.filter(c => c.complete === true && c.confirmed === true).map((x) => (<CounSchedule props={x} />))); console.log("완료", list) }
        else { setList(conference.filter(c => c.complete === false && c.confirmed === true).map((x) => (<CounSchedule props={x} />))); console.log("예정", list) }
        console.log(list)
    }

    const handlePageChange = page => {
        setPage(page);
        console.log(page)
    };


    return (
        <div>
            <div className={styles.searchBar}>
                <label className={styles.selectBox}>
                    <select className="form-select form-select-sm" onChange={changeSee}>
                        <option value="DEFAULT" disabled>상담 상태 선택</option>
                        <option value="모두">모두</option>
                        <option value="요청">요청</option>
                        <option value="완료">완료</option>
                        <option value="예정">예정</option>
                    </select>
                </label>
                <label className={`col-3 ${styles.btn}`}>
                    <button onClick={clickButton}>{onoff}</button>
                </label>
            </div>
            <div>
                <div>{list ? list.slice((page - 1) * 10, (page - 1) * 10 + 10) : null}</div>
            </div>
            <div className={styles.pageBar}>
                {list ? <Pagination
                    activePage={page}//현재 페이지
                    itemsCountPerPage={parseInt((list.length - 1) / 10) + 1}
                    totalItemsCount={list.length}//전체 아이템 개수
                    pageRangeDisplayed={parseInt((list.length - 1) / 10) + 1}
                    prevPageText="‹"
                    nextPageText="›"
                    onChange={handlePageChange}
                /> : null}
            </div>
        </div>
    )
}