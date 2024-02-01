import React from 'react';
import styles from './CounListPage.module.css';
import Footer from  '../components/footer/footer';
import Card from '../components/counselorcard/counselorcard'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

const CounListPage = () => {
    const [cards, setCards] = useState([]); //카드목록
    const [cardList, setCardList] = useState([]);
    
    const location = useLocation();
    const searchWord = location.search.split("=")[1];
    
    useEffect(()=>{
        let url = process.env.REACT_APP_DB_HOST+"/counselors";
        if(searchWord){
            url += "/search";
        }
        axios.get(url, {params :{searchWord: decodeURI(searchWord)}})
        .then(function (response){
            setCards(response.data)} //카드에 받아온 값 넣음           
        )
        .catch(function(err){
            alert(err);
            })                  
        },[searchWord])

    useEffect(()=> {
        if(cards.length > 0){setCardList(cards.map((card)=><Card card={card}/>))}
        else{setCardList([])}
    },[cards])
    
    




    // 가격 오름차순 정렬    
    const onSortPrice = () => {
        const sortPrice = [...cards];
        setCards(sortPrice.sort((a,b) => {
            return a.price - b.price;
    }))}

    // 후기 내림차순 정렬    
    const onSortScore = () => {
        const sortScore = [...cards];
        setCards(sortScore.sort((a,b) => {
            return b.avgScore - a.avgScore;
    }))}


    return (
        <section className={styles.list}>
            <div className={styles.container} >
                {cardList.length === 0 ?
                <div  className={styles.header}><h3>검색된 상담사가 없습니다.</h3></div>
                :
                <>
                <div className={styles.sort}>
                    <button className={styles.btn} onClick={onSortPrice}> 가격순</button>
                    <button className={styles.btn} onClick={onSortScore}> 평점순</button>
                </div>
                <div className={styles.cards}>
                {cardList}
                </div> 
                </>}
            </div>
        </section>
    )
}

export default CounListPage;