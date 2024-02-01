import React, {useRef, useState, useEffect} from 'react';
import styles from './certification.module.css';
import axios from 'axios';


function Certification({imageUploader , Id}) {
    
    const inputRef = useRef();
    const reader = new FileReader();

    const [targetimg, setTargetImg] = useState("");
    const [fileImage, setFileImage] = useState("");
    const [ imgURL, setImgURL] = useState("");
    const[ textValue, setTextValue] = useState("");

    const [auth, setAuth] = useState();
    const [certificates, setCertificates] = useState([]);

    console.log(Id);
    const counselorId = Id;

    const getCertificates = async () => {
        await axios.get(process.env.REACT_APP_DB_HOST+`/certificates/${counselorId}`)
        .then(response=>{
            setAuth(response.data);
        });
    }

    // 자격증 인증 정보가 있다면 불러오기
    useEffect(()=>{
        getCertificates();
    },[]);

    useEffect(()=> {
        if(auth){
            setCertificates(auth);
        }
    }, [auth]);

    const deleteCertificate = (e) => {
        alert("정말로 삭제할까요?");
        axios.delete(process.env.REACT_APP_DB_HOST+`/certificates/${e.target.value}`)
        .then(response=>{
            alert(response.data);
            // 삭제했으므로 자격증 리스트 새로 get
            getCertificates();
        });
    }

    const returnContent = () => {
        let content = [];

        if(certificates === null || certificates === undefined || certificates.length === 0){
            return <div>등록된 자격증이 없습니다.</div>;
        }

        for(let i = 0; i < certificates.length; i++){
          content.push(
            <li key={i}>
                <a href={certificates[i].imgPath} target="_blank" rel="noopener noreferrer">{certificates[i].name}</a> 
                <button className={styles.deleteBtn} onClick={deleteCertificate} value={certificates[i].id}>삭제</button>
            </li>
          )
        };
        return content;
    }


     // 이미지 업로드 버튼
     const onButtonClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    }


    // 파일 저장
    const saveFileImage = async (event) => {
        if(event.target.files[0]){
            setTargetImg(event.target.files[0]);
            reader.readAsDataURL(event.target.files[0]);
        }
        reader.onloadend = () => {
            const previewImgUrl = reader.result;

            if(previewImgUrl){
                setFileImage(previewImgUrl);
            }
        }
    };

    const onChange = (event) => {
        setTextValue(event.target.value);
    }

    // 이미지 & 자격증명 업로드 
    const onSubmit = async () => {
        const uploaded = await imageUploader.upload(targetimg);
        setImgURL(uploaded.url);
        const url = '/certificates';

        axios.post(process.env.REACT_APP_DB_HOST+url, {
            counselorId: counselorId,
            img_path: uploaded.url,
            name: textValue,

        })
        .then(function (response) {
             alert("저장 완료");
             // 추가했으므로 자격증 리스트 새로 get
             getCertificates();
        }).catch(function (error) {
            // 오류발생시 실행
        });

    }


    return (
      <div className='text-center'>
        <div> 자격증 등록하기</div>
        { fileImage ? (
          <div>
            <img alt="sample" src={fileImage} className={styles.imgframe} />
            <div>
              <span>자격증명 </span>
              <input
                type="text"
                placeholder="자격증명을 입력해주세요. "
                className={styles.authName}
                onChange={onChange}
              />
            </div>
            <button className={styles.button} onClick={onSubmit}>
              {" "}
              인증하기
            </button>

            <input
              ref={inputRef}
              className={styles.input}
              name="imgUpload"
              type="file"
              accept="image/*"
              onChange={saveFileImage}
            />
          </div>
        ) : (
          <div>
            <button className={styles.authbtn} onClick={onButtonClick}>
              {" "}
              자격증 사진 올리기
            </button>
            <div>
              <div>자격증명 </div>
              <input
                type="text"
                placeholder="자격증명을 입력해주세요. "
                className={styles.authName}
                onChange={onChange}
              />
            </div>
            <button className={styles.button} onClick={onSubmit}>
              {" "}
              인증하기
            </button>

            <input
              ref={inputRef}
              className={styles.input}
              name="imgUpload"
              type="file"
              accept="image/*"
              onChange={saveFileImage}
            />
          </div>
        )}

        <div className="mt-3"> 등록한 자격증 목록</div>
        <div className="ml-1">{returnContent()}</div>
      </div>
    );
  
            
           



}

export default Certification;
