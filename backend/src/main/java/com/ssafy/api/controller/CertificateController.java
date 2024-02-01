package com.ssafy.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.mapping.CertificateMapping;
import com.ssafy.api.request.CertificateRegisterPostReq;
import com.ssafy.api.response.CertificateRes;
import com.ssafy.api.service.CertificateService;
import com.ssafy.api.service.CounselorService;
import com.ssafy.db.entity.Certificate;
import com.ssafy.db.entity.Counselor;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * 자격증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "자격증 API", tags = { "Certificate" })
@RestController
@RequestMapping("/api/v1/certificates")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CertificateController {
	@Autowired
	CounselorService counselorService; 
	
	@Autowired
	CertificateService certificateService; 
	
	@PostMapping()
	@ApiOperation(value = "자격증 생성", notes = "<strong>상담사ID, 자격증 이름, 자격증 이미지 경로</strong>을 통해 자격증을 생성한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "상담사 ID 부적절"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<CertificateRes> registerSchedule(@RequestBody @ApiParam(value = "자격증 생성 정보", required = true) CertificateRegisterPostReq certificateRegisterPostReq){
		Counselor counselor = counselorService.getCounselorByCounselorId(certificateRegisterPostReq.getCounselorId());
		if(counselor == null)
			return ResponseEntity.status(400).body(null);
		Certificate certificate = certificateService.createCertificate(counselor, certificateRegisterPostReq);
		return ResponseEntity.status(200).body(CertificateRes.of(certificate));
	}
			
	
	@GetMapping("{counselorId}")
	@ApiOperation(value = "자격증 조회", notes = "<strong>상담사ID</strong>을 통해 자격증을 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "상담사 ID 부적절"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<List<CertificateMapping>> searchCertificateByCounselorId(
			@PathVariable("counselorId") @ApiParam(value = "자격증을 조회할 상담사 아이디", required = true) String counselorId){
		Counselor counselor = counselorService.getCounselorByCounselorId(counselorId);
		if (counselor == null)
			return ResponseEntity.status(400).body(null);
		List<CertificateMapping> list = certificateService.getCertificateByCounselorId(counselor.getId());
		return ResponseEntity.status(200).body(list);
	}
	
	@DeleteMapping("{certificateId}")
	@ApiOperation(value = "자격증 삭제", notes = "<strong>스케줄 ID</strong>을 통해 자격증을 삭제한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "자격증 ID 부적절"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<String> deleteCertificateByCounselorId(
			@PathVariable("certificateId") @ApiParam(value = "삭제할 자격증 아이디", required = true) Long certificateId){
		certificateService.deleteCertificateById(certificateId);
		return ResponseEntity.status(200).body("삭제완료");
	}
	

}
