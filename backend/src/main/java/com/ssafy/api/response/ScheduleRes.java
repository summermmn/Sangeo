package com.ssafy.api.response;

import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.format.annotation.DateTimeFormat;

import com.ssafy.db.entity.Counselor;
import com.ssafy.db.entity.Schedule;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 스케줄 정보 조회 API ([GET] /api/v1/counselors/{counselorId}) 요청에 대한 응답값 정의.
 * -> 휴일 여부, 상담사 객체, 회원 객체 제외 (상담사 아이디, 이름, 회원 아이디, 이름만 확인.. 더 필요하면 나중에 추가)  
 */
@Getter
@Setter
@ApiModel("ScheduleResponse")
public class ScheduleRes {
	@ApiModelProperty(name="Counselor ID")
	String counselorId;
	@ApiModelProperty(name="Counselor Name")
	String counselorName;
	@ApiModelProperty(name="User ID")
	String userId;
	@ApiModelProperty(name="User Name")
	String userName;
	@ApiModelProperty(name="시작시간(년월일 포함)")
	LocalDateTime startTime;
	@ApiModelProperty(name="시작시간(년월일 포함)")
	LocalDateTime endTime;	
	@ApiModelProperty(name="확정여부")
	boolean isConfirmed;
	@ApiModelProperty(name="완료여부")
	boolean isComplete;	
	
	
	public static ScheduleRes of(Schedule schedule) {
		ScheduleRes res = new ScheduleRes();
		res.setCounselorId(schedule.getCounselor().getCounselorId());
		res.setCounselorName(schedule.getCounselor().getName());
		res.setUserId(schedule.getUser().getUserId());
		res.setUserName(schedule.getUser().getName());
		res.setStartTime(schedule.getStartTime());
		res.setEndTime(schedule.getEndTime());
		res.setConfirmed(schedule.isConfirmed());
		res.setComplete(schedule.isComplete());
		return res;
	}

}
