import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./calendar.module.css";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import axios from "axios";

const cx = classNames.bind(styles);

const Calendar = (props) => {
  const week = ["일", "월", "화", "수", "목", "금", "토"]; //일주일
  const dateTotalCount = new Date(props.selectedYear, props.selectedMonth, 0).getDate(); //선택된 연도, 달의 마지막 날짜
  const holiday = props.holiday === null ? null : props.holiday.split("/").map(Number);
  const [holidate, setHolidate] = useState(null);

  const YM = props.selectedYear + "-" + ("0" + props.selectedMonth).slice(-2);
  useEffect(() => {
    async function fetchData() {
      try{
          // console.log("fetch Data"+YM);
          const result = await axios.get(process.env.REACT_APP_DB_HOST+`/schedules/counselors/holidays/${props.counselorId}/${YM}`);
          // result.data에서 holiday만 뽑음
          setHolidate(result.data.map((rd)=>rd.holiday));
          // console.log(holidate);
          setTimeout(5000);
      }
      catch(error){
          alert(error);
      }
  };
  fetchData();

  },[props.counselorId, YM]);

  const preMonth = () => {
    //이전 달 보기 보튼
    /*
    if(props.selectedMonth <= props.today.month){
      alert("이전달은 예약 불가합니다.");
      return;
    }*/

    if (props.selectedMonth === 1) {
      props.setSelectedMonth(12);
      props.setSelectedYear(props.selectedYear - 1);
    } else {
      props.setSelectedMonth(props.selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    //다음 달 보기 버튼
    if (props.selectedMonth === 12) {
      props.setSelectedMonth(1);
      props.setSelectedYear(props.selectedYear + 1);
    } else {
      props.setSelectedMonth(props.selectedMonth + 1);
    }
  };

  const returnWeek = () => {
    //요일 반환 함수
    let weekArr = [];
    week.forEach((v, index) => {
      weekArr.push(
        <button
          key={index}
          className={cx(
            {day: true},
            {sunday: v === "일"},
            {saturday: v === "토"}
            )}
        >
          {v}
        </button>
      );
    });
    return <div className={styles.week}>{weekArr}</div>;
  };

  const clickDate = (date) => {
      props.setSelectedDate(Number(date));
  };

  const checkPrev = (date) => {
    if(props.selectedYear < props.today.year){
      return true;
    }
    else if(props.selectedYear === props.today.year){
      if(props.selectedMonth < props.today.month){
        return true;
      }
      else if(props.selectedMonth === props.today.month){
        if(date < props.today.date){
          return true;
        }
      }
    }
    return false;
  }

  const checkHoliday = (nowDay) => {
    // console.log(holiday);
    if(holiday === null){
      return false;
    }
    return holiday.includes(nowDay);
  }

  const checkHolidate = (date) => {
    if(holidate === null){
      return false;
    }
    return holidate.includes(date);
  }

  const returnDate = () => {
    //선택된 달의 날짜들 반환 함수
    let dates = [];
    const firstDay = new Date(props.selectedYear, props.selectedMonth - 1, 1).getDay();
    const lastDay = new Date(
      props.selectedYear,
      props.selectedMonth - 1,
      dateTotalCount
    ).getDay();
    const checkToday = (props.selectedYear === props.today.year) && (props.selectedMonth === props.today.month);  
    for (let i = 0; i < firstDay; i++) {
      // 1일 전 채우기
      dates.push(
        <div key={i - firstDay + 1} className={cx({ weekday: true })}></div>
      );
    }
    for (let date = 1; date <= dateTotalCount; date++) {
      const nowDay = new Date(props.selectedYear, props.selectedMonth - 1, date).getDay();
      dates.push(
        // 추가 : 오늘보다 전의 날짜는 disable 처리
        <button key={date} className={cx(
          {date: true},
          {sunday: nowDay === 0},
          {saturday: nowDay === 6},
          {today: checkToday && date === props.today.date},
          {notWork: checkHoliday(nowDay) || checkPrev(date) || checkHolidate(date)}
          )}
          onClick={(e)=>{
            clickDate(e.target.innerText);
          }}
          >
          {date}
        </button>
      );
    }
    for (let i = lastDay + 1; i < 7; i++) {
      // 마지막일 전 채우기
      dates.push(
        <div
          key={dateTotalCount + i - lastDay}
          className={cx({ weekday: true })}
        ></div>
      );
    }

    let date7Arr = [];
    for (let i = 0; i < dates.length / 7; i++) {
      // 일주일씩 div로 묶어서 push
      let date7 = dates.slice(i * 7, i * 7 + 7);
      date7Arr.push(
        <div key={i} className={cx({ week: true })}>
          {date7}
        </div>
      );
    }
    return date7Arr;
  };

  return (
    <div className="col-6 p-3 border border-secondary border-1 rounded shadow">
      <div className={styles.cal_header}>
        <AiFillLeftCircle onClick={preMonth}/>
        <h3 className={styles.cal_title}>{props.selectedYear}.{props.selectedMonth}</h3>
        <AiFillRightCircle onClick={nextMonth}/>
      </div>
      <div className={styles.calForm}>
        {returnWeek()}
        {returnDate()}
      </div>
    </div>
  );
};

export default Calendar;