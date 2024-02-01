package com.ssafy.api.mapping;

import com.ssafy.db.entity.Counselor;

public class CertificateMapping {
	
	private Long id;
	private Counselor counselor;
	private String name;
	private String imgPath;
	
	public CertificateMapping(Long id, Counselor counselor, String name, String imgPath) {
		super();
		this.id = id;
		this.counselor = counselor;
		this.name = name;
		this.imgPath = imgPath;
	}

	public Long getId() {
		return id;
	}

	public String getCounselorId() {
		return counselor.getCounselorId();
	}

	public String getCounselorName() {
		return counselor.getName();
	}

	public String getName() {
		return name;
	}
	
	public String getImgPath() {
		return imgPath;
	}
}
