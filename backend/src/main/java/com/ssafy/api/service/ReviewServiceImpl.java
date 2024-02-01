package com.ssafy.api.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.api.mapping.ReviewMapping;
import com.ssafy.api.request.ReviewRegisterPostReq;
import com.ssafy.db.entity.Review;
import com.ssafy.db.entity.Schedule;
import com.ssafy.db.repository.ReviewRepository;

@Service("reviewService")
public class ReviewServiceImpl implements ReviewService{

	@Autowired
	ReviewRepository reviewRepository;
	
	@Override
	public Review createReview(Schedule schedule, ReviewRegisterPostReq reviewRegisterPostReq) {
		Review review = Review.builder().schedule(schedule).reviewRegisterPostReq(reviewRegisterPostReq).build();
		return reviewRepository.save(review);
	}

	@Override
	public List<Review> getReviewByScheduleId(Long scheduleId) {
		List<Review> reviewList = reviewRepository.findBySchedule_Id(scheduleId);
		return reviewList;
	}

	@Override
	public List<Review> getReviewByCounselorId(Long counselorId) {
		List<Review> reviewList = reviewRepository.findBySchedule_CounselorId(counselorId);
		return reviewList;
	}

	@Override
	public List<Review> getReviewByUserId(Long userId) {
		List<Review> reviewList = reviewRepository.findBySchedule_UserId(userId);
		return reviewList;
	}

	@Override
	public Review updateReview(ReviewRegisterPostReq reviewRegisterPostReq) {
		List<Review> reviewList = reviewRepository.findBySchedule_Id(reviewRegisterPostReq.getScheduleId());
		if(reviewList == null || reviewList.isEmpty())
			return null;
		
		Review review = reviewList.get(0);
		review.setContent(reviewRegisterPostReq.getContent());
		review.setRegTime(LocalDateTime.now());
		review.setScore(reviewRegisterPostReq.getScore());
		return reviewRepository.save(review);
	}
	
	@Override
	public void deleteReviewByScheduleId(Long scheduleId) {
		reviewRepository.deleteBySchedule_Id(scheduleId);
		
	}

	@Override
	public void setUserNull(Review review) {
		reviewRepository.SetUserIdNull(review.getId());
	}
}
