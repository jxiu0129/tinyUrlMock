# TinyURL Mock

#### FunNow 二面測驗

<!-- 面試用測驗 -->

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Overview

-   **Installation**
-   **Requirements**
-   **How to use**
-   **APIs**
-   **Source Code File Structure**
-   **Further updates ideas**

## Installation

```shell
git clone https://github.com/jxiu0129/tinyUrlMock.git
cd tinyUrlMock
yarn install && yarn start
```

## Requirements

#### Service Requirements

-   [x] 1. 設計一支 API，使用者給一組長網址，response 短網址，長度為 6 位英數大小寫混合 - e.g. www.google.com -> localhost:8080/Gjh5t8

-   [x] 2. 設計一支 API，使用者給一組短網址，redirect 到長網址 - e.g. localhost:8080/Gjh5t8 -> www.google.com

-   [x] 3. 短網址有期限，過期時間為一年

-   [x] 4. 長網址與短網址為一對一

-   [x] 5. 不需要實作前端畫面，實作 API 即可

#### Technical Requirements

-   [x] 1. 請將作業上傳至 Github

-   [x] 2. 可以使用任何熟悉的語言或 framework (不影響面試結果)，但 Go 搭配 Gin 尤佳

-   [x] 3. 可以使用任何能滿足需求的資料庫

-   [x] 4. 請盡可能的考慮 API 實作的細節：如程式碼可讀性、適當的註解、request 的驗證等等 ，我們考慮細節更甚完成度

-   [x] 5. 不需考慮 high concurrency，但需要考慮限制同一 IP 刻意地重複請求

-   [x] 6. 不需部署至雲端，localhost 可執行即可

#### Additional Requirements

-   [x] 1. 單元測試

-   [x] 2. 將服務包裝成 docker

## How To Use

### - localhost version

-   需有安裝 **redis** server ，使用 **6379** port
-   使用 **yarn** 作為 node module manager

1. 在根目錄匯入.env 檔
2. 執行`yarn start`
3. 執行`yarn test`可跑測試用檔案
4. 先用 postman 或是任何 api tools， **get** [localhost:3000/admin](localhost:3000/admin)，注入 shorten url 所需要的 keys

### - Docker version

1. 在根目錄執行`docker compose up -d`
2. `docker exec -it express-server yarn test`可執行 test
3. 先用 postman 或是任何 api tools， **get** [localhost:3001/admin](localhost:3001/admin)，注入 shorten url 所需要的 keys
4. [localhost:8080](localhost:8080) 可使用 mongo-express 查看 mongoDB 資料

-   備註：**Ports**
    -   Redis:6379
    -   mongodb:27017
    -   mongo-express:8080
    -   api-server(docker):3001

## APIs

### - create TinyUrl

#### request

```http
POST /createTinyUrl
```

_request body (Form Encoded)_
name|value
:-- | :--
url | https://www.google.com

#### response

```json
{
    "status": 200,
    "message": "createTinyUrl success",
    "data": {
        "originalUrl": "www.google.com",
        "shortenUrl": "localhost:3000/SG6ZsI"
    },
    "time_tw": "2022-01-24T17:21:19.452Z"
}
```

### - redirect TinyUrl

#### request

沿用上面範例回傳之短網址

```http
GET /SG6ZsI
```

#### response

將使用者導回原輸入之網址，在這範例中是 www.google.com

### - add new keys (for key db)

#### request

```http
GET /admin
```

#### response

```json
{
  "status": 200,
  "message": "createNewKeys success",
  "data": [
    {
      "uniqueKey": "YLqKXe",
      "_id": "61eee35dc9de5ad2aa4a7e90",
      "__v": 0
    },
    {
      "uniqueKey": "xdOrVB",
      "_id": "61eee35dc9de5ad2aa4a7e91",
      "__v": 0
    },
    ...共50筆
  ],
  "time_tw": "2022-01-24T17:35:25.340Z"
}
```

## Source Code File Structure

```
.
├── Dockerfile
├── README.md
├── app
│   ├── app.js
│   ├── config
│   │   ├── MongoDB.js
│   │   ├── Redis.js
│   │   ├── Schedule.js
│   │   └── index.js
│   ├── controllers
│   │   ├── admin.controller.js
│   │   └── url.controller.js
│   ├── dao
│   │   ├── KGS.dao.js
│   │   └── url.dao.js
│   ├── index.js
│   ├── logic
│   │   ├── admin.logic.js
│   │   └── url.logic.js
│   ├── models
│   │   ├── UnusedKeys.model.js
│   │   ├── Url.model.js
│   │   └── UsedKeys.model.js
│   ├── routes
│   │   └── index.js
│   ├── services
│   │   └── KeyGenerate.service.js
│   └── utils
│       ├── ApiResponse.js
│       ├── Checker.js
│       └── index.js
├── coverage -> 測試後coverage資訊
│
├── dist
│   ├── app.js
│   ├── config
│   │   ├── MongoDB.js
│   │   ├── Redis.js
│   │   ├── Schedule.js
│   │   └── index.js
│   ├── controllers
│   │   ├── admin.controller.js
│   │   └── url.controller.js
│   ├── dao
│   │   ├── KGS.dao.js
│   │   └── url.dao.js
│   ├── index.js
│   ├── logic
│   │   ├── admin.logic.js
│   │   └── url.logic.js
│   ├── models
│   │   ├── UnusedKeys.model.js
│   │   ├── Url.model.js
│   │   └── UsedKeys.model.js
│   ├── routes
│   │   └── index.js
│   ├── services
│   │   └── KeyGenerate.service.js
│   └── utils
│       ├── ApiResponse.js
│       ├── Checker.js
│       └── index.js
├── docker-compose.yml
├── jest.config.js
├── package.json
├── test
│   ├── logic
│   │   └── url.logic.test.js
│   └── service
│       └── KGS.test.js
├── yarn-error.log
└── yarn.lock
```

## Further updates ideas

-   加入 User，可客製化 domain
-   以分散式系統作為出發點，另開 redis server，以 80/20 法則，將 keys 的 20%放進此 redis server，把放進去的都移至 usedkey db，在取用 keys 都直接從此取得，一來減輕 db 的 read load，二來若此 redis server 掛了也不用擔心所有的 keys 都不見了
-   reduncdants, replicas
