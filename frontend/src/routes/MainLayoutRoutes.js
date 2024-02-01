
// 리액트
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 페이지
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import RegisterCounselorPage from '../pages/RegisterCounselorPage';
import CounListPage from '../pages/CounListPage';
import CounDetailPage from '../pages/CounDetailPage';
import CounMyPage from '../pages/CounMyPage'
import CounInfoChangePage from '../pages/CounInfoChangePage'
import UserInfoChangePage from '../pages/UserInfoChangePage';
import UserMyPage from '../pages/UserMyPage'
import DoneCounselPage from '../pages/DoneCounselPage';
import ManageDoneCounselPage from '../pages/ManageDoneCounselPage';
import ConferencePage from '../pages/ConferencePage';

// 컴포넌트
import NavigationBar from '../components/header/Navbar';


function MainLayoutRoutes({ authService ,imageUploader }) {
    return (
        <div>
            <React.Fragment />
            <NavigationBar authService={authService} />
            <Routes>
                <Route path="/" element={<HomePage />} />

                {/* 상담사 경로 */}
                <Route path="/counselordetail/:id" element={<CounDetailPage />} />
                <Route path="/counselorlist" element={<CounListPage authService={authService} />} />
                <Route path="/counmypage" element={<CounMyPage imageUploader={imageUploader} />} />
                <Route path="/counmypage/change" element={<CounInfoChangePage imageUploader={imageUploader}/>} />

                {/* 회원관리 경로 */}
                <Route path="/sign_in" element={<LoginPage authService={authService} />} />
                <Route path="/sign_up" element={<RegisterPage />} />
                <Route path="/sign_up/counselor" element={<RegisterCounselorPage />} />
                <Route path="/mypage" element={<UserMyPage authService={authService} />} />
                <Route path="/mypage/change" element={<UserInfoChangePage authService={authService} imageUploader={imageUploader} />} />

                {/* 상담관리 */}
                <Route path="/donecounsel/:scheduleNo" element={<DoneCounselPage authService={authService} />} />
                <Route path="/managedonecounsel/:scheduleNo" element={<ManageDoneCounselPage authService={authService} imageUploader= {imageUploader} />} />


                {/* 컨퍼런스 */}
                {/* 세션 아이디와 입장자, authService 확인 */}
                <Route path="/conference/:id" element={<ConferencePage />} />
            
            
            </Routes>
            <React.Fragment />
        </div>
    )
}

export default MainLayoutRoutes;