package com.ssafy.db.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.Review;
import com.ssafy.db.repository.ScheduleRepository.TimeOnly;

/**
 * 리뷰 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>  {
	
	List<Review> findBySchedule_Id(Long scheduleId);
	List<Review> findBySchedule_CounselorId(Long counselorId);
	List<Review> findBySchedule_UserId(Long userId);
	
    @Transactional
    Optional<Review> deleteBySchedule_Id(Long scheduleId);

    @Transactional
    @Modifying
    @Query(value = "update review set user_id = null where id = :id", nativeQuery = true)
    void SetUserIdNull(@Param(value="id")long id);
}
