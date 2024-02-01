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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.mapping.CounselorMapping;
import com.ssafy.api.request.CounselorRegisterPostReq;
import com.ssafy.api.request.CounselorUpdateReq;
import com.ssafy.api.request.PasswordUpdateReq;
import com.ssafy.api.response.CounselorRes;
import com.ssafy.api.service.CounselorService;
import com.ssafy.common.auth.CounselorDetails;
import com.ssafy.db.entity.Counselor;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 상담사 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "상담사 API", tags = { "Counselor" })
@RestController
@RequestMapping("/api/v1/counselors")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CounselorController {
	
	@Autowired
	CounselorService counselorService;
	
	@GetMapping("/{counselorId}")
	@ApiOperation(value = "상담사 정보 조회", notes = "<strong>아이디</strong>를 통해 상담사 정보를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "상담사 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<CounselorRes> search(
			@PathVariable("counselorId") @ApiParam(value = "조회할 상담사 아이디", required = true) String counselorId) {
		Counselor counselor = counselorService.getCounselorByCounselorId(counselorId);
		if(counselor == null) 
			return ResponseEntity.status(404).body(null);
		return ResponseEntity.status(200).body(CounselorRes.of(counselor));
	}
	
	@GetMapping("")
	@ApiOperation(value = "전체 상담사 정보 조회", notes = "전체 상담사 정보를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "상담사 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<List<CounselorMapping>> searchAll() {
		// 검색어 없이 전체 조회
		System.out.println("전체 조회");
		List<CounselorMapping> clist = counselorService.getAllCounselor("%");
		return ResponseEntity.status(200).body(clist);
	}
	
	@GetMapping(value = "/search")
	@ApiOperation(value = "검색어로 상담사 정보 조회", notes = "이름 검색으로 상담사 정보를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "상담사 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<List<CounselorMapping>> searchCondition(@RequestParam @ApiParam(value = "조회할 검색어", required = true) String searchWord) {
		// 검색어로 조회
		System.out.println(searchWord);
		List<CounselorMapping> clist = counselorService.getAllCounselor("%"+searchWord+"%");
		return ResponseEntity.status(200).body(clist);
	}

	@PostMapping()
	@ApiOperation(value = "상담사 가입", notes = "<strong>아이디, 패스워드, 이름, 전화번호, 프로필, 한줄 자기소개, 연락 가능 시작 시간, 연락 가능 종료 시간</strong>을 통해 상담사 가입을 한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "상담사 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Counselor> register(
			@RequestBody @ApiParam(value = "상담사 가입 정보", required = true) CounselorRegisterPostReq registerInfo) {
		// 아이디 중복검사
		if (counselorService.getCounselorByCounselorId(registerInfo.getCounselorId()) == null) {
			System.out.println("가입가능한 아이디입니다.");
			// db에 registerInfo 저장
			Counselor counselor = counselorService.createCounselor(registerInfo);
			return ResponseEntity.status(200).body(counselor);
		} else {
			System.out.println("중복된 아이디입니다.");
			return ResponseEntity.status(401).body(null);
		}
	}

	// 비밀번호 없는 버전
	@PutMapping()
	@ApiOperation(value = "상담사 정보 수정", notes = "<strong>이름, 전화번호, 프로필 등</strong>을 통해 상담사 정보를 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "상담사 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Counselor> update(
			@RequestBody @ApiParam(value = "수정할 상담사 정보", required = true) CounselorUpdateReq updateInfo) {
		Counselor counselor = counselorService.updateCounselor(updateInfo);
		return ResponseEntity.status(200).body(counselor);
	}
	
	// 비밀번호 수정 버전
	@PutMapping("/password")
	@ApiOperation(value = "상담사 비밀번호 수정", notes = "<strong>비밀번호</strong>를 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "상담사 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Counselor> updatePassword(
			@RequestBody @ApiParam(value = "수정할 상담사 비밀번호 정보", required = true) PasswordUpdateReq passwordUpdateInfo) {
		Counselor counselor = counselorService.updatePassword(passwordUpdateInfo);
		if(counselor == null)
			return ResponseEntity.status(400).body(null);
		return ResponseEntity.status(200).body(counselor);
	}
	
	@PostMapping("/password/{counselorId}")
	@ApiOperation(value = "상담사 비밀번호 확인", notes = "상담사의 <strong>비밀번호</strong>를 확인한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "상담사 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<String> confirmPassword(
			@PathVariable("counselorId") @ApiParam(value = "확인할 상담사 아이디", required = true) String counselorId,
			@RequestBody @ApiParam(value = "비밀번호를 담은 map", required = true) Map<String, String> map){
		boolean result = counselorService.confirmPassword(counselorId, map.get("password"));
		if(result)
			return ResponseEntity.status(200).body("비밀번호 일치");
		else
			return ResponseEntity.status(401).body("비밀번호가 불일치합니다.");
	}

	@DeleteMapping("/{counselorId}")
	@ApiOperation(value = "상담사 정보 삭제", notes = "<strong>아이디</strong>를 통해 상담사 정보를 삭제한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "상담사 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<String> delete(
			@PathVariable("counselorId") @ApiParam(value = "삭제할 상담사 아이디", required = true) String counselorId) {
		counselorService.deleteCounselor(counselorId);
		return ResponseEntity.status(200).body("삭제 완료");

	}
	
	@GetMapping("/me")
	@ApiOperation(value = "상담사 본인 정보 조회", notes = "로그인한 상담사 본인의 정보를 응답한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "상담사 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Counselor> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 상담사 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		System.out.println("호출");
		CounselorDetails counselorDetails = (CounselorDetails)authentication.getDetails();
		String counselorId = counselorDetails.getUsername();
		Counselor counselor = counselorService.getCounselorByCounselorId(counselorId);
		System.out.println(counselorId+" 본인 인증 성공");
		return ResponseEntity.status(200).body(counselor);
	}

}
