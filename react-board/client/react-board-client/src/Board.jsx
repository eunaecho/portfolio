import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableRow from './TableRow';

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
    
    //가져온 데이터 나타내기
    // boardList = [];

    componentDidMount() {
        this.onClickDBConnection();
    };
    
    onClickDBConnection = () => {
        fetch("http://localhost:2999/board/user/select")
        .then((res) => res.json())
        .then((res) => { this.getBoardList(res); });
    }
    
    getBoardList = (res) => {
        this.boardList = [];
        for(var i=0; i< res.length; i++) {
            this.setState((prevState) => {
                return {
                    boardList: [...prevState.boardList, res[i]]
                }
            });
        }

        console.log(this.boardList);
    };

   
    // 이동
    onClickBoardTitle = () => {
        
    };

    render() {
        return (
            <>
                <h1>{this.state.header}</h1>
                <table id="boardTable">
                    <thead>
                        <tr>
                            <th>번호</th>       
                            <th style={{ width:'300px' }} onClick={this.onClickBoardTitle}>제목</th>
                            <th style={{ width:'80px' }}>작성자</th>   
                            <th style={{ width:'80px' }}>작성 날짜</th>
                            <th>답변</th>
                        </tr>
                    </thead>

                    <tbody>
                        { this.state.boardList.map((v, i) => <TableRow key={i} data={v}/> )}
                    </tbody>
                </table>
                <div>
                    <button style={{ margin:'5px' }} onClick={this.onClickDBConnection}>db연결</button>
                    <Link to="/board/write">
                        <button style={{ margin:'5px' }}>글쓰기</button>
                    </Link>
                </div>
            </>
        )
    }
}

export default Board;