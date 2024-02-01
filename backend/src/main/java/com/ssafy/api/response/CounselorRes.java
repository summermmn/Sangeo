package com.ssafy.api.response;

import java.time.LocalTime;

import com.ssafy.db.entity.Counselor;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 상담사 정보 조회 API ([GET] /api/v1/counselors/{counselorId}) 요청에 대한 응답값 정의. -> 비밀번호는 제외
 */
@Getter
@Setter
@ApiModel("CounselorResponse")
public class CounselorRes {
	@ApiModelProperty(name="Counselor ID")
	String counselorId;
	@ApiModelProperty(name="Counselor Name")
	String name;
	@ApiModelProperty(name="Counselor PhoneNumber")
	String phoneNumber;
	@ApiModelProperty(name="Counselor Profile")
	String profile;
	@ApiModelProperty(name="Counselor ShortIntroduction")
	String shortIntroduction;
	@ApiModelProperty(name="Counselor ContactStartTime")
	LocalTime contactStartTime;
	@ApiModelProperty(name="Counselor ContactEndTime")
	LocalTime contactEndTime;
	@ApiModelProperty(name="Counselor Career")
	int career;
	@ApiModelProperty(name="Counselor LongIntroduction")
	String longIntroduction;
	@ApiModelProperty(name="Counselor ReservationStartTime")
	LocalTime reserveStartTime;
	@ApiModelProperty(name="Counselor ReservationEndTime")
	LocalTime reserveEndTime;
	@ApiModelProperty(name="Counselor ConsultTarget")
	String consultTarget;
	@ApiModelProperty(name="Counselor Price")
	int price;
	@ApiModelProperty(name="Counselor ConsultNumber")
	int consultNumber;
	@ApiModelProperty(name="Counselor Holiday")
	String holiday;
	
	public static CounselorRes of(Counselor counselor) {
		CounselorRes res = new CounselorRes();
		res.setCounselorId(counselor.getCounselorId());
		res.setName(counselor.getName());
		res.setPhoneNumber(counselor.getPhoneNumber());
		res.setProfile(counselor.getProfile());
		res.setShortIntroduction(counselor.getShortIntroduction());
		res.setContactStartTime(counselor.getContactStartTime());
		res.setContactEndTime(counselor.getContactEndTime());
		res.setCareer(counselor.getCareer());
		res.setLongIntroduction(counselor.getLongIntroduction());
		res.setReserveStartTime(counselor.getReserveStartTime());
		res.setReserveEndTime(counselor.getContactEndTime());
		res.setConsultTarget(counselor.getConsultTarget());
		res.setPrice(counselor.getPrice());
		res.setConsultNumber(counselor.getConsultNumber());
		res.setHoliday(counselor.getHoliday());
		return res;
	}

}
