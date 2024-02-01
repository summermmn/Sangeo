package com.ssafy.db.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.api.mapping.CounselorMapping;
import com.ssafy.db.entity.Counselor;

/**
 * 상담사 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
public interface CounselorRepository extends JpaRepository<Counselor, Long>{ // <Entity, Id(value)> 
    Optional<Counselor> findByCounselorId(String counselorId);
    
    @Transactional
    Optional<Counselor> deleteByCounselorId(String counselorId);
    
    // 전체 상담사 목록 조회시 password는 가져오지 않음
    //List<CounselorMapping> findAllBy();
    
    // as로 모두 소문자로 별칭 설정해야 mapping 가능
    @Query(value = "select cs.counselor_id as counselorid, cs.name as name, cs.phone_number as phonenumber, cs.profile as profile, cs.short_introduction as shortintroduction, "
    		+ "cs.contact_start_time as contactstarttime, cs.contact_end_time as contactendtime, cs.career as career, cs.long_introduction as longintroduction, "
    		+ "cs.reserve_start_time as reservestarttime, cs.reserve_end_time as reserveendtime, cs.consult_target as consulttarget, cs.price as price, cs.consult_number as consultnumber, cs.holiday as holiday, avg(rv.score) as avgscore "
    		+ "from counselor cs left outer join review rv "
    		+ "on cs.id = rv.counselor_id "
    		+ "where cs.name like :search_word "
    		+ "group by cs.id", nativeQuery = true)
    List<CounselorMapping> getCounselorAndScoreList(@Param(value = "search_word") String searchWord);
}
