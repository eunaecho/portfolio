const express = require('express');
const { emitWarning } = require('process');
const app = express();
const port = 8081;

const http = require('http').createServer(app);

app.get('/', (req, res) => {
    res.send('-----server로 전송중-----');
});

// 해당 포트에서 서버 실행 
// 리액트는 8080, 서버는 8081 -> 다른포트를 사용해야 서버와 클라이언트 분리가 가능
http.listen(port, () => {
    // 서버 정상으로 실행된 경우
    console.log(`Listening on ${port}`);
});