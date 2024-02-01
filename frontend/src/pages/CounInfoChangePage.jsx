import React, {useState} from 'react';
import {Nav} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Certification from '../components/certification/certification';
import CounBasicChange from '../components/profile/CounBasicChange';
import CounPwChange from '../components/profile/CounPwChange';

export default function CounInfoChangePages({imageUploader}){
    const[tab, setTab] = useState(0);
   
    const location = useLocation();
    const counselorId = location.state.counselorId;
  
    function TabContent(props) {
      if(props.tab === 0){
        return <div><CounBasicChange imageUploader={imageUploader}></CounBasicChange></div>
      }else if(props.tab === 1) {
        return <div><CounPwChange/></div>
      }else{
        return <div><Certification imageUploader={imageUploader} Id = {counselorId}/></div>
      }

    }

    return(
        <>
        <Nav className="mt-3 mb-3 " variant ="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link eventKey="link-0" onClick={()=> setTab(0)}>기본 정보 변경 및 탈퇴 </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={()=> setTab(1)}>비밀번호 변경 </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" onClick={()=> setTab(2)}>자격 인증 </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tab={tab}  />
        </>
      )
}