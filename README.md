# yapi-socketio-mock

## 简介

基于 yapi，实现 socket.io 的数据 mock

## 内网部署

环境要求：

- nodejs（7.6+)
- yarn or npm

安装：

```bash
git clone https://github.com/GoldSubmarine/yapi-socketio-mock.git
cd yapi-socketio-mock
yarn install
node ./index.js
```

## docker 部署

环境要求：

- docker

安装：

```bash
git clone https://github.com/GoldSubmarine/yapi-socketio-mock.git
cd yapi-socketio-mock
docker build -t yapi-socketio-mock .
docker run --rm -d --network host --name ysm yapi-socketio-mock
```

## 测试

服务启动后访问 `http://yourip:3001/`，从页面中连接 yapi，测试一个接口，如能成功，则部署成功。

## 防火墙

如果遇到服务无法访问，`http://yourip:3001/`页面打不开，尝试从防火墙开启端口

```bash
# centos 7
firewall-cmd --zone=public --add-port=3001/tcp --permanent
systemctl restart firewalld
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
