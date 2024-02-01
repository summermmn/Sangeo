package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 스케줄 결과 변경 API ([PUT] /api/v1/schedules/result) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("ScheduleResultPutRequest")
public class ScheduleResultPutReq {
	@ApiModelProperty(name="스케줄 ID", example="1")
	Long scheduleId;
	@ApiModelProperty(name="상담 후 결과 이미지", example="basic.png")
	String resultImg;
	@ApiModelProperty(name="상담 후 결과 내용", example="이번 상담에서는 ooo고객님의 쌓여있었던 스트레스를 알아보는 시간을 가졌습니다.")
	String resultContent;
}
