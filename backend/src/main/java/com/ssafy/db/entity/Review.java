package com.ssafy.db.entity;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.OneToOne;

import com.ssafy.api.request.ReviewRegisterPostReq;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 리뷰 모델 정의.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Review extends BaseEntity{
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumns({
        @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", nullable=true),
        @JoinColumn(name = "COUNSELOR_ID", referencedColumnName = "COUNSELOR_ID"),
        @JoinColumn(name = "SCHEDULE_ID", referencedColumnName = "ID")
	})
	private Schedule schedule;
	
	@Column(nullable = false)
	private String content;
	
	@Column(nullable = false)
	private LocalDateTime regTime;
	
	@Column(nullable = false)
	private int score;
	
	@Builder
	public Review(Schedule schedule, ReviewRegisterPostReq reviewRegisterPostReq) {
		this.schedule = schedule;
		this.content = reviewRegisterPostReq.getContent();
		this.regTime = LocalDateTime.now();
		this.score = reviewRegisterPostReq.getScore();
	}
	
}
