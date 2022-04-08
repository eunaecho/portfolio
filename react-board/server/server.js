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
const { query } = require('express');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());    //cors Error : https://ooz.co.kr/232

server.listen(PORT, () => {
    console.log(`Socket IO server : http://localhost:${PORT}/`);
});

//socket server
io.on("connection", (socket) => {
    console.log(":: New Cient Connected :: " , socket.id);{
        
        // 게시글 추가 요청
        socket.on('addBoard', (msg) => {
            // 게시글 추가 작업
            // 성공 -> 알리기 (모두에게 : boardUser/ boardAdmin 리렌더링) : db 저장 함수 안으로 넣기
            insertData(msg.postTitle, msg.postWriter, msg.postContent, io);
        });
        
         // 답변 달기
         socket.on('addComment', ( msg ) => {            
            // 댓글 db에 저장 : 댓글 idx(auto_), 게시글 idx, 작성자 이름, 내용, 시간(now())
            insertComment( msg.postBoardIdx, msg.postComment, io );
        });

        // 댓글 추가
        socket.on('addReply', (msg) => {    
            insertReply( msg.postBoardNum, msg.postRWriter, msg.postRContent, io );
        });

        socket.on("disconnection", ( ) => {
            console.log('>>>> SERVER CONNECTION END ', socket.id);
        });
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
    const sqlQuery = 
    "select b.idx, b.title, b.contents, b.writer_name, b.answer_yn, b.writedate , count(r.board_idx) as cnt" 
    + " from tb_board b left join tb_reply r on b.idx = r.board_idx"
    + " group by b.idx"
    db.query(sqlQuery, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })    
});

// 게시판 글 불러오기 (One)
app.get("/board/read/select/:index", (req, res) => {
    const sqlQuery = "select idx, title, contents, writer_name, answer_yn, date_format(writedate, '%Y.%m.%d. %r') as writedate from tb_board where idx = ?";
    db.query(sqlQuery, req.params.index, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })    
});

// 답변 불러오기
app.get("/board/read/select/:index/comment", (req, res) => {
    const sqlQuery = "select board_idx, contents, date_format(writedate, '%Y.%m.%d. %r') as writedate from tb_comment where board_idx = ?";
    db.query(sqlQuery, req.params.index, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })    
});


// 댓글 불러오기
app.get("/board/read/select/:index/reply", (req, res) => {
    const sqlQuery = "select idx, board_idx, commenter, contents, date_format(writedate, '%Y.%m.%d. %r') as writedate from tb_reply where board_idx = ?";
    db.query(sqlQuery, req.params.index, (err, result) => {
        if(err) throw err;
        else res.json(result);
    })    
});

// 게시글 insert 함수
const insertData = (title, writer, content, io) => {
    const sqlQuery = "insert into tb_board(title, contents, writer_name, answer_yn, writedate) values( ?, ?, ?, ?, now())";
    db.query(sqlQuery, 
            [title, content , writer, 'N'],
            (err) => {
                if(!err)
                    io.emit('SuccessInsertBoard', { msg: "suc!"});
            }
    );
}

// 답변 insert 함수
const insertComment = (boardIdx, content, io) => {
    const sqlQuery = "insert into tb_comment(board_idx, contents, writedate) values( ?, ?, now())";
    db.query(sqlQuery, 
            [boardIdx, content],
            function(err) {
                if(!err){
                    db.query("update tb_board set answer_yn = 'Y' where idx = ?", 
                    [boardIdx],
                    function(err) {
                        if(!err)
                            io.emit('SuccessInsertComment', { msg: "suc! Com"});
                        else throw err;
                    });
                    
                } else
                    throw err;
            }
    );
}

// 댓글 insert 함수
const insertReply = (boardIdx, replyWriter, content, io) => {
    const sqlQuery = "insert into tb_reply(board_idx, commenter, contents, writedate)"
                     + " values( ?, ?, ?, now())";
    db.query(sqlQuery, 
            [boardIdx, replyWriter, content],
            function(err) {
                if(!err)
                    io.emit('SuccessInsertReply', { msg: "suc rpl!"});
                else
                    throw err;
            }
    );
}