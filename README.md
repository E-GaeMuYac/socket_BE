# 🥜PILLNUTS - Backend🥜

<hr>
<img width="1050" src="https://blogfiles.pstatic.net/MjAyMzAyMDhfMzAg/MDAxNjc1ODE5MjQyODU3.xO8AWBq1jfjIGabWTvpxU-TrpZdHTiuoYaUKzSN766Ug.6k5fza_yeckWUmEtehT_C_JacEZ9LG6eSiEZgWe3aE8g.PNG.sa02019/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2023-02-08_%EC%98%A4%EC%A0%84_10.16.48.png">
<br>

### [💊 Pillnuts 바로가기](https://pillnuts.store)

#### [🖥️ Pillnuts FE Github](https://github.com/E-GaeMuYac/FE)

#### [💻 Pillnuts WebServer Github](https://github.com/E-GaeMuYac/BE)

#### [💬 Pillnuts ChatServer Github](https://github.com/E-GaeMuYac/socket_BE)

#### [⛵️ Pillnuts Lambda Github](https://github.com/E-GaeMuYac/Lambda_BE)
<br/>

## 🗂️ 목차

### 1. [프로젝트 소개](#-프로젝트-소개)

### 2. [팀 구성](#-팀-구성)

### 3. [기술 스텍](#-기술스택)

### 4. [라이브러리](#-라이브러리)

### 5. [주요 기능](#️-주요-기능)

### 6. [아키텍쳐](#-백엔드-아키텍처)

### 7. [모니터링](#-모니터링)

### 8. [최종 성과](#-최종-성과)

### 9. [트러블 슈팅](#-트러블-슈팅)

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

| 기술스택       |        설명         |
| -------------- | :-----------------: |
| Node.js        | 자바스크립트 런타임 |
| Express        |    웹 프레임워크    |
| MySQL          |        MySQL        |
| MongoDB          |        NoSQL        |
| Docker         |       컨테이너 관리        |
| Grafana        |   시각화 대시보드   |
| Github actions |   WebServer CI/CD   |
| Code pipeline  |  ChatServer CI/CD   |
| swagger        |     API 문서화      |

<br>

## 📖 라이브러리

### 💻 웹서버

| 라이브러리         |        설명        |
| ------------------ | :----------------: |
| axios              |  HTTP 비동기 통신   |
| bcrypt             |  비밀번호 암호화   |
| cors               |  교차 리소스 공유  |
| dotenv             |   환경변수 관리    |
| express            |        서버        |
| express-rate-limit |   요청 횟수 제한   |
| joi                |  입력데이터 검출   |
| jsonwebtoken       |    서명 암호화     |
| mysql              |       MySQL        |
| node-cron          | 스케쥴 업무 자동화 |
| passport           | User Authenticate  |
| sequelize          |     MySQL ORM      |
| sequelize-cli      | MySQL ORM Console  |

### 💬 채팅서버

| 라이브러리                |       설명       |
| ------------------------- | :--------------: |
| socket.io/admin-ui        |   소켓 관리 UI   |
| cors                      | 교차 리소스 공유 |
| dayjs                     | 날짜 라이브러리  |
| dotenv                    |  환경변수 관리   |
| express                   |       서버       |
| mongoose                  |       ODM        |
| socket.io                 |   실시간 통신    |
| winston                   |  Log 파일 생성   |
| winston-daily-rotate-file |  Log 파일 관리   |

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

### 인프라 아키텍쳐

![최종본](https://user-images.githubusercontent.com/103705842/217458384-6bb4b5bd-90ee-4470-b156-e36fff9f88f2.png)

<br>

## 🗄️ DB ERD

<img width="1050" alt="스크린샷 2023-02-05 오전 3 00 18" src="https://user-images.githubusercontent.com/103705842/216901474-a1494c6e-15e3-4c79-9d3a-6878d2c965a7.png">

## 🎬 모니터링

### ELB Metrics

![스크린샷 2023-02-08 오후 3 46 47](https://user-images.githubusercontent.com/103705842/217455314-1d3e16b2-8e72-40dd-8777-e47d3d651e5d.png)

### ECS

![스크린샷 2023-02-08 오후 2 34 15](https://user-images.githubusercontent.com/103705842/217443969-3ab46260-17a1-4f15-9a7b-78a9cc8486cf.png)

## 🎬 최종 성과

추후에 추가

## 🌠 트러블 슈팅

### 1. CI/CD

#### 동적포트매핑

- **어떤 문제점을 겪었는가?**

  CI/CD 구축 후 테스트 중 ECS 서비스 이벤트 창에서 **호스트포트가 중복**되었다는 이슈 발생

- **왜 이런 문제가 발생했는가?**

  무중단배포를 하기에 기존의 컨테이너가 꺼지고 새로운 컨테이너가 켜지는게 아닌 **동시에 켜져있는 경우**가 생겨 호스트번호를 지정해줄시에 겹칠 수 밖에 없음

- **어떻게 해결했는가?**

  동적포트매핑을 이용하여 호스트번호를 0으로 설정하여 휘발성포트번호(49153~65535)에서 랜덤하게 매핑해주고 서비스에서 로드밸런싱 설정을 통해 컨테이너를 타켓그룹으로 바로 잡아 도매인 주소로 문제없이 접속이 가능

#### 오토스케일링

- **어떤 문제점을 겪었는가?**

CI/CD 구축 후 테스트 중 ECS 서비스 이벤트 창에서 **사용가능한 `CPU`, `Memory`가 부족**하다는 이슈 발생

- **왜 이런 문제가 발생했는가?**

  1. 무중단배포를 하기에 기존의 컨테이너가 꺼지고 새로운 컨테이너가 켜지는게 아닌 **동시에 켜져있는 경우**가 생겨 작업정의에서 설정한 `CPU, Memory * 돌아가는 컨테이너의 수`가 EC2의 Instance의 CPU, Memory를 넘어가면서 생기는 이슈

  2. 위 문제를 해결하기위해 컨테이너의 CPU, Memory를 너무 낮게 잡으면 EC2의 사양을 제대로 다 사용하지 못 하는 상황

  3. SeverLess인 ECS Fargate를 쓰면 따로 서버관리가 필요하지않기에 해결가능한 문제지만 비용이 비교적 비쌈

- **어떻게 해결했는가?**

  1. 컨테이너의 CPU,Memory를 EC2의 Instance의 CPU, Memory의 1/4로 할당하고 컨테이너를 두개 돌리는 상황에서 CI/CD를 테스트 해봤을 때 롤링배포가 잘 되는 것을 확인

  2. 부하테스트를 해봤을 때, 메모리 사용량은 크게 늘지않고 CPU 사용량이 오버되어 서버가 터지는 것을 확인

  3. ECS의 컨테이너 CPU 사용량이 40퍼 이상이 넘어가면 Scale-Out, 30퍼 이하가 되면 Scale-In이 되게 설정

  4. Scale-Out이 되었을 땐 배포를 피해야하기에 Cloud Watch Alarm - SNS - Lambda - discord WebHook을 통해 오토스케일링이 실행될 때 디스코드로 해당 로그가 전송됨

  5. 혹시 모를 경우를 대비해 클러스터에서 용량 공급자를 설정해 Scale-Out이 되었음에도 불구하고 CPU 샤용량이 부족해지면 미리 Task를 계산하고 EC2를 Scale-Out을 하여 실행되면 계획된 Task를 바로 배치
     
     <img width="273" alt="스크린샷 2023-02-08 오후 9 26 30" src="https://user-images.githubusercontent.com/103705842/217529467-1ae6f85d-16dc-44a3-932e-98bcc3bcc2a8.png">

#### 환경변수

- **어떤 문제점을 겪었는가?**

  Dockerfile 를 빌드할 경우, `.env`파일을 참조해오지 못해서 CI/CD 배포 후 **컨테이너에 어플리케이션을 구동하기 위한 `.env`가 없는 이슈**

- **왜 이런 문제가 발생했는가?**

  1. `.env`은 보안상 예민한 정보를 담고있어 Public 저장소에 올릴 수 없었다.

     작업 정의에 환경변수 값을 넣을 수 있지만 **그대로 다 노출이 되는 상황**이 발생

  2. CD 단계에서 DockerFile를 build할 때 `.env`가 없었으므로 그 결과 해당 image로 만든 컨테이너안에는 `.env`가 없었다.

- **어떻게 해결했는가?**

  AWS Systems Manager Parameter Store를 이용하여 env값을 parameter로 등록 후 arn을 작업정의 secrets에 올리는 방법으로 해결

### 2. 웹서버, 채팅서버 분리

- **어떤 문제점을 겪었는가?**

  채팅서버를 웹서버와 같은 서버에 배포할 시 **웹서버가 다운되면 채팅서버도 같이 다운**되어 가장 필요할 때 쓰지 못하는 이슈 발생

- **왜 이런 문제가 발생했는가?**

  같은 서버이기에 웹, 채팅 둘중 하나만 문제가 생겨도 둘 다 문제가 생겨버린다.

- **어떻게 해결했는가?**

  웹서버를 t3a.small로 배포하기에 프리티어인 t2.micro를 쓸 수 있어 EC2 하나 더 생성하여 배포하였고, 데이터베이스도 분리하여 웹서버에 어떤 문제가 생겨도 채팅서버는 문제없이 동작

### 3. Lambda Rate Limit & Authorizer

- **어떤 문제점을 겪었는가?**

  이메일 & 휴대폰 인증을 본 서버에 두지않고 따로 `AWS API Gateway - AWS Lambda`로 빼둔 상태에서 누군가 요청을 악의적으로 무제한으로 보내면 그대로 요금 폭탄을 맞는 이슈가 생김

- **왜 이런 문제가 발생했는가?**

  우선 휴대폰 인증 자체가 유료 서비스고 Lambda도 쓴 만큼 내는 유료 서비스이고 따로 권한 설정을 하지않을 시에 아무나 요청을 보낼 수 있는 상황

- **어떻게 해결했는가?**

`Express-Rate-Limit` 라이브러리를 사용해 IP 당 요청을 제한, AWS API Gateway의 설정을 통해 메소드 제한, `API KEY` 설정을 통해 총 사용량 제한, `API KEY`를 보안적인 이유로 사용하는 것을 추천하지않기에 따로 `Lambda Authorizer` 설정을 통해 요청 시 JWT 토큰을 생성해 같이 헤더에 담아 API Gateway로 요청을 보내고 유효하면 allow, 유효하지않으면 deny를 반환해 에러를 띄우는 방식으로 구성하였다.

### 4. 로깅 & 모니터링 문제

- **어떤 문제점을 겪었는가?**

  1. 로깅 & 모니터링을 배포자만 볼 수 있고, 다른 팀원들은 보지 못 하는 문제
  2. `AWS Cloud Watch`를 통해 로깅 & 모니터링을 구성했지만, 가독성이 떨어지는 상황

- **왜 이런 문제가 발생했는가?**

  따로 AWS 조직을 만들어 배포하는 것이 아닌 개인이 배포하여 배포자만 볼 수 있어서 생기는 문제

- **어떻게 해결했는가?**

  시각화 툴인 Grafana를 설치하여 EC2 서버에 돌리고, 해당 EC2 IP + 3000 포트 번호를 알려주었고 팀원들만 볼 수 있어야하기에 EC2의 보안그룹의 인바운드 규칙으로 해결

### 5. 실시간 상담 문제

- **어떤 문제점을 겪었는가?**

  관리자와 유저가 1대1로 상담을 해주는 시스템이며, 관리자는 유저가 상담 요청하는 것을 수동으로 확인해야 즉각적인 상담이 가능하기에 비효율적임

- **왜 이런 문제가 발생했는가?**

  따로 알람 기능을 만들지 않았고, 소켓으로 웹페이지에서 알람 기능을 만들 수 있으나 웹페이지를 켜두지않거나 자리에 없으면 무용지물임

- **어떻게 해결했는가?**

  MongoDB Atlas에 트리거 기능을 활용해 유저가 상담 요청 시 Room 테이블에 Insert가 되고 트리거에 의해 AWS Event Bridge로 이벤트가 생성, 생성된 이벤트를 AWS Lambda 트리거로 이어서 Slack WebHook을 통해 알림이 울려 웹페이지를 보고있지않더라도, 모바일로도 확인이 가능하게 구성하였다.

<img width="526" alt="스크린샷 2023-02-08 오후 9 08 33" src="https://user-images.githubusercontent.com/103705842/217525692-52d25c28-a688-4b8d-a36d-de73e912467b.png">

### 6. Token 문제

- **어떤 문제점을 겪었는가?**

  JWT Token을 어떤 방식으로 사용해야하는 것에 대한 이슈 발생

- **왜 이런 문제가 발생했는가?**

  Access Token과 Refresh Token 둘 다 사용하고 있는데, 사실상 Access Token의 역할을 제대로 하는 것 같지 않아 문제가 발생

- **어떻게 해결했는가?**

  Token을 하나만 사용할 경우, 제 3자에게 탈취 당했을 시에 보안에 취약하다. 유효기간이 짧은 Token일 경우, 그만큼 사용자는 로그인을 자주 해서 새로운 Token을 발급 받아야 하기 때문에 불편하고 로그인을 시도할 때마다 DB에 있는 정보를 계속해서 불러와야 하기 때문에 이는 서버에 부하가 가게 된다. 반대로 Token의 유효기간을 늘린다면 Token이 탈취 당했을 경우, JWT는 발급한 후 삭제가 불가능하기 때문에 Token을 획득한 사람은 누구나 Token의 긴 유효기간동안 권한 접근이 가능해 이는 보안에 더욱 취약해지게 된다.
  그러므로 Refresh Token의 유효기간을 길게, Access Token의 유효기간을 짧게 설정하고, Access Token이 만료될 때마다 재발급해줌으로써 보안을 더욱 강화할 수 있고, 사용자의 불편함도 줄일 수 있다고 판단하여 Access Token과 Refresh Token 둘 다 사용하는 방법으로 해결
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
