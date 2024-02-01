package com.ssafy.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.mapping.ReviewMapping;
import com.ssafy.api.request.ReviewRegisterPostReq;
import com.ssafy.api.response.ReviewRes;
import com.ssafy.api.service.CounselorService;
import com.ssafy.api.service.ReviewService;
import com.ssafy.api.service.ScheduleService;
import com.ssafy.api.service.UserService;
import com.ssafy.db.entity.Counselor;
import com.ssafy.db.entity.Review;
import com.ssafy.db.entity.Schedule;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "후기 API", tags = { "Review" })
@RestController
@RequestMapping("/api/v1/reviews")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReviewController {
	
	@Autowired
	ScheduleService scheduleService;
	@Autowired
	ReviewService reviewService;
	@Autowired
	UserService userService;
	@Autowired
	CounselorService counselorService;
	
	@PostMapping()
	@ApiOperation(value = "후기 생성", notes = "<strong>스케줄ID, 내용, 점수</strong>를 통해 후기를 생성한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "스케줄 ID 부적절"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<ReviewRes> registerReview(
			@RequestBody @ApiParam(value = "후기 생성 정보", required = true) ReviewRegisterPostReq reviewInfo){
		// 후기 찾아오기
		Schedule schedule = scheduleService.getScheduleById(reviewInfo.getScheduleId());
		if(schedule == null) 
			return ResponseEntity.status(400).body(null);
		
		Review review = reviewService.createReview(schedule, reviewInfo);
		return ResponseEntity.status(200).body(ReviewRes.of(review));
	}

	@GetMapping("schedule/{scheduleId}")
	@ApiOperation(value = "스케줄별 후기 조회", notes = "<strong>스케줄 ID</strong>를 통해 후기를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "스케줄 ID 부적절"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<ReviewRes> searchReviewByScheduleId(@PathVariable("scheduleId") @ApiParam(value = "후기를 조회할 스케줄 아이디", required = true) Long scheduleId){
		List<Review> reviewList = reviewService.getReviewByScheduleId(scheduleId);
		if(reviewList == null || reviewList.isEmpty())
			return ResponseEntity.status(400).body(null);
		// 스케줄 ID 당 후기는 하나
		return ResponseEntity.status(200).body(ReviewRes.of(reviewList.get(0)));
	}
	
	@GetMapping("counselor/{counselorId}")
	@ApiOperation(value = "상담사별 후기 조회", notes = "<strong>상담사 ID</strong>를 통해 후기를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "상담사 ID 부적절"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<List<Review>> searchReviewsByCounselorId(@PathVariable("counselorId") @ApiParam(value = "후기를 조회할 상담사 아이디", required = true) String counselorId){
		Counselor counselor = counselorService.getCounselorByCounselorId(counselorId);
		if(counselor == null)
			return ResponseEntity.status(400).body(null);
		
		List<Review> reviewList = reviewService.getReviewByCounselorId(counselor.getId());
		return ResponseEntity.status(200).body(reviewList);
	}
	
	@GetMapping("user/{userId}")
	@ApiOperation(value = "고객별 후기 조회", notes = "<strong>고객 ID</strong>를 통해 후기를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "고객 ID 부적절"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<List<Review>> searchReviewsByUserId(@PathVariable("userId") @ApiParam(value = "후기를 조회할 고객 아이디", required = true) String userId){
		User user = userService.getUserByUserId(userId);
		if(user == null)
			return ResponseEntity.status(400).body(null);
		
		List<Review> reviewList = reviewService.getReviewByUserId(user.getId());
		return ResponseEntity.status(200).body(reviewList);
	}
	
	@PutMapping()
	@ApiOperation(value = "후기 수정", notes = "<strong>후기 내용, 후기 점수</strong>만을 통해 후기를 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 404, message = "후기 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<ReviewRes> updateReview(
			@RequestBody @ApiParam(value = "수정할 후기 정보", required = true) ReviewRegisterPostReq reviewInfo) {
		Review review = reviewService.updateReview(reviewInfo);
		if(review == null)
			return ResponseEntity.status(400).body(null);
		
		return ResponseEntity.status(200).body(ReviewRes.of(review));
	}
	
	@DeleteMapping("{scheduleId}")
	@ApiOperation(value = "후기 삭제", notes = "<strong>스케줄 ID</strong>를 통해 회원 정보를 삭제한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 404, message = "후기 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<String> deleteByScheduleId(
			@PathVariable("scheduleId") @ApiParam(value = "삭제할 후기의 스케줄 아이디", required = true) Long scheduleId) {
		reviewService.deleteReviewByScheduleId(scheduleId);
		return ResponseEntity.status(200).body("삭제 완료");

	}

}
