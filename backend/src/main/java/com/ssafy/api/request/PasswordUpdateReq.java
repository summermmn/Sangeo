package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 비밀번호 변경 API ([PUT] /api/v1/users/password), ([PUT] /api/v1/counselors/password) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("PasswordUpdateRequest")
public class PasswordUpdateReq {
	@ApiModelProperty(name="ID", example="kimssafy")
	String id;
	@ApiModelProperty(name="Password", example="abc123")
	String password;
	@ApiModelProperty(name="new Password", example="dkse4518")
	String newPassword;
}
