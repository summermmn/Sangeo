package com.ssafy.api.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.LoginPostRes;
import com.ssafy.api.service.CounselorService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.Counselor;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = { "Auth." })
@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {
	@Autowired
	UserService userService;

	@Autowired
	CounselorService counselorService;

	@Autowired
	PasswordEncoder passwordEncoder;

	/* user와 counselor 구분 필요 -> UserLoginPostRes는 공통으로 사용 */
	@PostMapping("user/login")
	@ApiOperation(value = "사용자 로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = LoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class) })
	public ResponseEntity<BaseResponseBody> loginUser(
			@RequestBody @ApiParam(value = "사용자 로그인 정보", required = true) UserLoginPostReq loginInfo) {
		String userId = loginInfo.getId();
		String password = loginInfo.getPassword();

		User user = userService.getUserByUserId(userId);
		// 가입된 유저가 아닌 경우
		if (user == null)
			return ResponseEntity.status(404).body(LoginPostRes.of(404, "가입된 아이디가 아닙니다."));

		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if (passwordEncoder.matches(password, user.getPassword())) {
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			System.out.println(user.getProfile());
			return ResponseEntity.ok(LoginPostRes.of(200, user.getName()+"님 환영합니다.", JwtTokenUtil.getToken(true, userId, user.getName(), user.getProfile())));
		}
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return ResponseEntity.status(401).body(LoginPostRes.of(401, "비밀번호가 틀렸습니다."));
	}

	@PostMapping("counselor/login")
	@ApiOperation(value = "상담사 로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = LoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "상담사 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class) })
	public ResponseEntity<BaseResponseBody> loginCounselor(
			@RequestBody @ApiParam(value = "상담사 로그인 정보", required = true) UserLoginPostReq loginInfo) {
		String counselorId = loginInfo.getId();
		String password = loginInfo.getPassword();

		Counselor counselor = counselorService.getCounselorByCounselorId(counselorId);
		// 가입된 상담사가 아닌 경우
		if (counselor == null)
			return ResponseEntity.status(404).body(LoginPostRes.of(404, "가입된 아이디가 아닙니다."));
		
		// 로그인 요청한 상담사로부터 입력된 패스워드 와 디비에 저장된 상담사의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if (passwordEncoder.matches(password, counselor.getPassword())) {
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			return ResponseEntity.ok(LoginPostRes.of(200, counselor.getName()+"님 환영합니다.", JwtTokenUtil.getToken(false, counselorId, counselor.getName(), counselor.getProfile())));
		}
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return ResponseEntity.status(401).body(LoginPostRes.of(401, "비밀번호가 틀렸습니다."));
	}
	
	@PostMapping("naver/login")
	public ResponseEntity<BaseResponseBody> loginNaverUser(
			@RequestBody @ApiParam(value = "네이버 유저 로그인 정보", required = true) Map<String, String> loginInfo){
		System.out.println(loginInfo);
		String userId = loginInfo.get("id");
		String name = loginInfo.get("name");
		String phoneNumber = loginInfo.get("phoneNumber");
		String profile = loginInfo.get("profile");
		// id 없을 시 user 테이블에 데이터 추가 -> id 중복 문제...?
		User user = userService.getUserByUserId(userId);
		if(user == null){ // 없으면 회원 등록
			UserRegisterPostReq userRegisterInfo = new UserRegisterPostReq();
			userRegisterInfo.setUserId(userId);
			userRegisterInfo.setPassword(null);
			userRegisterInfo.setName(name);
			userRegisterInfo.setPhoneNumber(phoneNumber);
			userRegisterInfo.setProfile(profile);
			userService.createUser(userRegisterInfo, true);
			return ResponseEntity.ok(LoginPostRes.of(200, name+"님 환영합니다.", JwtTokenUtil.getToken(true, userId, name, profile)));
			
		}
		return ResponseEntity.ok(LoginPostRes.of(200, user.getName()+"님 환영합니다.", JwtTokenUtil.getToken(true, user.getUserId(), user.getName(), user.getProfile())));
	}
}
