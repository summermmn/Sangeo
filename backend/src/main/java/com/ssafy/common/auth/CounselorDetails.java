package com.ssafy.common.auth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ssafy.db.entity.Counselor;

public class CounselorDetails implements UserDetails {
	@Autowired
	Counselor counselor;
	boolean accountNonExpired;
	boolean accountNonLocked;
	boolean credentialNonExpired;
	boolean enabled = false;
	List<GrantedAuthority> roles = new ArrayList<>();

	public CounselorDetails(Counselor counselor) {
		super();
		this.counselor = counselor;
	}

	public Counselor getCounselor() {
		return this.counselor;
	}

	@Override
	public String getPassword() {
		return this.counselor.getPassword();
	}

	@Override
	public String getUsername() {
		return this.counselor.getCounselorId();
	}

	@Override
	public boolean isAccountNonExpired() {
		return this.accountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return this.accountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return this.credentialNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return this.enabled;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles;
	}

	public void setAuthorities(List<GrantedAuthority> roles) {
		this.roles = roles;
	}
}
