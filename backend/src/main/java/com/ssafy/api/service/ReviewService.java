package com.ssafy.api.service;

import java.util.List;

import com.ssafy.api.mapping.ReviewMapping;
import com.ssafy.api.request.ReviewRegisterPostReq;
import com.ssafy.db.entity.Review;
import com.ssafy.db.entity.Schedule;

public interface ReviewService {
	Review createReview(Schedule schedule, ReviewRegisterPostReq reviewRegisterPostReq);
	List<Review> getReviewByScheduleId(Long scheduleId);
	List<Review> getReviewByCounselorId(Long counselorId);
	List<Review> getReviewByUserId(Long userId);
	Review updateReview(ReviewRegisterPostReq reviewRegisterPostReq);
	void deleteReviewByScheduleId(Long scheduleId);
	void setUserNull(Review review);
}
