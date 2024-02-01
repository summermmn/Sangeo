package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 휴식 시간 생성 API ([POST] /api/v1/counselors/break) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("BreakRegisterPostRequest")
public class BreakRegisterPostReq {
	@ApiModelProperty(name="상담사 ID", example="parkcs")
	String counselorId;
	@ApiModelProperty(name="선택한 날짜와 시간배열", example="[\"2022-07-27 17:30\", \"2022-07-27 19:30\"]")
	String[] datetimes;
}
