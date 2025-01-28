# REACT-MADE-WITH-VANILLA-JS

- 사용스택: vite, babel, typescript

## Script

- 실행하고자 할 땐 `yarn dev`를 입력합니다.

  - 현재 포트는 3000번으로 할당되어 있으며, 필요 시 vite.config.js의 port를 변경합니다.

- Babel을 통해 ts(x) -> js(x)로 컴파일하려는 경우 `yarn jsfy`를 입력합니다.

  - 이 경우 'jsfy'라는 디렉토리에 컴파일 결과물이 저장되며, 이름을 바꾸고 싶을 시 package.json 내 'jsfy' script의 '--out-dir' 뒤 디렉토리 이름을 수정하세요.

- vite를 통해 빌드하려는 경우 `yarn build`를 입력합니다.

## 참고

- 현재 rushstack은 eslint v9에 대한 반영이 미흡하기 때문에, 추후에 eslint v9으로 업그레이드 시 같이 반영할 예정입니다.
