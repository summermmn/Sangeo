package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 스케줄 생성 API ([POST] /api/v1/reviews) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("ReviewRegisterPostRequest")
public class ReviewRegisterPostReq {
	@ApiModelProperty(name="스케줄 ID", example="1")
	Long scheduleId;
	@ApiModelProperty(name="후기 내용", example="많은 도움이 되었습니다.")
	String content;
	@ApiModelProperty(name="후기 평점", example="5")
	int score;
}
