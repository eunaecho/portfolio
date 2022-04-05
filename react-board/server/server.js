const cors = require('cors');
const bodyParser = require('body-parser');

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: { origin:'*',
            methods: ["GET", "POST"]}});//socket 통신 : http 서버를 socket 서버로 upgrade
const PORT = process.env.PORT || 2999;

const mariadb = require('mysql');
const config = require('./database/db_config.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());    //cors Error : https://ooz.co.kr/232

server.listen(PORT, () => {
    console.log(`Socket IO server : http://localhost:${PORT}/`);
});

//socket server
io.on("connection", (socket) => {
    console.log("CONNECT :: New Cient Connected :: " , socket.id);
    {
        // 게시글 추가
        
        
        // 댓글 추가
        socket.on('addReply', ( boardIdx, replyWriter, content ) => {            
            // 댓글 db에 저장 : 댓글 idx(auto_), 게시글 idx, 작성자 이름, 내용, 시간(now())
            insertReply( boardIdx, replyWriter, content );
            // 저장 후 사용자, 관리자에게 알림
        })

        socket.on("disconnection", ( ) => {
            console.log('>>>> SERVER CONNECTION END ', socket.id);
        })
    }
});

// 기본 서버 확인
app.get('/', (req, res) => {
    res.send('Socket IO server listening on port 2999');
});

// db 연동
const db = mariadb.createPool(config);

// 사용자 -> 게시판 불러오기 (List)
app.get("/board/select", (req, res) => {
    const sqlQuery = "select idx, title, contents, writer_name, answer_yn, date_format(writedate, '%Y.%m.%d') as writedate from tb_board";
    db.query(sqlQuery, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })    
});

// 게시판 글 불러오기 (One)
app.use("/board/read/select/:index", (req, res) => {
    console.log(req);
    const sqlQuery = "select idx, title, contents, writer_name, answer_yn, date_format(writedate, '%Y.%m.%d. %r') as writedate from tb_board where idx = ?";
    db.query(sqlQuery, req.params.index, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })    
});

// 사용자 -> 게시글 저장 -> 데이터 받아서 -> db에 저장
app.post("/board/write/insert", (req, res) => {
    insertData(req.body.postTitle, req.body.postContent);
    if (err)
        throw err;
    else
        res.json({ code: "200", message: "success!"});
});

// 게시글 insert 함수
const insertData = (title, content) => {
    const sqlQuery = "insert into tb_board(title, contents, writer_name, answer_yn, writedate) values( ?, ?, ?, ?, now())";
        db.query(sqlQuery, 
            [title, content , '조은애', 'N'],
            function(err, result) {
                if(err)
                    throw err;
                else
                    result.json({ code: "200", message: "success!"});
            }
        )
}

// 댓글 insert 함수
const insertReply = (boardIdx, replyWriter, content) => {
    const sqlQuery = "insert into tb_comment(board_idx, commenter, contents, writedate)"
                     + " values( ?, ?, ?, ?)";
        db.query(sqlQuery, 
            [boardIdx, replyWriter, content, 'now()' ],
            function(err, result) {
                if(err)
                    throw err;
                else
                    result.json({ code: "200", message: "success!"});
            }
        )
}


