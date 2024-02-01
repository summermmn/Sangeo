import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Request from './CounRequest'
import axios from 'axios';
import Pagination from 'react-js-pagination';

export default function CounRequest (props){
    //본인인경우 아니면 오류페이지로
    const user = useSelector(state => state.user.user);
    const [conference,setConference] = useState([]) //리스트들
    const [onoff,setOnoff] = useState("오래된")
    const [list,setList] = useState([]) //컨퍼런스 복사한 리스트
    const [page, setPage] = useState(1);
    const URL = process.env.REACT_APP_DB_HOST+`/schedules/counselors/${user.id}`
    
    useEffect(()=>{
    //console.log(process.env.REACT_APP_DB_HOST//+URL)
      axios.get(URL)
      .then(function (response) {
              console.log(response.data,'data')
              setConference(response.data.filter(x=>x.confirmed===false && x.userId!==null))
    });    
    },[])
    
    useEffect(()=>{
        //console.log(process.env.REACT_APP_DB_HOST//+URL)
        axios.get(URL)
        .then(function (response) {
            console.log(conference,'con')
            if (conference.length>0){setList(conference.map((x)=>(<Request props={x}/>)))}}
        );},[conference])



    function clickButton(){
        console.log("버튼")
        setList(list.reverse())
        if (onoff === "최신순"){setOnoff(onoff=>"오래된")}
        else {setOnoff(onoff=>"최신순")}
        if (conference.length>0){setList(conference.map((x)=>(<Request props={x}/>)))}
            }
    
    const handlePageChange = page => {
        setPage(page);
        console.log(page)
      };
      

    return (
      <div>

        <div>
            <button className="button" onClick={clickButton}>{onoff}</button>
            <div>{list.slice((page-1)*10,(page-1)*10+10)}</div>
            <div>총 {list.length} 개</div>
        </div>
        <div>
        <Pagination
            activePage={page}//현재 페이지
            itemsCountPerPage={parseInt((list.length-1)/10)+1}
            totalItemsCount={list.length}//전체 아이템 개수
            pageRangeDisplayed={parseInt((list.length-1)/10)+1}
            prevPageText="‹"
            nextPageText="›"
            onChange={handlePageChange}
            />
        </div>
      </div>
    )
    }