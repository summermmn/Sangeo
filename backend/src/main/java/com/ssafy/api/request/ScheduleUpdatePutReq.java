package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 스케줄 변경 API ([PUT] /api/v1/schedules) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("ScheduleUpdatePutRequest")
public class ScheduleUpdatePutReq {
	@ApiModelProperty(name="상담사 ID", example="parkcs")
	String counselorId;
	@ApiModelProperty(name="기존 날짜와 시작 시간", example="2022-07-27 17:30")
	String beforeStartTime;
	@ApiModelProperty(name="변경할 날짜와 시작 시간", example="2022-07-29 17:30")
	String afterStartTime;
}

