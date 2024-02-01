import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../pages/UserInfoChangePage.module.css';
import { useSelector } from 'react-redux';

export default function CounPwChange() {
    const id = useSelector(state => state.user.user.id); // 현재 로그인한 아이디

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordCheck, setNewPasswordCheck] = useState('');

    const [disable, setDisable] = React.useState(true);
    const [isPassword, setIsPassword] = useState(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

    function passwordChange(e) {
        setPassword(e.target.value);
    }

    function newPasswordChange(e) {

        const regul2 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        const PwdCurrent = e.currentTarget.value;
        setNewPassword(PwdCurrent);

        if (!regul2.test(PwdCurrent)) {
            setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요! ㅠㅠ');
            setIsPassword(false);
        } else {
            setPasswordMessage('안전한 비밀번호입니다!! :)');
            setIsPassword(true);
        }

    }

    function newPasswordChangeCheck(e) {
        const PwdConfirmCurrent = e.currentTarget.value;

        if (newPassword === PwdConfirmCurrent) {
            setPasswordConfirmMessage('비밀번호가 일치합니다 :) ');
            setIsPasswordConfirm(true);
            setDisable(false);

        } else {
            setPasswordConfirmMessage('비밀번호가 일치하지 않습니다! ');
            setIsPasswordConfirm(false);
        }
        setNewPasswordCheck(e.target.value);
    }

    // 비밀번호 수정
    function onClickUpdate() {
        if (newPassword === newPasswordCheck) {
            axios.put(process.env.REACT_APP_DB_HOST + '/counselors/password', {
                id: id,
                password: password,
                newPassword: newPassword
            })
                .then(function (result) {
                    alert("비밀번호가 수정되었습니다!");
                }).catch(function (err) {
                    if (err.response.status === 401) {
                        alert("비밀번호가 틀렸습니다.");
                    }
                    else {
                        alert(err);
                    }
                });
        }
        else {
            alert("비밀번호가 일치하지 않습니다!");
        }
    }


    return (
        <div className='text-center'>
            <div>
                <div>기존 비밀번호</div>
                <div>
                    <input type="password" onChange={passwordChange} />
                </div>
                <div>새로운 비밀번호</div>
                <div><input type="password" onChange={newPasswordChange} /></div>
                <div className="message">
                    {newPassword.length > 0 && (
                        <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>
                    )}
                </div>
                <div>비밀번호 확인</div>
                <div><input type="password" onChange={newPasswordChangeCheck} /></div>
                <div className="message">
                    {newPasswordCheck.length > 0 && (
                        <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>
                    )}
                </div>
            </div>
            <button className={styles.ubcBtn + " " + (!disable ? 'Activate' : 'Disabled')}
                disabled={disable}
                onClick={onClickUpdate}>수정
            </button>





        </div>
    )
}