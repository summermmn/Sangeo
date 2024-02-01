package com.ssafy.api.service;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.api.mapping.ScheduleMapping;
import com.ssafy.api.request.ScheduleFormUpdateReq;
import com.ssafy.api.request.ScheduleResultPutReq;
import com.ssafy.db.entity.Counselor;
import com.ssafy.db.entity.Schedule;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.ScheduleRepository;
import com.ssafy.db.repository.ScheduleRepository.DateOnly;
import com.ssafy.db.repository.ScheduleRepository.TimeOnly;

/**
 * 스케줄 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */

@Service("scheduleService")
public class ScheduleServiceImpl implements ScheduleService {

	@Autowired
	ScheduleRepository scheduleRepository;

	@Override
	public Schedule createSchedule(Counselor counselor, User user, String startTime) throws ParseException {

		Schedule schedule = Schedule.builder().counselor(counselor).user(user).startTime(startTime).build();
		return scheduleRepository.save(schedule);
	}

	@Override
	public void createHoliday(Counselor counselor, User user, String date) throws ParseException {
		Schedule schedule = Schedule.builder().counselor(counselor).user(user).isHoliday(true).startTime(date).build();
		scheduleRepository.save(schedule);
	}

	@Override
	public void createBreak(Counselor counselor, User user, String date) throws ParseException {
		Schedule schedule = Schedule.builder().counselor(counselor).user(user).startTime(date).build();
		scheduleRepository.save(schedule);
	}

	@Override
	public List<ScheduleMapping> getSchedulesByCounselor(Counselor counselor) {
		List<ScheduleMapping> list = scheduleRepository.findByCounselor_IdOrderByStartTime(counselor.getId());
		return list;
	}

	@Override
	public List<ScheduleMapping> getSchedulesByUser(User user) {
		List<ScheduleMapping> list = scheduleRepository.findByUser_IdOrderByStartTime(user.getId());
		return list;
	}
	
	@Override
	public Schedule getScheduleById(Long id) {
		return scheduleRepository.findById(id).get();
	}

	@Override
	public Schedule getSchedulesByCounselorIdAndStartTime(Long counselorId, String startTime) throws ParseException {
		// 시간 포맷팅
		LocalDateTime date = LocalDateTime.parse(startTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
		return scheduleRepository.findByCounselor_IdAndStartTime(counselorId, date);
	}

	@Override
	public Schedule getSchedulesByUserIdAndStartTime(Long userId, String startTime) throws ParseException {
		// 시간 포맷팅
		LocalDateTime date = LocalDateTime.parse(startTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
		return scheduleRepository.findByUser_IdAndStartTime(userId, date);
	}

	@Override
	public Schedule updateSchedule(Schedule schedule, String afterStartTime) throws ParseException {
		// 시간 포맷팅
		LocalDateTime start = LocalDateTime.parse(afterStartTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

		schedule.setStartTime(start);
		schedule.setEndTime(start.plusHours(1));
		return scheduleRepository.save(schedule);
	}
	
	@Override
	public Schedule updateScheduleResult(ScheduleResultPutReq scheduleResultInfo) {
		Schedule schdule = scheduleRepository.findById(scheduleResultInfo.getScheduleId()).get();
		schdule.setRegisteredResult(true);
		schdule.setResultImg(scheduleResultInfo.getResultImg());
		schdule.setResultContent(scheduleResultInfo.getResultContent());
		return scheduleRepository.save(schdule);
	}
	
	
	@Override
	public Schedule updateScheduleForm(ScheduleFormUpdateReq scheduleFormInfo) {
		Schedule schdule = scheduleRepository.findById(scheduleFormInfo.getScheduleId()).get();
		schdule.setFormPath(scheduleFormInfo.getFormPath());
		return scheduleRepository.save(schdule);
	}

	@Override
	public void deleteSchedule(Schedule schedule) {
		scheduleRepository.delete(schedule);
	}

	@Override
	public List<TimeOnly> getSchedulesByCounselorIdAndDate(Long id, String date) throws ParseException {
		// 변경하려는 시간 유효한지 검사
		LocalDate searchDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		List<TimeOnly> list = scheduleRepository.getSchedulesByCounser_IdAndDate(id, date);
		return list;
	}

	@Override
	public Schedule confirmSchedule(Schedule schedule) {
		schedule.setConfirmed(true);
		scheduleRepository.saveAndFlush(schedule);
		return null;
	}

	@Override
	public Schedule completeSchedule(Schedule schedule) {
		schedule.setComplete(true);
		scheduleRepository.saveAndFlush(schedule);
		return null;
	}

	@Override
	public List<DateOnly> getHolidaysByCounselorIdAndMonth(Long id, String month) {
		// 변경하려는 시간 유효한지 검사
		YearMonth searchMonth = YearMonth.parse(month, DateTimeFormatter.ofPattern("yyyy-MM"));
		System.out.println("test1");
		List<DateOnly> list = scheduleRepository.getHolidaysByCounser_IdAndMonth(id, month);
		System.out.println("test2");
		return list;

	}

}
