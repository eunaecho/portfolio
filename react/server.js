const { application } = require('express');
const express = require('express');
const server = express();
const port = 3001;


// port 번호로 서버 오픈
server.listen(port, () => {
    console.log(`server works on port : ${port}`);
});

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// user/board 
server.get('/user/board', (req, res) => {
    res.send(' 사용자 게시판 리스트 ');
});

// user/write
server.get('/user/write', (req, res) => {
    res.send(' 사용자 글작성 화면 ');
});

// admin/board
server.get('/admin/board', (req, res) => {
    res.send(' 관리자 게시판 리스트 ');
});

// admin/read
server.get('/admin/read', (req, res) => {
    res.send(' 관리자 글 읽기 ');
});