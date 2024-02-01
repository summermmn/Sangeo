package com.ssafy.db.entity;

import java.io.Serializable;
import java.time.LocalTime;

import javax.persistence.Entity;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;

import lombok.Getter;
import lombok.Setter;

/**
 * 상담사 모델 정의.
 */
@Entity
@Getter
@Setter
public class Counselor extends BaseEntity implements Serializable{
	@NotNull
	String counselorId;
	@NotNull
	String name;
	@NotNull
	String phoneNumber;
	@NotNull
	String profile;
	@NotNull
	String shortIntroduction;
	@DateTimeFormat(pattern = "kk:mm:ss")
	LocalTime contactStartTime;
	@DateTimeFormat(pattern = "kk:mm:ss")
	LocalTime contactEndTime;
	int career;
	String longIntroduction;
	@DateTimeFormat(pattern = "kk:mm:ss")
	LocalTime reserveStartTime;
	@DateTimeFormat(pattern = "kk:mm:ss")
	LocalTime reserveEndTime;
	String consultTarget;
	int price;
	int consultNumber;
	String holiday;

	@JsonIgnore
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@NotNull
	String password;

}
