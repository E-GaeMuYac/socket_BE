# 🥜PILLNUTS - Backend🥜

<hr>
<br>

## 🗂️ 목차

### 1. [프로젝트 소개](#-프로젝트-소개)

### 2. [팀 구성](#-팀-구성)

### 3. [기술 스텍](#-기술스택)

### 4. [라이브러리](#-라이브러리)

### 5. [주요 기능](#️-주요-기능)

### 6. [아키텍쳐](#-백엔드-아키텍처)

### 7. [최종 성과](#-최종-성과)

### 8. [트러블 슈팅](#-트러블-슈팅)

<hr>
<br>

## 📈 프로젝트 소개

#### 이 약💊이랑 저 약💉이랑 매일 똑같다고 주는데 뭐가 똑같고 어떤게 다른 건지 궁금하다면!

- 📌 Pillnuts는 알약(pill)과 땅콩(peanuts)의 합성어로, 땅콩의 껍질을 까서 먹는 것을 모티브로 하여 ‘약의 속(성분)을 파헤쳐보자’ 라는 의미이다.

<br>

## 🗓 프로젝트 기간

- 2022년 12월 30일 ~ 2023년 2월 10일

<br>

## 🧑‍💻 팀 구성

<table>
  <tr>
  <td colspan='3' align="center">
  Backend
  </td>
  <tr>
        </td>
    <td align="center" >
    <b>김영재(팀장)</b></a><br>
    <a href="https://github.com/youngjae0411">Github</a>
    <br><img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/><br>
    </td>
        </td>
    <td align="center" >
    <b>노연수</b></a><br>
    <a href="https://github.com/soogineer">Github</a>
    <br><img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/><br>
    </td>
        </td>
    <td align="center" >
    <b>김혜란</b></a><br>
    <a href="https://github.com/kimmand0o0">Github</a>
    <br><img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/><br>
    </td>
    </tr>
</table>

<br>

## 🛠 기술스택

| 기술스택 |        설명         |
| -------- | :-----------------: |
| Node.js  | 자바스크립트 런타임 |
| Express  |    웹 프레임워크    |
| MySQL    |        MySQL        |
| Docker   |       Docker        |

<br>

## 📖 라이브러리

| 라이브러리     |        설명        |
| -------------- | :----------------: |
| bcrypt         |  비밀번호 암호화   |
| cors           |  교차 리소스 공유  |
| dotenv         |   환경변수 관리    |
| express        |        서버        |
| express-rate-limit       |        Rate limit       |
| joi            |  입력데이터 검출   |
| jsonwebtoken   |    서명 암호화     |
| mysql          |       MySQL        |
| node-cron      | 스케쥴 업무 자동화 |
| sequelize      |     MySQL ORM      |
| sequelize-cli | MySQL ORM Console  |
| passport       | User Authenticate  |

<br>

## 🕹️ 주요 기능

### 로그인 / 회원가입

- 영문 소문자, 숫자를 이용하여 아이디와 비밀번호를 설정할 수 있다.
- 네이버, 구글, 카카오를 통해 소셜 로그인을 할 수 있다.
- 문자로 본인인증을 할 수 있다.

### 검색

- 약의 제품명과 타입 (진통, 소염 등)의 키워드를 통해 검색 할 수 있다.
- 다른 유저들이 선호하는 순서대로 보여준다.
- 페이지네이션을 통해 한 페이지에 제공되는 정보의 수를 제한 하였다.
- 약을 찜하거나 다른 약과 비교하기 위해 보관함에 담을 수 있다.

### 상세페이지

- 성분을 그래프를 통해 한눈에 파악할 수 있게 보여준다.
- 성분의 상세 내용을 같이 확인 할 수 있다.
- 약을 찜하거나 다른 약과 비교하기 위해 보관함에 담을 수 있다.
- 효능효과, 주의사항등의 세부 정보를 확인 할 수 있다.
- 식약처 api를 가져와 사용하였다.

### 비교페이지

- 두가지 약을 같은 포맷으로 비교할 수 있다.
- 성분의 상세 내용을 같이 확인 할 수 있다.
- 효능효과, 주의사항등의 세부 정보를 비교하며 확인 할 수 있다.
- 약을 찜하거나 다른 약과 비교하기 위해 보관함에 담을 수 있다.
- 식약처 api를 가져와 사용하였다.

### 마이페이지

- 닉네임, 프로필이미지를 변경 할 수 있다.
- 진행되고 있는 이벤트를 유저에게 소개한다.
- 건강에 대한 한줄 글귀를 랜덤으로 유저에게 소개시켜준다.
- 유저가 찜한 의약품을 모아서 보여준다.
- 회원탈퇴를 할 수 있다.

### 알레르기 등록

- 유저가 가진 알레르기를 등록하여 해당 알레르기 성분이 든 약품을 피할 수 있다.
- 알레르기 검색 시 자동완성기능이 적용되어있다.
- 알레르기 등록 시 해당 성분이 포함된 약품을 조회할 때 위험표시를 해준다.

### 챗봇

- 유저에 따라 채팅방 생성이 가능하다.
- 로그인을 하지않아도 채팅이 가능하며, 전에 했던 채팅을 불러옵니다.
- 키워드를 입력 시 해당하는 정보를 답변으로 준다.
- “채팅”을 입력 후 상담 연결하기 버튼을 누르면 관리자와 실시간 상담이 가능하다.
- 실시간 상담 요청이 있을 시 슬랙으로 알림이 간다.

<hr>

<br>

## 🧱 백엔드 아키텍처
<img width="1050" alt="스크린샷 2023-02-06 오후 3 43 50" src="https://user-images.githubusercontent.com/103705842/216901433-8b8a3368-7573-49f4-bc24-523a87a87a3d.png">

![무제 drawio (3) drawio](https://user-images.githubusercontent.com/103705842/216901775-5e8b2402-4c92-44f3-a667-017572da849d.png)


<br>

## 🗄️ DB ERD
<img width="1050" alt="스크린샷 2023-02-05 오전 3 00 18" src="https://user-images.githubusercontent.com/103705842/216901474-a1494c6e-15e3-4c79-9d3a-6878d2c965a7.png">

## 🎬 최종 성과

추후에 추가

## 🌠 트러블 슈팅

추후에 추가

<br>

<br>

## ✍ Code Convention

- 변수 : lower case camel case
- function: camel case, 동사+명사

## 🐱 Git Rule

- commit convention
  - feat : 새로운 기능 추가
  - fix : 버그 수정
  - edit : 기능 수정
  - docs : 문서 수정
  - style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
  - refactor : 코드 리팩토링
  - test : 테스트 코드, 리팩토링 테스트 코드 추가
  - chore : 빌드 업무 수정, 패키지 매니저 수정
  - merge: pull 받은 후 바로 푸시를 해야될 경우
  - fire: 코드 정리
  - mig: migration
  - 제목은 50자 미만, 문장의 끝에 마침표 넣지 않음. 과거 시제 사용하지 않고, 명령어로 작성하도록 함.
  - 제목 외에 추가적으로 정보를 전달하고 싶을 경우 본문에 추가 정보 기입
    > 예시 : [feat] comment router CRUD 기능 추가 : 본인 이름
- 각 기능 브랜치에서 작업 후 push —> develop 브랜치에 merge는 pull requests를 통해서 하기.
  - 모든 pull requests는 팀원들의 확인 후 merge
  - 이슈가 생길 시 issue 탭 활용
    <br>
