package com.ssafy.api.request;

import java.time.LocalTime;

import org.springframework.format.annotation.DateTimeFormat;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 상담사 정보 변경 API ([PUT] /api/v1/counselors) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("CounselorUpdateRequest")
public class CounselorUpdateReq {
	@ApiModelProperty(name="상담사 ID", example="parkcs")
	String counselorId;
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
	@ApiModelProperty(name="상담사 경력", example="5")
	int career;
	@ApiModelProperty(name="상담사 전체 자기소개", example="저는 ~~학교 심리학과 전공을 하였고 ~~자격증을 취득한 전문적인 상담가입니다. 편안한 상담 함께 해봐요.")
	String longIntroduction;
	@ApiModelProperty(name="상담사 예약 가능 시작 시간", example="09:00:00")
	@DateTimeFormat(pattern = "kk:mm:ss")
	LocalTime reserveStartTime;
	@ApiModelProperty(name="상담사 예약 가능 종료 시간", example="18:00:00")
	@DateTimeFormat(pattern = "kk:mm:ss")
	LocalTime reserveEndTime;
	@ApiModelProperty(name="상담 대상", example="20대 이상")
	String consultTarget;
	@ApiModelProperty(name="한시간 당 가격", example="30000")
	int price;
	@ApiModelProperty(name="상담 횟수", example="50")
	int consultNumber;
	@ApiModelProperty(name="휴일(일 -> 0, 토 -> 6과 같은 형식)", example="0/6")
	String holiday;
	
}
