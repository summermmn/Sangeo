import React , {useState, useEffect} from 'react';
import styles from './counselorlist.module.css';
import CounselorCard from '../counselorcard/counselorcard';

const CounselorList = ({cards}) => {
    return (
    <section className={styles.counselorList}>
        <h1 className={styles.title}>상담사 목록</h1>
        
        <ul className={styles.cards}>
        {cards.map(card => (
                <CounselorCard card={card}/>
        ))}
        </ul>
    </section>
    )
};

export default CounselorList;