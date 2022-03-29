const express = require('express');
const app = express();
const PORT = process.env.PORT || 2999;
const mariadb = require('mariadb');

// db 연동
const db = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'testdb'
});

//
app.get('/', (req, res) => {
    res.send('Server Response Success');
});

app.get('/hello', (req, res) => {
    res.send({ hello: 'Hello react'});
});

app.get("/insert", (req, res) => {
    const sqlQuery = "insert into tb_board(title, contents, writer_name, answer_yn, writedate) values ('7번째 게시글', 'insert 테스트3', '은애', 'N', now())";
    db.query(sqlQuery, (err, result) => {
            res.send('insert success');
    })
});

app.get("/select", (req, res) => {
    db.getConnection((err, connection) => {
        if (err)
            res.send(err);
        else {
            console.log('connection : 성공');
            connection.query("select * from tb_board where idx=3", function(err, results) {
                if (err)
                    res.send('connection 속 에러 : ', err);
                else{
                    console.log('connection : result');
                    res.send({data : results});
                }
            });
            connection.release();
        }
    })
});

app.get('/db-connect-check', (req, res) => {
    const sqlQuery = "select * from tb_board";
    db.query(sqlQuery, (err, data) => {
        if(err) {
            res.send(err);
        }
        else{
            res.send(data);
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
});

