# API 文档

所有的接口都部署在: `127.0.0.1:3000/api/v1` 下 


## 接口-用户

### 登录

```sh
/user/login
```

POST

调用例子：

```
➜  ~  curl -X POST -d "username=test&password=123456" "http://127.0.0.1:3000/v1/user/login"
{"message":"登录成功","user":{"username":"test","email":"test@qq.com","avatar":"https://avatars1.githubusercontent.com/u/18289264?s=460&v=4"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDAwMDEsInVzZXJuYW1lIjoidGVzdCIsInBhc3N3b3JkIjoiJDJiJDA1JFp6QWptVTl1TlU0VWQ2Q0JhNmJxRnU0ZWN5WHpwMUJ3Mkk5MU9xV1psWDJkanlLUEcyOEh5IiwiZW1haWwiOiJ0ZXN0QHFxLmNvbSIsImF2YXRhciI6Imh0dHBzOi8vYXZhdGFyczEuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTgyODkyNjQ_cz00NjAmdj00IiwidHlwZSI6MiwiY3JlYXRlRGF0ZSI6IjIwMTgtMDctMTBUMDE6NDY6MTEuMDAwWiIsInVwZGF0ZURhdGUiOiIyMDE4LTA3LTEwVDAxOjQ2OjExLjAwMFoiLCJjcmVhdGVfZGF0ZSI6IjIwMTgtMDctMTBUMDE6NDY6MTEuMDAwWiIsInVwZGF0ZV9kYXRlIjoiMjAxOC0wNy0xMFQwMTo0NjoxMS4wMDBaIn0sImV4cCI6MTUzMTE5MDg3OCwiaWF0IjoxNTMxMTg3Mjc4fQ._ot63GFTJTvYGZ6O0Mt8BBDxp4PQKT6u6zX5VtWHLs4"}%
```

### 注册

```sh
/user/register
```

POST

调用例子：
```
➜  ~ curl -X POST -d  "username=test&password=123456&email=test@qq.com" "http://127.0.0.1:3000/v1/user/register"
{"message":"注册成功","user":{"id":null,"username":"test","password":"$2b$05$ZzAjmU9uNU4Ud6CBa6bqFu4ecyXzp1Bw2I91OqWZlX2djyKPG28Hy","email":"test@qq.com","avatar":"https://avatars1.githubusercontent.com/u/18289264?s=460&v=4","type":2,"update_date":"2018-07-10T01:46:11.413Z","create_date":"2018-07-10T01:46:11.413Z","createDate":"2018-07-10T01:46:11.413Z","updateDate":"2018-07-10T01:46:11.413Z"}}%
```

### 查询某个用户信息

```sh
/user/:id
```

GET

调用例子：

```
➜  ~ curl "http://127.0.0.1:3000/v1/user/100001"
```

### 修改当前用户信息

```sh
/user
```

PUT

调用例子：

```
➜  ~ curl -H "authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDAwMDAsInVzZXJuYW1lIjoiY3BzZWx2aXMiLCJwYXNzd29yZCI6IiQyYiQwNSRYY3JRb0x2ZEp4Y3JHb3QybkhGcjAuLnNjczJ3cFV4YUZDRG1ieTc3aTQzajdDeUVYYUlkbSIsImVtYWlsIjoiY3BzZWx2aXNAZ21haWwuY29tIiwiYXZhdGFyIjoiaHR0cHM6Ly9hdmF0YXJzMS5naXRodWJ1c2VyY29udGVudC5jb20vdS8xODI4OTI2ND9zPTQ2MCZ2PTQiLCJ0eXBlIjowLCJjcmVhdGVEYXRlIjoiMjAxOC0wNi0yNlQwNDozMzo0Ny4wMDBaIiwidXBkYXRlRGF0ZSI6IjIwMTgtMDYtMjZUMDQ6MzM6NDcuMDAwWiIsImNyZWF0ZV9kYXRlIjoiMjAxOC0wNi0yNlQwNDozMzo0Ny4wMDBaIiwidXBkYXRlX2RhdGUiOiIyMDE4LTA2LTI2VDA0OjMzOjQ3LjAwMFoifSwiZXhwIjoxNTM3OTY2ODA3LCJpYXQiOjE1MzczNjIwMDd9.uSY4A6SioW9O2u0CI5goUCXF9djaCPeAtlLZIHjWpck" -X PUT "name=aaa" "http://127.0.0.1:3000/v1/user"
```

### 发布的文章

``` sh
/user/:id/article?page=1&per_page=10
```

GET

调用例子：

```
➜  ~ curl -X GET "http://127.0.0.1:3000/v1//user/:id/article?page=1&per_page=3"
[{"id":100000,"title":"test","description":"test","content":"test","thumbnail":"https://avatars1.githubusercontent.com/u/18289264\\?s\\=460\\","cid":1,"uid":1,"isWeekly":null,"createDate":"2018-07-10T01:57:47.000Z","updateDate":"2018-07-10T01:57:47.000Z","create_date":"2018-07-10T01:57:47.000Z","update_date":"2018-07-10T01:57:47.000Z"},{"id":100001,"title":"test","description":"test","content":"test","thumbnail":"https://avatars1.githubusercontent.com/u/18289264\\?s\\=460\\","cid":1,"uid":1,"isWeekly":null,"createDate":"2018-07-10T01:57:59.000Z","updateDate":"2018-07-10T01:57:59.000Z","create_date":"2018-07-10T01:57:59.000Z","update_date":"2018-07-10T01:57:59.000Z"},{"id":100002,"title":"test","description":"test","content":"test","thumbnail":"https://avatars1.githubusercontent.com/u/18289264\\?s\\=460\\","cid":1,"uid":1,"isWeekly":null,"createDate":"2018-07-10T01:58:00.000Z","updateDate":"2018-07-10T01:58:00.000Z","create_date":"2018-07-10T01:58:00.000Z","update_date":"2018-07-10T01:58:00.000Z"}]%
```

### 点赞的文章

``` sh
/user/:id/starred?page=1&per_page=10
```

GET

调用例子：

```
➜  ~ curl -X GET "http://127.0.0.1:3000/v1//user/:id/starred?page=1&per_page=3"
[{"id":100000,"title":"test","description":"test","content":"test","thumbnail":"https://avatars1.githubusercontent.com/u/18289264\\?s\\=460\\","cid":1,"uid":1,"isWeekly":null,"createDate":"2018-07-10T01:57:47.000Z","updateDate":"2018-07-10T01:57:47.000Z","create_date":"2018-07-10T01:57:47.000Z","update_date":"2018-07-10T01:57:47.000Z"},{"id":100001,"title":"test","description":"test","content":"test","thumbnail":"https://avatars1.githubusercontent.com/u/18289264\\?s\\=460\\","cid":1,"uid":1,"isWeekly":null,"createDate":"2018-07-10T01:57:59.000Z","updateDate":"2018-07-10T01:57:59.000Z","create_date":"2018-07-10T01:57:59.000Z","update_date":"2018-07-10T01:57:59.000Z"},{"id":100002,"title":"test","description":"test","content":"test","thumbnail":"https://avatars1.githubusercontent.com/u/18289264\\?s\\=460\\","cid":1,"uid":1,"isWeekly":null,"createDate":"2018-07-10T01:58:00.000Z","updateDate":"2018-07-10T01:58:00.000Z","create_date":"2018-07-10T01:58:00.000Z","update_date":"2018-07-10T01:58:00.000Z"}]%
```

