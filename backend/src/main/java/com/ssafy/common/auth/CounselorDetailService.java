package com.ssafy.common.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.ssafy.api.service.CounselorService;
import com.ssafy.db.entity.Counselor;

@Component
public class CounselorDetailService implements UserDetailsService{
	@Autowired
	CounselorService counselorService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Counselor counselor = counselorService.getCounselorByCounselorId(username);
		if(counselor != null) {
			CounselorDetails counselorDetails = new CounselorDetails(counselor);
			return counselorDetails;
		}
		return null;
	}

}
