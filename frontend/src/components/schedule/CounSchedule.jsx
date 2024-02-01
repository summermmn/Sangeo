import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Request from './CounRequest'
import styles from './Conferences.module.css';

export default function Conference(x) {
    const navigate = useNavigate()
    const { id, complete, confirmed, counselorId, counselorName, endTime, startTime, userId, userName, formPath
    } = x.props
    console.log("test", x.props);
    let date = startTime.substring(16, 0)
    const now = new Date()
    const time = new Date(startTime)
    const URL = process.env.REACT_APP_DB_HOST + `/schedules/complete`
    let scheduleState = confirmed ? (complete ? "완료" : "예정") : "요청";

    console.warn(x);

    // 모달 관련
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // 모달에서 받을 설문 주소
    const [path, setPath] = useState(formPath);

    function putPath() {
        handleClose();
        const path = document.getElementById("path");
        // console.warn("putpath", path.value);

        axios.put(process.env.REACT_APP_DB_HOST + `/schedules/form`, {
            scheduleId: id,
            formPath: path.value,
        })
            .then(function ({ data }) {
                console.warn("등록 성공 ", data);
                alert("등록에 성공했습니다");
                setPath(path.value);
            }).catch(function (err) {
                console.warn("등록 실패 ", err);
            })
    };

    function IsComplete() {
        console.log(date)
        axios.put(URL,
            {
                "counselorId": `${counselorId}`,
                "startTime": `${date}`
            })
            .then(navigate(`/managedonecounsel/${id}`))
        //네비게이트로 상담완료로
    }
    //요청
    if (confirmed === false) {
        return (
            <Request x={x}></Request>
        )
    }

    else {
        //예정
        if (complete === false) {
            return (
                <div className={`row ${styles.box}`}>
                    <div className={`col-1 ${styles.state} ${styles.expected}`}>
                        <p>{scheduleState}</p>
                    </div>
                    <div className={`col-11 row ${styles.scheduleInfo}`}>
                        <div className="col-6">
                            {userName} 님
                            <br />
                            {date}
                        </div>
                        <div className="col-3">
                            {path ? (<a href={path} className="text-primary" target="_blank"
                                rel="noopener noreferrer">사전질문 연결</a>) :
                                <a href='#' onClick={handleShow}>사전 질문 링크 등록</a>}
                        </div>
                        <div className="col-3">
                            <Link to={`../conference/${id}`}>상담실링크</Link>
                            {time < now ? <button className={styles.completeBtn} onClick={IsComplete}>상담 완료</button>  : null}
                        </div>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>사전 질문 링크를 등록하세요</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='text-center'>
                            <input type="text" id="path" className="text-center" placeholder='주소'></input>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={putPath}>
                                등록하기
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }
        //완료후
        else {
            return (
                <div className={`row ${styles.box}`}>
                    <div className={`col-1 ${styles.state} ${styles.completed}`}>
                        <p>{scheduleState}</p>
                    </div>
                    <div className={`col-11 row ${styles.scheduleInfo}`}>
                        <div className="col-6">
                            {userName} 님
                            <br />
                            {date}
                        </div>
                        <div className="col-3">
                            {formPath ? (<a href={formPath} className="text-primary" target="_blank"
                                rel="noopener noreferrer">사전질문 연결</a>) : "사전질문 미등록"}
                        </div>
                        <div className="col-3">
                            <Link to={`../managedonecounsel/${id}`}>상담결과링크</Link>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
