const port = 3001;

const axios = require('axios');
const http = require('http');
const fs = require('fs');
const server = http.createServer(function(request, response) {
    fs.readFile('./index.html', 'utf-8',function (err, data) {//读取内容
        if (err) throw err;
        response.writeHead(200, {"Content-Type": "text/html"});//注意这里
        response.write(data);
        response.end();
    });
});
const io = require('socket.io')(server);

io.on('connection', function(socket){
    console.log('a user connected');
    socket.use((packet, next) => {
        let mockBaseUrl = socket.handshake.query.mockUrl;
        if(mockBaseUrl) {
            if(/[^\/]$/.test(mockBaseUrl)) mockBaseUrl += "/";  //如果最后一位不是斜杠，就增加一个斜杠
            var event = packet[0].replace(/^\//, '');   //去除开头的斜杠
            sendMethods(mockBaseUrl + event)
                .then(res => socket.emit(event, res))
                .catch(err => socket.emit(event, err.message));
            return next();
        } else {
            socket.emit(packet[0], "缺少握手的query参数：mockUrl")
        }
	});
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

//发送所有类型的 http 请求
function sendMethods(url) {
    let methods = ["get", "post", "put", "delete", "options", "patch"];
    let resList = [];
    return Promise.all(methods.map(item => {
        return axios({
            method: item,
            url: url,
        }).then(res => resList.push(res)).catch(err => resList.push(err));
    })).then(() => {
        let existList = resList.filter(item => item.data.errcode != 404);
        if(existList.length === 0) throw new Error(`不存在的api, 当前请求path为 ${url}，请确认接口是否存在。`)
        if(existList.length === 1) return existList[0].data;
        if(existList.length > 1) throw new Error(`当前请求存在多种http类型的接口，path为 ${url}`)
    });
}
server.listen(port);