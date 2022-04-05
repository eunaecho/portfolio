import React, { Component } from 'react';
import { clientsocket } from './clientSocket';
import TableRow from './TableRow';

const USER_TYPE = 'amdin';
const ENDPOINT = 'http://localhost:2999';
const clientSocket = clientsocket;

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

    onClickDBConnection = () => {
        fetch("http://localhost:2999/board/select")
        .then((res) => res.json())
        .then((res) => { this.getBoardList(res); });
    }
    
    getBoardList = (res) => {
        this.boardList = [];
        for(var i=0; i< res.length; i++) {
            this.setState((prevState) => {
                return {
                    boardList: [...prevState.boardList, res[i]] }});
    }};
                
    componentDidMount() {
        console.log('admin - socket : ', clientSocket.id);
        this.onClickDBConnection();
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
                        { boardList.map((v, i) => <TableRow key={i} data={v}/> )}
                    </tbody>
                </table>
            </>
        )
    }
}

export default BoardAdmin;