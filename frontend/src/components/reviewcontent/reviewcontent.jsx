import React, { useState } from 'react';
import styles from '../reviewcontent/reviewcontent.module.css';

function ReviewContent( {onSetContent}) {
    const onafterCounsel = (event) => {
      onSetContent(event.currentTarget.value);   
    }

    return (
    <div>
        <textarea 
        className={styles.container} 
        placeholder ="상담 후기를 작성해주세요"
        onChange = {onafterCounsel} /> 

    </div>
  );
}

export default ReviewContent;

