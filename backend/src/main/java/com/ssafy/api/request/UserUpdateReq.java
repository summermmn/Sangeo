package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 정보 변경 API ([PUT] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserUpdateRequest")
public class UserUpdateReq {
	@ApiModelProperty(name="유저 ID", example="kimssafy")
	String userId;
	@ApiModelProperty(name="유저 Name", example="김싸피")
	String name;
	@ApiModelProperty(name="유저 PhoneNumber", example="01012345678")
	String phoneNumber;
	@ApiModelProperty(name="유저 Profile", example="basic.png")
	String profile;
}
