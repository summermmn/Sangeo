import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './counselordetailinfo.module.css';

const CounselorDetailInfo = ({card}) => {

    const [certificates, setCertificates] = useState([]);

    useEffect(()=>{ // 자격증 정보 받아오기
        axios.get(process.env.REACT_APP_DB_HOST+`/certificates/${card.counselorId}`)
        .then(function (response) {
            console.log(response.data);
            setCertificates(response.data);
        })
        .catch(function (error){
            alert(error);
        })
    }, []);

    const returnHoliday = () => {
        if(card.holiday === null){
            return "등록되지 않았어요!";
        }

        let holidayList = card.holiday.split("/");
        let holidayStr = "";
        for(let i = 0; i < holidayList.length; i++){
            let holiday = Number(holidayList[i]);
            if(holiday === 1){holidayStr += "월";}
            else if(holiday === 2){holidayStr += "화";}
            else if(holiday === 3){holidayStr += "수";}
            else if(holiday === 4){holidayStr += "목";}
            else if(holiday === 5){holidayStr += "금";}
            else if(holiday === 6){holidayStr += "토";}
            else if(holiday === 0){holidayStr += "일";}

            if(i !== holidayList.length-1){holidayStr += "/";}
        }
        return holidayStr;
    }
    
    return (
    
    
    
    <div>
    


      <table cellspacing="50" className={styles.tableinfo}>
        <tr className={styles.detail} ><td className={styles.attr}>자격증 정보</td> <td>{certificates.length === 0 ? "등록되지 않았어요!" : certificates.map((c) => c.name).join(', ')}</td> </tr>
        <tr className={styles.detail}><td className={styles.attr}>상담 대상</td> <td> {card.consultTarget ? card.consultTarget : "등록되지 않았어요!"}</td></tr>
        <tr className={styles.detail}><td className={styles.attr}>소개</td> <td>{card.longIntroduction ? card.longIntroduction : "등록되지 않았어요!"}</td></tr>
        <tr className={styles.detail}><td className={styles.attr}>연락 가능 시간</td> <td> {(card.contactStartTime === null || card.contactEndTime === null) ? "등록되지 않았어요!" : (`${card.contactStartTime} ~ ${card.contactEndTime}`)}</td></tr>
        <tr className={styles.detail}><td className={styles.attr}>예약 가능 시간</td> <td>{(card.reserveStartTime === null || card.reserveEndTime === null) ? "등록되지 않았어요!" : (`${card.reserveStartTime} ~ ${card.reserveEndTime}`)}</td></tr>
        <tr className={styles.detail}><td className={styles.attr}>휴일</td> <td>{returnHoliday()}</td> </tr>
                    
     </table>
    </div>
    
    );
}

export default CounselorDetailInfo;