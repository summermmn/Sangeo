package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 스케줄 결과 변경 API ([PUT] /api/v1/schedules/form) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("ScheduleFormUpdateRequest")
public class ScheduleFormUpdateReq {
	@ApiModelProperty(name="스케줄 ID", example="1")
	Long scheduleId;
	@ApiModelProperty(name="사전 질문 폼 경로", example="form path")
	String formPath;
}
