import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableRow from './TableRow';
import { Client, clientsocket }  from './Client';

const clientSocket = clientsocket;
// Client(clientsocket);

class Board extends Component {
    state = {
        header: "사용자 게시판 리스트",
        index: "0",
        title: "_제목",
        userName: "_이름",
        writeDate: "_날짜",
        answer: "N",
        boardList: []
    };

    componentDidMount() {
        this.getBoardList();
        this.onReceiveResponse();
    };

    onReceiveResponse() {
        // 게시글 추가 성공시
        clientSocket.on('SuccessInsertBoard', (msg) => {
            this.getBoardList();
        });

        // 답변 달린 경우
        clientSocket.on('SuccessInsertComment', () => {
        });

        // 새로운 댓글 알림 
        clientSocket.on('SuccessInsertReply', () => {
            this.getBoardList();
        });
    }

    getBoardList = () => {
        fetch("http://localhost:2999/board/select")
        .then((res) => res.json())
        .then((res) => { this.setBoardList(res); });
    }
    
    setBoardList = (res) => {
        this.state.boardList = [];
        for(let i=0; i< res.length; i++) {
            this.setState((prevState) => {
                return {
                    boardList: [...prevState.boardList, res[i]] }});
    }};

    render() {
        const { header, boardList} = this.state ;
        return (
            <>
                <h2>{header}</h2>
                <table id="boardTable">
                    <thead>
                        <tr>
                            <th>번호</th>       
                            <th style={{ width:'300px' }}>제목</th>
                            <th style={{ width:'80px' }}>작성자</th>   
                            <th style={{ width:'100px' }}>작성 날짜</th>
                            <th>답변</th>
                        </tr>
                    </thead>

                    <tbody>
                        { boardList.map((v, i) => <TableRow key={i} data={v}/> )}
                    </tbody>
                </table>
                <div>
                    <Link to="/board/write" >
                        <button style={{ margin:'5px' }}>글쓰기</button>
                    </Link>
                </div>
            </>
        )
    }
}

export default Board;