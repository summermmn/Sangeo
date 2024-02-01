package com.ssafy.api.service;

import com.ssafy.api.request.PasswordUpdateReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserUpdateReq;
import com.ssafy.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo, boolean isNaverUser);
	User getUserByUserId(String userId);
	User updateUser(UserUpdateReq userUpdateInfo);
	User updatePassword(PasswordUpdateReq passwordUpdateInfo);
	boolean confirmPassword(String userId, String password);
	boolean deleteUser(String userId);
}
