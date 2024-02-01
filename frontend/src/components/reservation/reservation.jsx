import React, { useState } from "react";
import Calendar from "../calendar/calendar";
import ReservationTime from "../reservationtime/reservationtime";
import "./reservation.module.css";

function Reservation({counselorId, rst, ret, holiday}) {
  const [today] = useState({
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: new Date().getDay(), //오늘 요일
  });

  const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState(today.month); //현재 선택된 달
  const [selectedDate, setSelectedDate] = useState(today.date); //현재 선택된 일

    return (
    <div className="board">
      {rst === null || ret === null ? 
      <div className="text-center">아직 상담사님이 예약 가능 시간을 등록하지 않으셨어요!</div>
      :
      <>
        <div className="row bar"></div>
        <div className="row body">
        <Calendar counselorId={counselorId} selectedYear={selectedYear} setSelectedYear={setSelectedYear} selectedMonth={selectedMonth} 
        setSelectedMonth={setSelectedMonth} selectedDate={selectedDate} setSelectedDate={setSelectedDate}
        today={today}
        holiday={holiday}/> {/* 받을 때 일 -> 0, 토 -> 6 이런 식으로 받도록 */}
        <ReservationTime rst={rst === null ? "" : rst} ret={ret === null ? "" : ret} counselorId={counselorId}
        selectedYear={selectedYear} selectedMonth={selectedMonth} selectedDate={selectedDate} today={today}/>
        </div>
      </>}
      </div> 
    );
  }
  
  export default Reservation;
  