import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableRow from './TableRow';
import io from 'socket.io-client';

const USER_TYPE = 'user';
const ENDPOINT = 'http://localhost:2999';

// const getUserType = () => {
//     var pathname = window.location.pathname;

//     if( pathname.includes('/board/admin')) 
//         USER_TYPE = 'admin';

//     console.log(USER_TYPE);
// }

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

    //socket 연결
    socket = io.connect(ENDPOINT, { cors: { origin:'localhost:2999', 
                                            Credential:true }});
    
    componentDidMount() {
        this.socket.on("connect", () => {
                console.log("connection server :: ", this.socket);       
                console.log("this props", this.props);
        });
       
        this.onClickDBConnection();
    };

    componentDidUpdate() {

    };
    
    componentWillUnmount() {
         
    }

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
                            <th style={{ width:'80px' }}>작성 날짜</th>
                            <th>답변</th>
                        </tr>
                    </thead>

                    <tbody>
                        { boardList.map((v, i) => <TableRow key={i} data={v}/> )}
                    </tbody>
                </table>
                <div>
                    <Link to="/board/write" state={ {socket:this.socket}}>
                        <button style={{ margin:'5px' }}>글쓰기</button>
                    </Link>
                </div>
            </>
        )
    }
}

export default Board;