package com.ssafy.api.response;

import com.ssafy.db.entity.Certificate;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CertificateResponse")
public class CertificateRes {
	@ApiModelProperty(name="Certificate Id")
	Long id;
	@ApiModelProperty(name="Counselor Id")
	String counselorId;
	@ApiModelProperty(name="Counselor Name")
	String counselorName;
	@ApiModelProperty(name="Certificate Name")
	String name;
	@ApiModelProperty(name="Certificate Image Path")
	String imgPath;
	
	public static CertificateRes of(Certificate certificate) {
		CertificateRes res = new CertificateRes();
		res.setId(certificate.getId());
		res.setCounselorId(certificate.getCounselor().getCounselorId());
		res.setCounselorName(certificate.getCounselor().getName());
		res.setName(certificate.getName());
		res.setImgPath(certificate.getImgPath());
		return res;
	}
}
