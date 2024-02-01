package com.ssafy.db.repository;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssafy.api.mapping.ScheduleMapping;
import com.ssafy.db.entity.Schedule;

/**
 * 스케줄 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
	// 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.
//    Optional<User> findByUserId(String userId);

//    @Transactional
//    Optional<User> deleteByUserId(String userId);
	List<ScheduleMapping> findByCounselor_IdOrderByStartTime(Long counselorId);

	List<ScheduleMapping> findByUser_IdOrderByStartTime(Long userId);

	Schedule findByCounselor_IdAndStartTime(Long counselorId, LocalDateTime date);

	Schedule findByUser_IdAndStartTime(Long userId, LocalDateTime date);

	// 날짜별 스케줄을 조회하기 위한 native query
	@Query(value = "select start_time as starttime from schedule where counselor_id = :counselor_id and date_format(start_time,'%Y-%m-%d') = :date", nativeQuery = true)
	List<TimeOnly> getSchedulesByCounser_IdAndDate(@Param(value = "counselor_id") long id,
			@Param(value = "date") String date);

	public static interface TimeOnly {
		LocalTime getStarttime();
	}

	// 월별 휴일을 조회하기 위한 native query
	@Query(value = "select id, date_format(start_time,'%d') as holiday from schedule where counselor_id = :counselor_id and date_format(start_time,'%Y-%m') = :month and is_holiday=1 order by holiday", nativeQuery = true)
	List<DateOnly> getHolidaysByCounser_IdAndMonth(@Param(value = "counselor_id") long id,
			@Param(value = "month") String month);

	public static interface DateOnly {
		int getId();
		int getHoliday();
	}

}
