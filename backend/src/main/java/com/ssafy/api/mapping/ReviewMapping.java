package com.ssafy.api.mapping;

import java.time.LocalDateTime;

import com.ssafy.db.entity.Counselor;
import com.ssafy.db.entity.Schedule;
import com.ssafy.db.entity.User;

public class ReviewMapping {
	private Schedule schedule;
	//private Counselor counselor;
	//private User user;
	private String content;
	private LocalDateTime regTime;
	private int score;
	
	public ReviewMapping(Schedule schedule, String content, LocalDateTime regTime, int score) {
		super();
		this.schedule = schedule;
		//this.counselor = schedule.getCounselor();
		//this.user = schedule.getUser();
		this.content = content;
		this.regTime = regTime;
		this.score = score;
	}
	
	public Long getSchedule_Id() {
		return schedule.getId();
	}
	
	/*
	public String getCounselorId() {
		return schedule.getCounselor().getCounselorId();
	}
	
	public String getCounselorName() {
		return schedule.getCounselor().getName();
	}

	public String getUserId() {
		return schedule.getUser().getUserId();
	}
	
	public String getUserName() {
		return schedule.getUser().getName();
	}
	*/
	
	public String getContent() {
		return content;
	}

	public LocalDateTime getRegTime() {
		return regTime;
	}
	
	public int getScore(){
		return score;
	}
}
