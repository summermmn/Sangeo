package com.ssafy.api.mapping;

import java.time.LocalTime;

public interface CounselorMapping {
	String getCounselorId();
	String getName();
	String getPhoneNumber();
	String getProfile();
	String getShortIntroduction();
	LocalTime getContactStartTime();
	LocalTime getContactEndTime();
	Integer getCareer();
	String getLongIntroduction();
	LocalTime getReserveStartTime();
	LocalTime getReserveEndTime();
	String getConsultTarget();
	Integer getPrice();
	Integer getConsultNumber();
	String getHoliday();
	Float getAvgScore();
}
