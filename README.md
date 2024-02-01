# 상어 (상담 어때요)

![sangeo](/uploads/299b8fb54f1906eaa3f9cba461aefb2e/sangeo.png)


## 서비스 특징

- Web RTC 기반  공유 그림판을 이용한 실시간 미술 심리 상담

## 주요 기능

  - 네이버 API를 이용한 로그인, 본인 인증을 통한 회원가입 
  - 스케줄 기반 상담 예약
  - 화상 미팅룸
  - 다른 사람의 그림을 확인하는 공유 그림판

## 주요 기술

  - WebRTC
  - WebSocket
  - JWT Authentication
  - REST API
  - CANVAS API

## 서비스 시연 영상

  ### 네이버 로그인 API
  
  ---
 
  ![네이버로그인](/uploads/ba8bdba38adcd80981733b1feedc8fdf/네이버로그인.mp4)

  ### 본인 인증
  
  ---
  
  ![1._유저_회원가입___로그인](/uploads/f708eae65a87bca28fcf9ab0ff837520/1._유저_회원가입___로그인.mp4)

  ### 공유 그림판 - 채팅

  ---

  ![9._상담_서비스_시작___채팅](/uploads/1938f42dd52b0b4e11684e0b9699cf6c/9._상담_서비스_시작___채팅.mp4)

  ### 공유 그림판 - 그림 업로드 & 저장

  ---

![10._상담_그림_업로드___그리기___저장](/uploads/8f77a6ac42895da952a7e5bb266a5057/10._상담_그림_업로드___그리기___저장.mp4)

  ### 공유 그림판 - 그리기

  ---

![11._다양한_펜을_통한_그림_그리기](/uploads/06a2364f93be8bc671f80393cab500d4/11._다양한_펜을_통한_그림_그리기.mp4)


더 많은 영상은 👉[여기](https://lab.ssafy.com/s07-webmobile1-sub2/S07P12E207/-/blob/master/%EC%A0%84%EC%B2%B4%20%EC%8B%9C%EC%97%B0%20%EC%98%81%EC%83%81.md)👈서 확인 가능합니다

### 🖥️ 개발환경

---

# 프론트 엔드 버전 확인, 세부 개발환경 추가로 있다면 적어주세요

🖥️**frontend**

- Visual Studio Code
- React v18 
- redux version ???
- Node.js 14.17.0
- Material-UI
- styled-components version ???

🖥️**backend**

- Eclipse 2020-06
- STS 3.9.14
- Java 8
- Spring Boot Gradle 6.7
- lombok, Querydls-jpa, swagger2

🖥️**DB**

- MySQL 5.7.39

🖥️**webRTC**

- openvidu 2.20.0

🖥️**배포 환경**

- aws ec2
- nginx

### 서비스 아키텍처

---

![아키텍처_구성도](/uploads/a1cb9668330a9c97c2c32998cbd17e30/아키텍처_구성도.png)

### 서비스 흐름도

---

![서비스_흐름도](/uploads/71bcd956e0eae90e3bf74a219963a118/서비스_흐름도.png)


### E-R 다이어그램

---

![erd](/uploads/6bea1614708a3f1133ffbae4f44a2619/erd.png)

협업을 위해 ERD Cloud를 이용해서 테이블 설계를 진행했습니다.

### 협업 툴

---

- GitLab
- Jira
- Notion
- Mattermost
- Webex


### 화면 설계서

---

![화면_설계서_피그마_](/uploads/574ba76ae735e628db0f775905e45c94/화면_설계서_피그마_.png)

### Git 컨벤션

---

  - Feat : 기능 구현
  - Fix : 버그를 고친 경우
  - Style : CSS, 포맷 수정 등 코드 변경이 없는 경우
  - Docs : 문서를 수정한 경우 (ex> Readme.md)
  - Build : 빌드 관련 (ex > appliation.properties)
  - Remove : 파일 삭제
  - Chore : 사소한 경우 (ex > delete irrelevant  import)

### Git 브랜치 전략

---

![깃브랜치_전략](/uploads/5085c8538105b8443ba89cce9de42c6f/깃브랜치_전략.png)

  FE와 BE로 나눠서 기능을 구현, 기능 구현 / 버그 수정 / CSS 등 작업시 해당 브랜치에서 Feat/Fix/Style 등으로 브랜치를 생성해서 merge 하였습니다. 


### Jira

---

협업 및 일정관리를 위해 Jira를 사용했습니다. 총 6주간의 기간 동안 1주일 단위로 스프린트를 짜고, 진행할 이슈들을 스토리로 만들어 진행했습니다. 테스트 중 버그가 발생하면 버그로 등록하고 해결했고, MatterMost 알림등으로 팀원들에게 공유했습니다.

### [Notion]((https://nifty-artichoke-167.notion.site/30a8f33c69eb4646bfa754072cf9917a))

---

회의록, 컨벤션 규칙, Git 브랜치 전략, 회고와 학습 지식 공유 등 각 단계별 산출물이 모두 정리되어 있습니다.



### 팀 소개 및 팀원 역할

---

- 이상진 : 팀장, 백엔드 개발
  - openvidu를 통한 WebRTC 구현
  - EC2, Nginx를 이용한 수동배포 설정
  - 색상, 굵기, 업로드 & 다운로드 등이 가능한 공유 그림판 구현
  - 전체적인 디자인 및 css 스타일링

  # 적어주세요
* 김준구: 부팀장, 프론트엔드 개발

* 인예림: 프론트엔드, 백엔드 개발
  - 회원가입(본인인증), 로그인(네이버 로그인) : 프론트엔드, 백엔드 
  - 반응형 NavBar 구현 : 프론트엔드
  - 예약하기 구현 : 프론트엔드 
  - 리뷰 관리, 자격증 관리 : 백엔드

* 정민지: 프론트엔드 개발
  - Cloudinary를 이용한 이미지 업로드 기능 구현(프로필 사진, 자격증, 분석그림 업로드)
  - 별점 및 리뷰 작성 : 프론트엔드
  - 강사 목록 페이지 : 프론트엔드
  - 강사 상세 페이지 : 프론트엔드
  - 메인페이지 디자인


