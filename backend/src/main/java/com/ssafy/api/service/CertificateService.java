package com.ssafy.api.service;

import java.util.List;
import com.ssafy.api.mapping.CertificateMapping;

import com.ssafy.api.request.CertificateRegisterPostReq;
import com.ssafy.db.entity.Certificate;
import com.ssafy.db.entity.Counselor;

public interface CertificateService {
	Certificate createCertificate(Counselor counselor, CertificateRegisterPostReq certificateRegisterPostReq);
	List<CertificateMapping> getCertificateByCounselorId(Long counselorId);
	void deleteCertificateById(Long id);
}
