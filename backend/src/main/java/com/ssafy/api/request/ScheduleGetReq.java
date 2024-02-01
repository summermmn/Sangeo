package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 개별 스케줄 상세 조회에 필요한 리퀘스트 바디 정의.
 * ([POST] /api/v1/schedules/confirm) 스케줄 확정 요청에 사용
 */
@Getter
@Setter
@ApiModel("ScheduleGetRequest")
public class ScheduleGetReq {
	@ApiModelProperty(name="상담사 ID", example="parkcs")
	String counselorId;
	@ApiModelProperty(name="날짜와 시작 시간", example="2022-07-27 17:30")
	String startTime;
}

