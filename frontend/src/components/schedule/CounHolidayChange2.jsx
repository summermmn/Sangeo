import {React, useState, useEffect} from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import { PropaneSharp } from '@mui/icons-material';

export default function CounHolidayChange(){   
    const user = useSelector(state => state.user.user); 
    const year = (new Date().getFullYear())
    const month = ('0' + (new Date().getMonth()+2)).slice(-2)
    const URL = process.env.REACT_APP_DB_HOST+`/schedules/counselors/holidays/${user.id}/${year}-${month}` 
    const URLP = process.env.REACT_APP_DB_HOST+`/schedules/holiday` //휴일만들기
    const days = new Date(year,month,0).getDate()
    const [holidays,setHolidays] = useState()
    const [selected,setSelected] = useState()
    const options = []
    for (let i=0; i<days; i++){options[i]=<option value={('0'+(i+1)).slice(-2)}>{i+1} 일</option>}

    useEffect(()=>{
        axios.get(URL)
        .then(function(response){
            console.log(response.data,'8월')
            console.log(days,'dddd')
            setHolidays(response.data.map((x)=><button value={x.id} onClick={holidayDelete}>{x.holiday}일 X</button>))
        })
    },[])


    function holidayDelete(e){
        console.log(e.target.value)
        axios.delete(process.env.REACT_APP_DB_HOST+`/schedules/${e.target.value}`)
        .then(()=>{
            axios.get(URL)
            .then(function(response){
                console.log(response.data,'8월')
                console.log(days,'dddd')
                setHolidays(response.data.map((x)=><button value={x.id} onClick={holidayDelete}>{x.holiday}일 X</button>))})
            
        })
    }
    
    function changeSelect(e){
        setSelected(e.target.value)
        console.log(e.target.value)
    }

    function makeHoliday(){
        console.log(holidays.map((x)=>x.props.children[0]))
        if (holidays.map((x)=>x.props.children[0]).includes(selected)){ console.log('있음')}
        else if (holidays.map((x)=>'0'+x.props.children[0]).includes(selected)){console.log('있음')}
        else{
            axios.post(URLP,{
                "counselorId": `${user.id}`,
                "dates": [
                `${year}-${month}-${selected}`,
                ]
            })
            .then(()=>{
                axios.get(URL)
                .then(function(response){
                    console.log(response.data,'8월')
                    console.log(days,'dddd')
                    setHolidays(response.data.map((x)=><button value={x.id} onClick={holidayDelete}>{x.holiday}일 X</button>))})
                
            })
        }
    }

    return(
        <div>
            <div>{new Date().getMonth()+2}월 휴일</div>
            {holidays}
            <div>
                <span>추가 생성</span>
                <select onChange={changeSelect}>
                    {options}
                </select>
                <button onClick={makeHoliday}>만들기</button>
            </div>
        </div> 
    )
}