package com.ssafy.api.response;

import com.ssafy.db.entity.Schedule;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 스케줄 결과 변경 API ([PUT] /api/v1/schedules/result) 요청에 대한 응답값 정의.
 * 스케줄 결과 조회 API ([GET] /api/v1/schedules/result) 요청에 대한 응답값 정의.
 * -> 스케줄 ID, 결과 이미지, 결과 코멘트  
 */
@Getter
@Setter
@ApiModel("ScheduleResultResponse")
public class ScheduleResultRes {
	@ApiModelProperty(name="스케줄 ID")
	Long scheduleId;
	@ApiModelProperty(name="상담 후 결과 있는지")
	boolean isRegisteredResult;
	@ApiModelProperty(name="상담 후 결과 이미지")
	String resultImg;
	@ApiModelProperty(name="상담 후 결과 내용")
	String resultContent;
	
	
	public static ScheduleResultRes of(Schedule schedule) {
		ScheduleResultRes res = new ScheduleResultRes();
		res.setScheduleId(schedule.getId());
		res.setRegisteredResult(schedule.isRegisteredResult());
		res.setResultImg(schedule.getResultImg());
		res.setResultContent(schedule.getResultContent());
		return res;
	}
}
