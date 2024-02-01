package com.ssafy.api.service;

import java.text.ParseException;
import java.util.List;

import com.ssafy.api.mapping.ScheduleMapping;
import com.ssafy.api.request.ScheduleFormUpdateReq;
import com.ssafy.api.request.ScheduleResultPutReq;
import com.ssafy.db.entity.Counselor;
import com.ssafy.db.entity.Schedule;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.ScheduleRepository.DateOnly;
import com.ssafy.db.repository.ScheduleRepository.TimeOnly;

public interface ScheduleService {

	Schedule createSchedule(Counselor counselor, User user, String startTime) throws ParseException;
	void createHoliday(Counselor counselor, User user, String date) throws ParseException;
	void createBreak(Counselor counselor, User user, String date) throws ParseException;
	List<ScheduleMapping> getSchedulesByCounselor(Counselor counselor);
	List<ScheduleMapping> getSchedulesByUser(User user);
	Schedule getScheduleById(Long id);
	Schedule getSchedulesByCounselorIdAndStartTime(Long counselorId, String startTime) throws ParseException;
	Schedule getSchedulesByUserIdAndStartTime(Long userId, String startTime) throws ParseException;
	Schedule updateSchedule(Schedule schedule, String afterStartTime) throws ParseException;
	Schedule updateScheduleResult(ScheduleResultPutReq scheduleResultInfo);
	Schedule updateScheduleForm(ScheduleFormUpdateReq scheduleFormInfo);
	void deleteSchedule(Schedule schedule);
	public List<TimeOnly> getSchedulesByCounselorIdAndDate(Long id, String date) throws ParseException;
	Schedule confirmSchedule(Schedule schedule);
	Schedule completeSchedule(Schedule schedule);
	List<DateOnly> getHolidaysByCounselorIdAndMonth(Long id, String month);
}
