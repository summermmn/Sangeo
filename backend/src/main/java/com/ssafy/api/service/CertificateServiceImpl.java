package com.ssafy.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.CertificateRegisterPostReq;
import com.ssafy.db.entity.Certificate;
import com.ssafy.db.entity.Counselor;
import com.ssafy.db.repository.CertificateRepository;
import com.ssafy.api.mapping.CertificateMapping;

/**
 *	자격증 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("certificateService")
public class CertificateServiceImpl implements CertificateService{

	@Autowired
	CertificateRepository certificateRepository;
	
	@Override
	public Certificate createCertificate(Counselor counselor, CertificateRegisterPostReq certificateRegisterPostReq) {
		Certificate certificate = new Certificate();
		certificate.setCounselor(counselor);
		certificate.setName(certificateRegisterPostReq.getName());
		certificate.setImgPath(certificateRegisterPostReq.getImg_path());
		return certificateRepository.save(certificate);
	}

	@Override
	public List<CertificateMapping> getCertificateByCounselorId(Long counselorId) {
		return certificateRepository.findByCounselor_Id(counselorId);
	}

	@Override
	public void deleteCertificateById(Long id) {
		certificateRepository.deleteById(id);
	}

}
