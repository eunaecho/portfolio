import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Board extends Component {
    state = {
        header: "사용자 게시판 리스트",
        index: "0",
        title: "_제목",
        userName: "_이름",
        writeDate: "_날짜",
        answer: "N",
    };
    
    //가져온 데이터 나타내기
    boardList = new Array();

    boardObject = {
        index: "-",
        title: "-",
        userName: "-",
        writeDate: "-",
        answer: "-",
    } 

    onClickDBConnection = () => {
        fetch("http://localhost:2999/board/user/select")
        .then((res) => res.json())
        .then((res) => { 
            console.log('server response for select : ' , res); 
            
            for(var i=0; i<res.lenth; i++) {
                this.boardList.push('3');
                console.log(1);
            }

            console.log(this.boardList);
            // this.getBoardList(res);
        });
    }

    getBoardList = (res) => {
        for(var i=0; i<res.lenth; i++) {
            this.boardList.push(res[i]);
        }

        console.log(this.boardList);
    }

    // 이동
    onClickBoardTitle = () => {
        
    };

    render() {
        const { header, index, title, userName, writeDate, answer } = this.state ;
        return (
            <>
                <h1>{header}</h1>
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
                        <tr>
                            <td> {index} </td>
                            <td> {title} </td>
                            <td> {userName} </td>
                            <td> {writeDate} </td>
                            <td> {answer} </td>
                        </tr>
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