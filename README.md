![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=ffffff)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=ffffff)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=ffffff)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222222?style=flat-square&logo=githubpages&logoColor=ffffff)

# 🛠️ 뚝딱 (Ddookddak)

유지보수가 필요한 사용자와 작업 가능한 사용자를 연결해주는  
**유지보수 요청 플랫폼**입니다.

전기, 설비, 누수, 도어락, 생활 수리 등  
일상 속 다양한 문제를 간편하게 등록하고,  
요청 상태를 한눈에 확인할 수 있도록 구성했습니다.

<br />

## 배포 주소

🔗 [서비스 바로가기](https://ohmyungsuk.github.io/my-web-portfolio-ddookddak/)

<br />

## 프로젝트 소개

**뚝딱**은 유지보수 요청을 등록하고,  
작업 가능한 사용자가 이를 확인하고 수락할 수 있도록 만든  
**SaaS형 유지보수 요청 서비스**입니다.

단순히 요청 글만 작성하는 게시판이 아니라,

- 요청 등록
- 전체 요청 조회
- 내 요청 관리
- 작업 수락
- 맡은 작업 관리
- 요청 상세 확인
- 마이페이지 및 계정 관리

까지 하나의 흐름으로 연결되는 서비스를 목표로 개발했습니다.

실제 서비스처럼 동작하는 흐름을 직접 설계하고 구현하면서,  
프론트엔드와 백엔드, 인증과 데이터 처리 구조를 함께 경험하는 데 초점을 맞췄습니다.

<br />

## 개발 목적

기존의 단순 CRUD 포트폴리오를 넘어서,  
**사용자 인증 / 요청 상태 관리 / 화면 분기 / 서비스 흐름 설계**까지 포함된  
실사용형 프로젝트를 만드는 것을 목표로 시작했습니다.

특히 아래와 같은 부분을 직접 고민하며 개발했습니다.

- 유지보수 요청 서비스라는 주제 선정
- 요청 등록부터 작업 수락, 진행 상태 확인까지의 전체 흐름 구성
- 로그인 방식에 따른 예외 처리 고려
- 사용자 중심의 화면 구조와 UI 개선
- 실제 배포를 염두에 둔 프로젝트 구조 분리

<br />

## 주요 기능

### 1. 회원가입 / 로그인
- 이메일 회원가입 및 로그인
- Google / Kakao 소셜 로그인 지원
- 로그인 상태 유지
- 마이페이지 연동

### 2. 요청 등록
- 제목, 카테고리, 장소, 상세 내용을 입력해 요청 등록
- 등록된 요청은 작성자 기준으로 관리 가능

### 3. 요청 목록 조회
- 전체 요청 목록 조회
- 내가 등록한 요청 목록 조회
- 내가 맡은 작업 목록 조회

### 4. 요청 상세보기
- 요청 상세 정보 확인
- 작성자 / 담당자 / 상태 확인
- 요청 수락 및 상태 변경 흐름 지원

### 5. 마이페이지
- 내 정보 확인
- 내 요청 / 맡은 작업 / 진행 현황 확인
- 이름 수정
- 비밀번호 변경
- 로그아웃 및 계정 설정 메뉴 구성

<br />

## 기술 스택

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Spring Boot
- Spring Security
- Gradle

### Database / Auth / Service
- Supabase
- Supabase Auth

### Version Control / Deploy
- Git
- GitHub
- GitHub Pages

<br />

## 프로젝트 구조

```bash
my-web-portfolio-ddookddak/
├── backend/
│   ├── src/main/java/com.portfolio.taejuneng
│   │   ├── config
│   │   ├── controller
│   │   ├── dto
│   │   └── service
│   └── build.gradle
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── supabaseClient.js
│   ├── package.json
│   └── vite.config.js
└── .github/
## 핵심 구현 포인트

### 1. 서비스 흐름 중심 설계
단순 게시판이 아니라  
**등록 → 조회 → 수락 → 진행 → 완료** 흐름으로 구조를 설계했습니다.

### 2. 인증 방식 분기 처리
이메일 로그인과 Google/Kakao 소셜 로그인의 차이를 고려해  
마이페이지와 계정 설정 기능이 자연스럽게 동작하도록 구성했습니다.

### 3. 사용자 상태 기반 화면 분기
로그인 여부, 작성자 여부, 담당자 여부에 따라  
보이는 버튼과 가능한 동작이 달라지도록 처리했습니다.

### 4. 프론트와 백엔드 구조 분리
프론트엔드는 React 기반으로 구성하고,  
백엔드는 Spring Boot 기반 구조를 함께 설계했습니다.

프로젝트 진행 과정에서  
인증 및 데이터 처리는 Supabase를 중심으로 연결하여  
실제 서비스처럼 빠르게 검증할 수 있도록 구성했습니다.

### 5. UI 개선 반복
처음에는 기능 중심으로 시작했지만,  
이후 메인 화면과 마이페이지를 중심으로  
더 깔끔하고 서비스다운 느낌이 나도록 반복적으로 개선했습니다.

## 화면 구성

- 메인 랜딩 페이지
- 로그인 / 회원가입 페이지
- 요청 등록 페이지
- 내 요청 목록 페이지
- 전체 요청 목록 페이지
- 맡은 작업 목록 페이지
- 요청 상세 페이지
- 마이페이지

## 프로젝트를 통해 배운 점

이 프로젝트를 통해  
단순히 화면을 구현하는 것보다 더 중요한 것은  
**서비스 흐름을 설계하고, 상태를 안전하게 연결하는 것**이라는 점을 배웠습니다.

특히 인증, 요청 상태, 사용자 역할, 페이지 흐름이 함께 얽히는 구조를 직접 다루면서  
실제 서비스 개발에서 필요한 사고방식을 익힐 수 있었습니다.

또한 React 기반 UI 구성뿐 아니라,  
Spring Boot 백엔드 구조와 Supabase 인증/데이터 처리 방식을 함께 다루면서  
서비스를 여러 방식으로 확장할 수 있는 구조를 고민할 수 있었습니다.

## 아쉬웠던 점

- 초기에는 기능 구현에 집중하다 보니 UI 일관성이 부족했습니다.
- 로그인 방식이 다양해지면서 예외 처리 분기가 많아졌고,  
  이를 더 구조적으로 정리할 필요가 있었습니다.
- 회원탈퇴, 프로필 확장, 알림 등 계정 관련 기능은  
  이후 더 서비스답게 보완할 여지가 있습니다.

## 개선 방향

- 프로필 정보 수정 기능 확장
- 회원탈퇴 기능 고도화
- 알림 기능 추가
- 채팅 / 문의 연결 기능 확장
- 작업 완료 후 후기 및 평가 기능 추가
- 모바일 반응형 UI 보완

## 실행 방법

```bash
# frontend 이동
cd frontend

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
