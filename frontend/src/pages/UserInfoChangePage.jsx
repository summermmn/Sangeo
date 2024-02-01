import React, {useState} from 'react';
import {Nav} from 'react-bootstrap';
import UserBasicChange from '../components/profile/UserBasicChange';
import UserPwChange from '../components/profile/UserPwChange';
import { useLocation} from "react-router-dom";

export default function UserInfoChange({imageUploader}){

    const location = useLocation();
    const naverUser = location.state.naverUser;

    const[tab, setTab] = useState(0);
 
    function TabContent(props) {
      if(props.tab === 0){
        return <div><UserBasicChange imageUploader={imageUploader} naverUser={naverUser}></UserBasicChange></div>
      }else if(props.tab === 1) {
        return <div><UserPwChange></UserPwChange></div>
      }
    }

    return(
        <>
        <Nav className="mt-3 mb-3 " variant ="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link eventKey="link-0" onClick={()=> setTab(0)}>기본 정보 변경 및 탈퇴 </Nav.Link>
          </Nav.Item>
          {naverUser ? "" 
          : 
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={()=> setTab(1)}>비밀번호 변경 </Nav.Link>
          </Nav.Item>}
        </Nav>
        <TabContent tab={tab}  />
        </>
      )
}