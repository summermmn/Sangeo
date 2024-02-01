package com.ssafy.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.api.mapping.CertificateMapping;
import com.ssafy.db.entity.Certificate;

/**
 * 자격증 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
public interface CertificateRepository extends JpaRepository<Certificate, Long>{
	List<CertificateMapping> findByCounselor_Id(Long counselorId);
}
