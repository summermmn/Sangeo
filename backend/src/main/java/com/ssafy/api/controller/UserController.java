package com.ssafy.api.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.PasswordUpdateReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserUpdateReq;
import com.ssafy.api.service.ReviewService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.Review;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = { "User" })
@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	ReviewService reviewService;

	
	// 토큰 없이 본인 정보 조회 -> 확인 후 삭제
	@GetMapping("/{userId}")
	@ApiOperation(value = "회원 정보 조회", notes = "<strong>아이디</strong>를 통해 회원 정보를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<User> search(
			@PathVariable("userId") @ApiParam(value = "조회할 회원 아이디", required = true) String userId) {
		User user = userService.getUserByUserId(userId);
		if(user == null)
			return ResponseEntity.status(404).body(null);
		return ResponseEntity.status(200).body(user);

	}

	@PostMapping()
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디, 패스워드, 이름, 전화번호, 프로필</strong>을 통해 회원가입 한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<User> register(
			@RequestBody @ApiParam(value = "회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
		// 아이디 중복검사
		if (userService.getUserByUserId(registerInfo.getUserId()) == null) {
			System.out.println(registerInfo.getUserId()+" 가입가능한 아이디입니다.");
			// db에 registerInfo 저장
			User user = userService.createUser(registerInfo, false);
			return ResponseEntity.status(200).body(user);
		} else {
			System.out.println("중복된 아이디입니다.");
			return ResponseEntity.status(401).body(null);
		}
	}

	// 비밀번호 없는 버전
	@PutMapping()
	@ApiOperation(value = "회원 정보 수정", notes = "<strong>이름, 전화번호, 프로필</strong>을 통해 회원 정보를 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<User> updateUserInfo(
			@RequestBody @ApiParam(value = "수정할 회원 정보", required = true) UserUpdateReq updateInfo) {
		User user = userService.updateUser(updateInfo);
		return ResponseEntity.status(200).body(user);
	}
	
	// 비밀번호 수정 버전
	@PutMapping("/password")
	@ApiOperation(value = "회원 비밀번호 수정", notes = "<strong>비밀번호</strong>를 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<User> updatePassword(
			@RequestBody @ApiParam(value = "수정할 회원 비밀번호 정보", required = true) PasswordUpdateReq passwordUpdateInfo) {
		User user = userService.updatePassword(passwordUpdateInfo);
		if(user == null)
			return ResponseEntity.status(401).body(null);
		return ResponseEntity.status(200).body(user);
	}
	
	@PostMapping("/password/{userId}")
	@ApiOperation(value = "회원 비밀번호 확인", notes = "회원의 <strong>비밀번호</strong>를 확인한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<String> confirmPassword(
			@PathVariable("userId") @ApiParam(value = "확인할 회원 아이디", required = true) String userId,
			@RequestBody @ApiParam(value = "비밀번호를 담은 map", required = true) Map<String, String> map){
		boolean result = userService.confirmPassword(userId, map.get("password"));
		if(result)
			return ResponseEntity.status(200).body("비밀번호 일치");
		else
			return ResponseEntity.status(401).body("비밀번호가 불일치합니다.");
	}
	
	@DeleteMapping("/{userId}")
	@ApiOperation(value = "회원 정보 삭제", notes = "<strong>아이디</strong>를 통해 회원 정보를 삭제한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<String> delete(
			@PathVariable("userId") @ApiParam(value = "삭제할 회원 아이디", required = true) String userId){
		User user = userService.getUserByUserId(userId);
		if(user == null) {
			System.out.println("TEST --- 유저 없음");
			return ResponseEntity.status(404).body("삭제 실패");
		}
		long id = user.getId();
		System.out.println("TEST --- id" +  id);
		// 회원이 기록한 모든 리뷰들을 회원 컬럼이 null 이 되도록 변경한다
		List<Review> reviewList = reviewService.getReviewByUserId(id); 
		for (Review review : reviewList) {
			reviewService.setUserNull(review);
			System.out.println("TEST --- review" +  review);
		}
		
		boolean result = userService.deleteUser(userId);
		if(result)
			return ResponseEntity.status(200).body("삭제 완료");
		else
			return ResponseEntity.status(404).body("삭제 실패");
	}

	@GetMapping("/me")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<User> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		System.out.println(userId+" 본인 인증 성공");
		return ResponseEntity.status(200).body(user);
	}

}
