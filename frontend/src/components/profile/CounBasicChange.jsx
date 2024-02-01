import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from '../../pages/UserInfoChangePage.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import setAuthorizationToken from "../../utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import PwModal from '../pwmodal/PwModal';

export default function CounBasicChange({ imageUploader }) {
    //aixos로 최초정보 받음
    //보낼 폼 sendinfo
    //아이디 중복확인버튼 해당아이디를 사용하는 사람이 있는지 확인
    //회원탈퇴시 한번더 물어보기
    const URL = '/counselors/me';
    const [info, setInfo] = useState('');
    const [id, setId] = useState('');
    const [newname, setName] = useState('');
    const [newphonenumber, setPhonenumber] = useState('');
    const [newprofile, setProfile] = useState('');
    const [shortIntroduction, setShort] = useState()
    const [longIntroduction, setLong] = useState()
    const [price, setPrice] = useState()
    const [consultTarget, setConsultTarget] = useState([])
    const target = ['아동', '청소년', '성인(여)', '성인(남)']
    const [targetbox, setTargetBox] = useState()


    //파일 미리볼 url을 저장해줄 state
    const [fileImage, setFileImage] = useState("");
    const [textValue, setTextValue] = useState("");
    const [imgName, setImgName] = useState("");
    // 서버에서 받아온 이미지 경로
    const [imgURL, setImgURL] = useState("");

    // 버튼 이미지 바꾸기
    const [imgbtn, setImgbtn] = useState(true);
    const [targetimg, setTargetImg] = useState("");

    // 모달 관련
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // 모달에서 받을 비밀번호
    const [password, setPassword] = useState(null);
    // 비밀번호 체크 후 update인지 delete인지 파악
    const [isUpdate, setIsUpdate] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputRef = useRef();
    const reader = new FileReader();

    useEffect(() => {
        axios.get(process.env.REACT_APP_DB_HOST + URL)
            .then(function (response) {
                setInfo(response.data);
                console.log("response.!!!!", response.data);
            })
            .catch(function (error) {
                if (error.response.status === 401) { // 토큰 만료
                    alert("다시 로그인해주세요.");
                    // 로그아웃 처리
                    localStorage.removeItem("Authorization");
                    setAuthorizationToken(null);
                    dispatch({ type: 'LOG_OUT' });
                    // 로그인 페이지로 이동
                    navigate('/sign_in');
                }
                else if (error.response.status === 403) {
                    alert("로그인 후 접근 가능한 페이지입니다.");
                    // 로그인 페이지로 이동
                    navigate('/sign_in');
                }
                else {
                    alert(error);
                }
            }
            )
    }, [])



    useEffect(() => {
        if (info) {
            // setConsultTarget(info.consultTarget.split('/'))
            setId(info.counselorId);
            setName(info.name);
            setPhonenumber(info.phoneNumber);
            setProfile(info.profile);
            setShort(info.shortIntroduction);
            setLong(info.longIntroduction);
            setPrice(info.price);
            if (info.consultTarget)
                setConsultTarget(info.consultTarget.split("/"));
            setTargetBox(target.map((t) => <div><p>{t}</p><input checked={consultTarget.includes(t)} onChange={TargetChange} type="checkbox" value={t} /></div>))
        }
    }, [info])

    useEffect(() => {
        setTargetBox(target.map((t) => <div><p>{t}</p><input checked={consultTarget.includes(t)} onChange={TargetChange} type="checkbox" value={t} /></div>))
    }, [consultTarget])


    function nameChange(e) {
        setName(e.target.value);
    }

    function profileChange(e) {
        setProfile(e.target.value);
    }

    function phonenumberChange(e) {
        setPhonenumber(e.target.value);
    }
    function ShortChange(e) {
        setShort(e.target.value)
    }
    function PriceChange(e) {
        setPrice(e.target.value)
    }
    function LongChange(e) {
        setLong(e.target.value)
    }
    function TargetChange(e) {
        let newtarget = consultTarget;
        if (newtarget.includes(e.target.value)) {
            newtarget = newtarget.filter((x) => x !== e.target.value)
        }
        else {
            newtarget.push(e.target.value);
        }
        setConsultTarget(newtarget);
        setTargetBox(target.map((t) => <div><p>{t}</p><input checked={consultTarget.includes(t)} onChange={TargetChange} type="checkbox" value={t} /></div>))
    }

    function checkInput() {
        if (!newname || !newphonenumber || !newprofile || !shortIntroduction || !price || !longIntroduction || !consultTarget) {
            alert("모든 값을 입력해주세요.");
            return false;
        }
        return true;
    }


    async function checkPassword() {
        console.log(password);
        if (password === null) {
            return;
        }

        let check = false;
        await axios.post(process.env.REACT_APP_DB_HOST + `/counselors/password/${id}`, {
            password: password
        })
            .then(function (result) { // 비밀번호 일치
                console.log(result);
                check = true;
            }).catch(function (err) {
                alert(err.response.data);
            });

        if (!check) {
            return;
        }

        if (isUpdate) {
            const counselor = {
                id: id,
                password: password
            };
            updateBasic(counselor);
        }
        else {
            deleteCounselor();
        }
    }

    async function updateBasic(counselor) {
        let newinfo = info;
        delete newinfo.id;
        delete newinfo.password;
        newinfo.name = newname;
        newinfo.phoneNumber = newphonenumber;
        newinfo.shortIntroduction = shortIntroduction;
        newinfo.price = price;
        newinfo.consultTarget = consultTarget.join('/');
        newinfo.longIntroduction = longIntroduction;
        newinfo.profile = newprofile;

        await axios.put(process.env.REACT_APP_DB_HOST + '/counselors', newinfo)
            .then(function (result) {
                // Navbar에서 바로 적용되게 새로 로그인 처리
                axios.post(process.env.REACT_APP_DB_HOST + "/auth/counselor/login", counselor)
                    .then(function (result) {
                        localStorage.setItem("Authorization", result.data.accessToken);
                        // token이 필요한 API 요청시 헤더에 token 담아서 보냄
                        setAuthorizationToken(result.data.accessToken);
                        dispatch({ type: "LOG_IN", user: jwtDecode(result.data.accessToken) });
                        alert("정보가 수정되었습니다!");
                    }).catch(function (err) {
                        alert(err);
                    });
            }).catch(function (err) {
                alert(err);
            });

    }

    function onClickUpdate() {
        if (!checkInput())
            return;

        setIsUpdate(true);
        setPassword(null); // 초기화
        handleShow();
    }


    function deleteCounselor() {
        axios.delete(process.env.REACT_APP_DB_HOST + `/counselors/${id}`)
            .then(function (result) {
                // 로그아웃 처리
                localStorage.removeItem("Authorization");
                setAuthorizationToken(null);
                dispatch({ type: 'LOG_OUT' });
                alert("탈퇴되었습니다!");
                navigate('/');
            }).catch(function (err) {
                alert(err);
            });
    }

    // 상담사 탈퇴
    function onClickDelete() {
        setIsUpdate(false);
        setPassword(null); // 초기화
        handleShow();
    }

    // 이미지 업로드 버튼
    const onButtonClick = async (event) => {
        event.preventDefault();
        inputRef.current.click();

    }

    // 이미지 등록 버튼
    const onButtonPost = async (event) => {
        const uploaded = await imageUploader.upload(targetimg);
        await setProfile(uploaded.url);
    }

    // 파일 저장
    const saveFileImage = async (event) => {
        if (event.target.files[0]) {
            setTargetImg(event.target.files[0]);
            reader.readAsDataURL(event.target.files[0]);
        }
        reader.onloadend = () => {
            const previewImgUrl = reader.result;

            if (previewImgUrl) {
                setFileImage(previewImgUrl);
            }
        }

        setImgbtn(false);
    };


    return (
        <div className='text-center'>
            <div>
                <div>아이디</div>
                <div>
                    <input value={id ? id : ""} disabled />
                </div>
                <div>프로필</div>
                <div>
                    {/* 우선 서버 basic.png 사용 */}
                    <div>{newprofile && (<img alt="sample" src={newprofile === "basic.png" ? "https://i7e207.p.ssafy.io/basic.png" : newprofile} className={styles.imgframe} />)}</div>
                    <input
                        ref={inputRef}
                        className={styles.input}
                        name="imgUpload"
                        type="file"
                        accept="image/*"
                        onChange={saveFileImage}
                    />
                    {imgbtn ? <button className={styles.button} onClick={onButtonClick}> 이미지 업로드 </button> : <button className={styles.button} onClick={onButtonPost}> 등록하기 </button>}

                </div>
                <div>이름</div>
                <div>
                    <input onChange={nameChange} value={newname ? newname : ""} />
                </div>
                <div>연락처</div>
                <div><input onChange={phonenumberChange} value={newphonenumber ? newphonenumber : ""} /></div>
                <div>소개</div>
                <div>
                    <input onChange={ShortChange} value={shortIntroduction ? shortIntroduction : ""} />
                </div>
                <div>상담비용</div>
                <div>
                    <input onChange={PriceChange} value={price ? price : ""} />
                </div>
                <div>상담대상</div>
                <div>
                    {targetbox}
                </div>
                <div>상세자기소개</div>
                <div>
                    <input onChange={LongChange} value={longIntroduction ? longIntroduction : ""} />
                </div>
            </div>
            <button className={styles.ubcBtn} onClick={onClickUpdate}>수정</button>
            <br />
            <button className={styles.ubcBtn} onClick={onClickDelete}>회원탈퇴</button>
            <PwModal show={show} handleClose={handleClose} setPassword={setPassword} checkPassword={checkPassword}></PwModal>
        </div>
    )
}