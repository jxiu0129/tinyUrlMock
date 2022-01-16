# TinyURL Mock

<!-- ### FunNow 二面測驗 -->

<!-- 面試用測驗 -->

<!-- [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) -->

## Installation

<!-- ```shell
git clone https://github.com/jxiu0129/noodoe_backend_test.git
cd noodoe_backend_test
yarn install && yarn start
``` -->

## Requirements

### Service Requirements

-   [x] 1. 設計一支 API，使用者給一組長網址，response 短網址，長度為 6 位英數大小寫混合 - e.g. www.google.com -> localhost:8080/Gjh5t8

-   [x] 2. 設計一支 API，使用者給一組短網址，redirect 到長網址 - e.g. localhost:8080/Gjh5t8 -> www.google.com

-   [x] 3. 短網址有期限，過期時間為一年

-   [x] 4. 長網址與短網址為一對一

-   [x] 5. 不需要實作前端畫面，實作 API 即可

### Technical Requirements

-   [ ] 1. 請將作業上傳至 Github

-   [x] 2. 可以使用任何熟悉的語言或 framework (不影響面試結果)，但 Go 搭配 Gin 尤佳

-   [ ] 3. 可以使用任何能滿足需求的資料庫

-   [ ] 4. 請盡可能的考慮 API 實作的細節：如程式碼可讀性、適當的註解、request 的驗證等等 ，我們考慮細節更甚完成度

-   [ ] 5. 不需考慮 high concurrency，但需要考慮限制同一 IP 刻意地重複請求

-   [x] 6. 不需部署至雲端，localhost 可執行即可

### Additional Requirements

-   [ ] 1. 單元測試

-   [ ] 2. 將服務包裝成 docker

## How To Use

<!-- -   在根目錄匯入.env 檔
-   執行`yarn start`之後，可開啟 [swagger API doc](http://localhost:3000/api-docs) 做查看
-   流程：
    1. 註冊（email, pwd）
     -->

## Source Code File Structure

<!-- ```
├── README.md
├── app
│   ├── config
│   │   ├── MongoDB.js
│   │   ├── Schedule.js
│   │   └── index.js
│   ├── controllers
│   │   ├── user.controller.js
│   │   └── weather.controller.js
│   ├── dao
│   │   ├── user.dao.js
│   │   └── weather.dao.js
│   ├── logic
│   │   ├── user.logic.js
│   │   └── weather.logic.js
│   ├── models
│   │   ├── User.model.js
│   │   └── Weather.model.js
│   ├── routes
│   │   ├── index.js
│   │   ├── user.route.js
│   │   └── weather.route.js
│   ├── services
│   └── utils
│       ├── ApiResponse.js
│       ├── ApiServices.js
│       ├── Permission.js
│       └── index.js
├── index.js
├── package.json
├── swagger.yaml
├── yarn-error.log
└── yarn.lock
``` -->
