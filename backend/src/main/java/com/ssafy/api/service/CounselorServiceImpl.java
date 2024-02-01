package com.ssafy.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.mapping.CounselorMapping;
import com.ssafy.api.request.CounselorRegisterPostReq;
import com.ssafy.api.request.CounselorUpdateReq;
import com.ssafy.api.request.PasswordUpdateReq;
import com.ssafy.db.entity.Counselor;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.CounselorRepository;

/**
 *	상담사 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("counselorService")
public class CounselorServiceImpl implements CounselorService{

	@Autowired
	CounselorRepository counselorRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public Counselor createCounselor(CounselorRegisterPostReq counselorRegisterInfo) {
		Counselor counselor = new Counselor();
		counselor.setCounselorId(counselorRegisterInfo.getCounselorId());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		counselor.setPassword(passwordEncoder.encode(counselorRegisterInfo.getPassword()));
		counselor.setName(counselorRegisterInfo.getName());
		counselor.setPhoneNumber(counselorRegisterInfo.getPhoneNumber());
		counselor.setProfile(counselorRegisterInfo.getProfile());
		counselor.setShortIntroduction(counselorRegisterInfo.getShortIntroduction());
		counselor.setContactStartTime(counselorRegisterInfo.getContactStartTime());
		counselor.setContactEndTime(counselorRegisterInfo.getContactEndTime());
		
		// 상담사 마이페이지 접근을 위해서, 초기 상담가능시간을 연락 가능시간과 같도록 두기
		counselor.setReserveStartTime(counselorRegisterInfo.getContactStartTime());
		counselor.setReserveEndTime(counselorRegisterInfo.getContactEndTime());
		
		return counselorRepository.save(counselor);
	}

	@Override
	public Counselor getCounselorByCounselorId(String counselorId) {
		if(!counselorRepository.findByCounselorId(counselorId).isPresent())
			return null;
		
		Counselor counselor = counselorRepository.findByCounselorId(counselorId).get();
		return counselor;
	}
	
	@Override
	public List<CounselorMapping> getAllCounselor(String searchWord) {
		System.out.println("search word : "+searchWord);
		List<CounselorMapping> clist = counselorRepository.getCounselorAndScoreList(searchWord);
		//List<CounselorMapping> clist = counselorRepository.findAllBy();
		return clist;
	}

	@Override
	public Counselor updateCounselor(CounselorUpdateReq updateCounselorInfo) { 
		Counselor counselor = counselorRepository.findByCounselorId(updateCounselorInfo.getCounselorId()).get();
		// 비밀번호를 제외한 모든 정보 수정 가능한 버전
		counselor.setName(updateCounselorInfo.getName());
		counselor.setPhoneNumber(updateCounselorInfo.getPhoneNumber());
		counselor.setProfile(updateCounselorInfo.getProfile());
		counselor.setShortIntroduction(updateCounselorInfo.getShortIntroduction());
		counselor.setContactStartTime(updateCounselorInfo.getContactStartTime());
		counselor.setContactEndTime(updateCounselorInfo.getContactEndTime());
		counselor.setCareer(updateCounselorInfo.getCareer());
		counselor.setLongIntroduction(updateCounselorInfo.getLongIntroduction());
		counselor.setReserveStartTime(updateCounselorInfo.getReserveStartTime());
		counselor.setReserveEndTime(updateCounselorInfo.getReserveEndTime());
		counselor.setConsultTarget(updateCounselorInfo.getConsultTarget());
		counselor.setPrice(updateCounselorInfo.getPrice());
		counselor.setConsultNumber(updateCounselorInfo.getConsultNumber());
		counselor.setHoliday(updateCounselorInfo.getHoliday());
		
		return counselorRepository.save(counselor);
	}

	@Override
	public Counselor updatePassword(PasswordUpdateReq passwordUpdateInfo) {
		Counselor counselor = counselorRepository.findByCounselorId(passwordUpdateInfo.getId()).get();
		// counselor가 null이거나 현재 비밀번호가 틀렸을 때 null 리턴
		if(counselor == null || !passwordEncoder.matches(passwordUpdateInfo.getPassword(), counselor.getPassword()))
			return null;
		// 비밀번호만 수정
		counselor.setPassword(passwordEncoder.encode(passwordUpdateInfo.getNewPassword()));
		return counselorRepository.save(counselor);
	}
	
	@Override
	public boolean confirmPassword(String counselorId, String password) {
		Counselor counselor = counselorRepository.findByCounselorId(counselorId).get();
		if(counselor == null || !passwordEncoder.matches(password, counselor.getPassword()))
			return false;
		return true;
	}
	
	@Override
	public void deleteCounselor(String counselorId) {
		counselorRepository.deleteByCounselorId(counselorId);
	}

}
