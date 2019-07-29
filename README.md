# yapi-socketio-mock

## 简介

基于 yapi，实现 socket.io 的数据 mock

## 内网部署

环境要求：

- nodejs（7.6+)
- yarn or npm

安装：

```bash
wget https://github.com/GoldSubmarine/yapi-socketio-mock/archive/master.zip
unzip master.zip
cd yapi-socketio-mock-master
yarn install
node ./index.js
```

## docker 部署

环境要求：

- docker

安装：

```bash
wget https://raw.githubusercontent.com/GoldSubmarine/yapi-socketio-mock/master/Dockerfile;
docker build -t yapi-socketio-mock .
docker run --rm -d -p 3001:3001 yapi-socketio-mock
```

## 使用

```js
const socket = io("http://localhost:3001", {
    query: {
        mockUrl: "http://192.168.1.1:3000/mock/23/"
    }
});
```

创建 socket 连接时，添加 `mockUrl` 参数，值为当前项目的 yapi mock 地址，在生产环境时需要注释掉。
