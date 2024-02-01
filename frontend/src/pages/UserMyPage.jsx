import React from 'react';
import UserProfile from '../components/profile/UserProfile';
import Schedulebox from '../components/schedule/Schedulebox'

function UserMyPage (){
    return (
      <div>
        <h2 className='text-center'>마이페이지</h2>
        <UserProfile/>
        <Schedulebox/>
      </div>
    )
    }
  export default UserMyPage