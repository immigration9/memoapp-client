# MemoApp Client

> React 기반 Memo 저장 애플리케이션.

## 사용된 프레임워크 및 라이브러리

* react: React 16.10 버전 이용. Hook으로 컴포넌트 구성
* redux: 통합 상태 관리를 위해 사용 
* react-redux
* redux-thunk: 비동기 Redux Action을 처리하기 위해 사용

* styled-components: CSS 대체를 위해 사용
* axios: API 호출을 위해 사용
* moment: Timestamp formatting을 위해 사용

* react-draft-wysiwyg : 아래 3개의 라이브러리는, DraftJS 기반 Wysiwyg 에디터 사용을 위해 구성.
* html-to-draftjs
* draft-js

## 기능들

* SPA 형태로 동작하며, 페이지 새로 고침시 마지막에 보았던 페이지로 이동
* HTML 형식으로 텍스트 저장 가능
* 메모의 제목 / 내용 / 최종 수정일 / 생성일 조회 가능
* 라벨로 메모 분류 가능
* 메모 추가 / 수정 / 삭제 가능

* 라벨에 해당하는 메모 없을 경우 안내 화면 표시
* 페이지 이동간에 이전에 보았던 라벨, 메모의 조회 순서에 따라 이동

## 실행방법

### 1. DB 설치 및 실행

memoapp-api 필요
* 자세한 정보는 링크 참조: [https://github.com/dramancompany/memoapp-api](https://github.com/dramancompany/memoapp-api)

* MongoDB 설치 (if not installed)

- Mac:
```bash
brew install mongodb
```

- Ubuntu:
```bash
sudo apt-get -y install mongodb
```
- Windows: [https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

API 프로젝트 루트 폴더에서 아래 명령어로 MongoDB 시작

```bash
mongod --dbpath ./data/db/
```

### 2. API 프로젝트

```bash
git clone https://github.com/dramancompany/memoapp-api.git
cd memoapp-api
npm install
```

API server 시작

```bash
PORT=3000 npm start
```

### 3. Front 프로젝트 실행

```bash
cd memoapp-client
yarn install
```

Front 프로젝트 실행

```bash
PORT=3001 yarn start
```

## 컴포넌트 설계
[컴포넌트 설명](./Components.md)

## 향후 TODO
- 다중 선택하여 삭제하기
- 다중 선택 후 Label 등록하기
- Test 코드 넣기 (환경만 구성 후 시간 관계상 실행하지 못함)
- Build & Deploy용 코드 수정
- 반응형으로 구성