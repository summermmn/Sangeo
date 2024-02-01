import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Conferences from './Conferences'
import axios from 'axios';
import Pagination from 'react-js-pagination';
import styles from './Schedulebox.module.css';

export default function ScheduleBox() {
    //본인인경우 아니면 오류페이지로

    const [conference, setConference] = useState([]) //리스트들
    const [onoff, setOnoff] = useState("오래된")
    const [list, setList] = useState([]) //컨퍼런스 복사한 리스트
    const [page, setPage] = useState(1);
    const user = useSelector(state => state.user.user);

    const URL = process.env.REACT_APP_DB_HOST + "/schedules/users/" + user.id;

    useEffect(() => {
        console.log(URL);
        axios.get(URL)
            .then(function ({ data }) {
                console.log(data, 'data')
                setConference(data.filter(x => x.counselorId !== null))
            });
    }, []);

    useEffect(() => {
        if (conference.length > 0) {
            setList(conference.map((x) => (<Conferences props={x} />)))
        }
    }, [conference]);

    function clickButton() {
        if (onoff === "최신순") { setOnoff(onoff => "오래된") }
        else { setOnoff(onoff => "최신순") }
        if (conference.length > 0) {
            list.reverse();
        }
    }

    function changeSee(e) {
        setPage(page => 1);
        if (e.target.value === "모두") {
            setList(conference.map((x) => (<Conferences props={x} />)))
        }
        else if (e.target.value === "미정") {
            setList(conference.map(function (x) {
                console.log(x.confirmed);
                if (x.confirmed === false) {
                    return <Conferences props={x} />;
                }
            })
            );
        }
        else if (e.target.value === "완료") {
            setList(conference.map(function (x) {
                if (x.confirmed === true && x.complete === true) {
                    return <Conferences props={x} />;
                }
            })
            );
        }
        else {
            setList(conference.map(function (x) {
                if (x.confirmed === true && x.complete === false) {
                    return <Conferences props={x} />;
                }
            })
            );
        }
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
                        <option value="미정">미정</option>
                        <option value="완료">완료</option>
                        <option value="예정">예정</option>
                    </select>
                </label>
                <label className={`col-3 ${styles.btn}`}>
                    <button onClick={clickButton}>{onoff}</button>
                </label>
            </div>
            <div>
                <div>
                    {list.slice((page - 1) * 10, (page - 1) * 10 + 10)}
                </div>
                {/* why?!?!!?!?!?!??!?! */}
                {/* div>총 {list.length} 개</div> */}
            </div>
            <div className={styles.pageBar}>
                <Pagination
                    activePage={page}//현재 페이지
                    itemsCountPerPage={parseInt((list.length - 1) / 10) + 1}
                    totalItemsCount={list.length}//전체 아이템 개수
                    pageRangeDisplayed={parseInt((list.length - 1) / 10) + 1}
                    prevPageText="‹"
                    nextPageText="›"
                    onChange={handlePageChange}
                />
            </div>
        </div>
    )
}