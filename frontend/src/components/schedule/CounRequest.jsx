import { React, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
import styles from './Conferences.module.css';

export default function Request({ x }) {
    console.log("test", x);
    const { complete, confirmed, counselorId, counselorName, endTime, startTime, userId, userName, userPhoneNumber } = x.props
    let date = startTime.substring(16, 0)
    const [show, setShow] = useState({ display: '' })
    function Approve() {
        const URL = process.env.REACT_APP_DB_HOST + '/schedules/confirm'
        axios.put(URL, {
            "counselorId": `${counselorId}`,
            "startTime": `${date}`
        }
        )
        setShow({ display: 'none' })
        alert('수락했습니다.');
        window.location.reload();
    }
    function Refuse() {
        const URL = process.env.REACT_APP_DB_HOST + `/schedules/${counselorId}/${date}`
        axios.delete(URL)
        setShow({ display: 'none' })
        alert('거절했습니다.');
        window.location.reload();
    }

    return (
        <div className={`row ${styles.box}`} style={show}>
            <div className={`col-1 ${styles.notConfirmed}`}>
                <p>요청</p>
            </div>
            <div className={`col-11 row ${styles.scheduleInfo}`}>
                <div className="col-6">
                    {userName}님
                    <br />
                    {date}
                </div>
                <div className="col-3">
                    📞 {userPhoneNumber}
                </div>
                <div className="col-3">
                    <button className={styles.approveBtn} onClick={Approve}>수락</button>
                    <button className={styles.refuseBtn} onClick={Refuse}>거절</button>
                </div>
            </div>
        </div>

    )

}
