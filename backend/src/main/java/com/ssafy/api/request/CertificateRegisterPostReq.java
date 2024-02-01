package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 자격증 등록 API ([POST] /api/v1/certificates) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("CertificateRegisterPostRequest")
public class CertificateRegisterPostReq {
	@ApiModelProperty(name="상담사 ID", example="parkcs")
	String counselorId;
	@ApiModelProperty(name="자격증 이름", example="미술심리상담사 2급")
	String name;
	@ApiModelProperty(name="자격증 이미지", example="certificate.png")
	String img_path;
}
