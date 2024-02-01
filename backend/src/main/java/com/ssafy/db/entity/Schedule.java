package com.ssafy.db.entity;

import java.io.Serializable;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.util.Assert;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 스케줄 모델 정의.
 */
@Entity
@Getter
@Setter
public class Schedule extends BaseEntity implements Serializable{

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "COUNSELOR_ID")
	private Counselor counselor;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_ID")
	private User user;

	@Column(nullable = false)
	private LocalDateTime startTime;

	@Column(nullable = false)
	private LocalDateTime endTime;

	private boolean isComplete = false;
	private boolean isHoliday = false;
	private boolean isConfirmed = false;
	
	// 상담사가 상담 완료 후 결과를 등록했는지에 따른 변수
	private boolean isRegisteredResult = false;
	private String resultImg;
	private String resultContent;
	
	// 설문 폼
	private String formPath;

	public Schedule() {
		super();
	}

	@Builder
	public Schedule(Counselor counselor, User user, String startTime, boolean isComplete, boolean isHoliday)
			throws ParseException {

		// Not null을 체크
		// 날짜는 String으로 받기
		Assert.hasText(startTime, "startTime must not be empty");

		this.counselor = counselor;
		this.user = user;
		this.isComplete = isComplete;
		this.isHoliday = isHoliday;
		// 휴일인 경우 0시 0분 부터 23시 59분 까지 스케줄 생성
		if (isHoliday == true) {
			LocalDate holiday = LocalDate.parse(startTime, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
			LocalDateTime start = holiday.atStartOfDay();
			this.startTime = start;
			this.endTime = start.plusMinutes(1439);
		} else {
			LocalDateTime start = LocalDateTime.parse(startTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
			this.startTime = start; 
			this.endTime = start.plusHours(1);
		}
	}

	@Override
	public String toString() {
		return "Schedule [counselor=" + counselor + ", user=" + user + ", startTime=" + startTime + ", endTime="
				+ endTime + ", isComplete=" + isComplete + ", isHoliday=" + isHoliday + ", isConfirmed=" + isConfirmed
				+ ", isRegisteredResult=" + isRegisteredResult + ", resultImg=" + resultImg + ", resultContent="
				+ resultContent + ", formPath=" + formPath + "]";
	}

}
