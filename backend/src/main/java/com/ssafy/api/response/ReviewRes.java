package com.ssafy.api.response;

import java.time.LocalDateTime;

import com.ssafy.db.entity.Review;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ReviewResponse")
public class ReviewRes {
	@ApiModelProperty(name="Schedule Id")
	Long scheduleId;
	@ApiModelProperty(name="Counselor Id")
	String counselorId;
	@ApiModelProperty(name="Counselor Name")
	String counselorName;
	@ApiModelProperty(name="User Id")
	String userId;
	@ApiModelProperty(name="User Name")
	String userName;
	@ApiModelProperty(name="후기 내용")
	String content;
	@ApiModelProperty(name="후기 등록 시간")
	LocalDateTime regTime;
	@ApiModelProperty(name="후기 점수")
	int score;

	public static ReviewRes of(Review review) {
		ReviewRes res = new ReviewRes();
		res.setScheduleId(review.getSchedule().getId());
		res.setCounselorId(review.getSchedule().getCounselor().getCounselorId());
		res.setCounselorName(review.getSchedule().getCounselor().getName());
		res.setUserId(review.getSchedule().getUser().getUserId());
		res.setUserName(review.getSchedule().getUser().getName());
		res.setContent(review.getContent());
		res.setRegTime(review.getRegTime());
		res.setScore(review.getScore());
		return res;
	}
	
}
