import React, {useState ,useEffect} from 'react';
import styles from './CounDetailPage.module.css';
import './CounDetailPage.module.css';
import { useLocation} from "react-router-dom";
import Tabcounselordetail from '../components/tabcounselordetail/tabcounselordetail';
import StarRatings from 'react-star-ratings';
import { FaRegSadCry } from 'react-icons/fa'

const CounDetailPage = ({card}) => {

    const location = useLocation();
    useEffect(() => {
    //console.log(location);
    }, [ location ])
    const Councard = location.state.card;


// ========================================================
   
    return (
        <section >
            <div className={styles.card}>
                {/*src에 전체 url을 적거나 항상 루트 폴더를 같게 지정해야 함*/}
                {/*cloud에서 이미지 불러오도록 수정*/}
                {/* 서버에서는 이미지 링크 "https://i7e207.p.ssafy.io/" */}
                <img className={styles.avatar} src={Councard.profile === "basic.png" ? "https://i7e207.p.ssafy.io/basic.png" : Councard.profile} alt ="profile photo" />
                <div className={styles.info}>
                    <div className={styles.name}>{Councard.name}
                    <span className={styles.score}>
                    { Councard.avgScore ?
                    (
                    <StarRatings
                    rating={Councard.avgScore}
                    starRatedColor="hotpink"
                    numberOfStars={5}
                    name='rating'
                    starDimension='1.5rem'
                    starSpacing='2px'
                    />
                    )
                    :
                    (<span className={styles.noreview}>등록된 후기가 없어요 <FaRegSadCry/></span>)
                } </span>
                      
                    </div>

                    <table className={styles.table}>
                    <tr className={styles.detail}><td className={styles.attr}>전화번호</td> <td>{Councard.phoneNumber}</td> </tr>
                    <tr className={styles.detail}><td className={styles.attr}>소개</td> <td> {Councard.shortIntroduction}</td></tr>
                    <tr className={styles.detail}><td className={styles.attr}>상담비용</td> <td>{Councard.price}</td></tr>
                    
            
                </table>

               
                </div>

               
            </div>
            <div className={styles.tab}>
                <Tabcounselordetail card={Councard} />
            </div>
            
        </section>
        
        
        );


};

export default CounDetailPage;