package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 휴가 생성 API ([POST] /api/v1/counselors/holiday) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("HolidayRegisterPostRequest")
public class HolidayRegisterPostReq {
	@ApiModelProperty(name="상담사 ID", example="parkcs")
	String counselorId;
	@ApiModelProperty(name="선택 날짜들", example="[\"2022-07-27\", \"2022-07-28\"]")
	String[] dates;
}
