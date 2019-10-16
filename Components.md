# 컴포넌트 설명

> 각 컴포넌트별 개별적인 구성에 대하여

## Source Folder 구조

* actions: 개별 테스팅에 좀 더 적합하게 만들고, 향후 애플리케이션이 커지는 경우를 감안하여 action / reducer를 별도의 폴더에 보관하는 방향으로 결정.

* components: 페이지에 실질적으로 렌더링 되는 모든 컴포넌트를 이 폴더 안에 위치. 기존에 Component - Container Pattern을 사용하였었지만, Hook을 사용하면서 분류의 필요성이 줄어들어 통합하였음. 관련 내용 링크 [Presentational and Container Components by Dan Abramov](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

* reducers: action 폴더와 분리된 reducer 폴더

* restApi: Rest API 주소가 계속해서 늘어나기 때문에, 코드 가독성을 위해 다른 폴더와 분리하였음. 

* styles: 개별적인 컴포넌트별 Style은 모두 각각의 컴포넌트 폴더 안에 위치하지만, Global과 Vendor와 같이 구분되기 모호한 경우에 한해서만 별도의 Style 폴더를 분리하였음.

* utils: 자주 사용될 util 함수만 분리


## 주요 File 설계

* index.js와 Store.js 파일 분리: 향후 Testing 목적을 위해 두 파일을 분류하여 Store만 가져와서 사용할 수 있도록 구성해 놓음

* App.js: Routing과 관련된 모든 로직을 본 파일에서 수행하도록 설계

* Style 파일과 Component 파일 분리: Style 관련 내용이 동일한 파일 내에 들어갈 경우, 코드의 가독성이 떨어진다고 판단하여 분리.


## 주요 컴포넌트 설계

### LabelList

* Label 목록
* 최하단의 버튼을 누를 경우 Label 생성 가능

### MemoList

* Label 수정 / 삭제 기능
* Label에 속한 Memo 목록
* Memo 추가 가능: Memo 추가를 누르면 "noname"의 메모가 자동으로 추가된다. 특정 Label 안에서 생성할 경우 자동으로 해당 Label에 등록되도록 되어있다.

### MemoPad

* Memo 내용 수정 / 삭제
* Memo의 타이틀 수정
* 작성 일자 및 최종 수정 일자 표기