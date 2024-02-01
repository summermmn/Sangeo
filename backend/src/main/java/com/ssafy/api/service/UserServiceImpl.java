package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.PasswordUpdateReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserUpdateReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	
	//@Autowired
	//UserRepositorySupport userRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo, boolean isNaverUser) {
		User user = new User();
		user.setUserId(userRegisterInfo.getUserId());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		if(userRegisterInfo.getPassword() != null)
			user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
		user.setName(userRegisterInfo.getName());
		user.setPhoneNumber(userRegisterInfo.getPhoneNumber());
		user.setProfile(userRegisterInfo.getProfile());
		user.setNaverUser(isNaverUser);
		return userRepository.save(user);
	}

	@Override
	public User getUserByUserId(String userId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		if(!userRepository.findByUserId(userId).isPresent())
			return null;
		
		User user = userRepository.findByUserId(userId).get();
		return user;
		
	}

	@Override
	public User updateUser(UserUpdateReq userUpdateInfo) {
		User user = userRepository.findByUserId(userUpdateInfo.getUserId()).get();
		// 비밀번호는 제외하고 수정
		user.setName(userUpdateInfo.getName());
		user.setPhoneNumber(userUpdateInfo.getPhoneNumber());
		user.setProfile(userUpdateInfo.getProfile());

		return userRepository.save(user);
	}
	
	@Override
	public User updatePassword(PasswordUpdateReq passwordUpdateInfo) {
		User user = userRepository.findByUserId(passwordUpdateInfo.getId()).get();
		// user가 null이거나 현재 비밀번호가 틀렸을 때 null 리턴
		if(user == null || !passwordEncoder.matches(passwordUpdateInfo.getPassword(), user.getPassword()))
			return null;
		// 비밀번호만 수정
		user.setPassword(passwordEncoder.encode(passwordUpdateInfo.getNewPassword()));
		return userRepository.save(user);
	}
	
	@Override
	public boolean confirmPassword(String userId, String password) {
		User user = userRepository.findByUserId(userId).get();
		if(user == null || !passwordEncoder.matches(password, user.getPassword()))
			return false;
		return true;
	}

	@Override
	public boolean deleteUser(String userId) {
		User user = userRepository.findByUserId(userId).get();
		// user가 null이면 false 리턴
		if(user == null)
			return false;
		userRepository.deleteByUserId(userId);
		return true;
	}
}
