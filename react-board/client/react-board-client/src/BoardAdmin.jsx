import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Client, clientsocket }  from './Client';

const clientSocket = clientsocket;
const USER_TYPE = 'amdin';

class BoardAdmin extends Component {
    state = {
        header: "관리자 게시판 리스트",
        index: "0",
        title: "_제목",
        userName: "_이름",
        writeDate: "_날짜",
        answer: "N",
        boardList: []
    };

    onReceiveResponse() {
        // 게시글 추가 알림
        clientsocket.on('SuccessInsertBoard', (msg) => {
            console.log('SuccessInsertBoard', msg.msg);
            
        });

        // 새로운 댓글 알림 
        clientsocket.on('SuccessInsertReply', () => {
            console.log('SuccessInsertReply');
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
        for(var i=0; i< res.length; i++) {
            this.setState((prevState) => {
                return {
                    boardList: [...prevState.boardList, res[i]] }});
    }};
                
    componentDidMount() {
        this.onReceiveResponse();
        this.getBoardList();
    };

    render() {
        const { header, boardList} = this.state ;
        return (
            <>
                <h2>{header}</h2>
                <table id="boardTable">
                    <thead>
                        <tr>
                            <th>번호</th>       
                            <th style={{ width:'300px' }} onClick={this.onClickBoardTitle}>제목</th>
                            <th style={{ width:'80px' }}>작성자</th>   
                            <th style={{ width:'100px' }}>작성 날짜</th>
                            <th>답변</th>
                        </tr>
                    </thead>

                    <tbody>
                        { boardList.map((v, i) => {
                             return (
                                <tr key={v.idx}>
                                    <td> {v.idx}</td>
                                    <td id={v.title}>
                                        <Link to={`/board/admin/read/${v.idx}`}>{v.title} { v.cnt!==0 ? `[${v.cnt}]` : '' }</Link>
                                    </td>
                                    <td> {v.writer_name} </td>
                                    <td> {v.writedate} </td>
                                    <td> {v.answer_yn} </td>
                                </tr>
                            );
                        } )}
                    </tbody>
                </table>
            </>
        )
    }
}

export default BoardAdmin;