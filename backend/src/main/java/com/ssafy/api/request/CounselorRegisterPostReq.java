package com.ssafy.api.request;

import java.time.LocalTime;

import org.springframework.format.annotation.DateTimeFormat;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 상담사 회원가입 API ([POST] /api/v1/counselors) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("CounselorRegisterPostRequest")
public class CounselorRegisterPostReq {
	@ApiModelProperty(name="상담사 ID", example="parkcs")
	String counselorId;
	@ApiModelProperty(name="상담사 Password", example="your_password")
	String password;
	@ApiModelProperty(name="상담사 Name", example="박상담")
	String name;
	@ApiModelProperty(name="상담사 PhoneNumber", example="01012345678")
	String phoneNumber;
	@ApiModelProperty(name="상담사 Profile", example="basic.png")
	String profile;
	@ApiModelProperty(name="상담사 한줄 자기소개", example="안녕하세요. 저는 경력 5년의 미술 심리 상담사입니다.")
	String shortIntroduction;
	@ApiModelProperty(name="상담사 연락 가능 시작 시간", example="09:00:00")
	@DateTimeFormat(pattern = "kk:mm:ss")
	LocalTime contactStartTime;
	@ApiModelProperty(name="상담사 연락 가능 종료 시간", example="18:00:00")
	@DateTimeFormat(pattern = "kk:mm:ss")
	LocalTime contactEndTime;
	
}
