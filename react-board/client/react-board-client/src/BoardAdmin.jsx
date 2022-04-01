import React, { Component } from 'react';

const USER_TYPE = 'amdin';

class BoardAdmin extends Component {
    state = {
        header: "관리자 게시판 리스트",
        index: "0",
        title: "_제목",
        userName: "_이름",
        writeDate: "_날짜",
        answer: "N"
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
                
            </>
        )
    }
}

export default BoardAdmin;