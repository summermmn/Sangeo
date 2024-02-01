import { Link } from "react-router-dom";
import styles from './Conferences.module.css';

export default function Conference(x) {
    const { id, complete, confirmed, counselorId, counselorName, endTime, startTime, userId, userName, formPath } = x.props;
    //console.log("test",x.props);
    let date = startTime.substring(16, 0).replace('T', ' ')+" ~ "+endTime.substring(16, 0).replace('T', ' ');
    let state = confirmed ?  (complete ? "완료" : "예정") : "미정";
    //승인안된 강의
    if (confirmed === false) {
        return (
            <div className={`row ${styles.box}`}>
                <div className={`col-1 ${styles.notConfirmed}`}>
                    {state}
                </div>
                <div className={`col-11 row ${styles.scheduleInfo}`}>
                    <div className="col-6">
                    {counselorName} 상담사
                    <br/>
                    {date}
                    </div>
                </div>
            </div>
        );
    }
    //승인완료 강의
    else {
        //완료전
        if (complete === false) {
            return (
                <div className={`row ${styles.box}`}>
                    <div className={`col-1 ${styles.state} ${styles.expected}`}>
                        <p>{state}</p>
                    </div>
                    <div className={`col-11 row ${styles.scheduleInfo}`}>
                        <div className="col-6">
                        {counselorName} 상담사
                        <br/>
                        {date}
                        </div>
                        <div className="col-3">
                        {formPath ? (<a href={formPath} className="text-primary" target="_blank"
rel="noopener noreferrer">사전질문 연결</a>) : "사전질문 미등록"}
                        </div>
                        <div className="col-3">
                            <Link to={`../conference/${id}`}>상담실링크</Link>
                        </div>
                    </div>
                </div>
            );
        }
        //완료후
        else {
            return (
                <div className={`row ${styles.box}`}>
                    <div className={`col-1 ${styles.state} ${styles.completed}`}>
                        <p>{state}</p>
                    </div>
                    <div className={`col-11 row ${styles.scheduleInfo}`}>
                        <div className="col-6">
                        {counselorName} 상담사
                        <br/>
                        {date}
                        </div>
                        <div className="col-3">
                            {formPath ? (<a href={formPath} className="text-primary" target="_blank"
rel="noopener noreferrer">사전질문 연결</a>) : "사전질문 미등록"}
                        </div>
                        <div className="col-3">
                        <Link to={`../donecounsel/${id}`}>상담결과링크</Link>
                        </div>
                    </div>
                </div>
            );
        }
    }

}
