import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { clientsocket }  from './Client';
import Pagenation from './Pagenation';

const aClientSocket = clientsocket;

const tableStyle = {
    margin: 'auto', 
    padding: '15px',
    border: 'none',
    borderRadius: '20px',
    boxShadow:'0 2px 5px rgba(0,0,0, .25)',
}

class BoardAdmin extends Component {
    state = {
        header: "관리자 게시판 리스트",
        adminId: clientsocket.id,
        pageIndex: 1,
        boardCnt: 10,
        title: "_제목",
        writerName: "_이름",
        writeDate: "_날짜",
        answer: "N",
        boardList: []
    };

    onReceiveResponse() {
        // 게시글 추가 알림
        aClientSocket.on('SuccessInsertBoard', (msg) => {
            this.getBoardList();
        });

        // 새로운 댓글 알림 
        aClientSocket.on('SuccessInsertReply', () => {
            this.getBoardList();
        });
    }

    getBoardList = () => {
        const { boardCnt, pageIndex } = this.state;
        const startPage = boardCnt * (pageIndex-1);  //사실상 +1 해줘야하는데 db에서 limit으로 가져오려면 +1 할 필요가 없음.

        fetch(`http://localhost:2999/board/select/${boardCnt}/${startPage}`)
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
        const { header,adminId, boardList} = this.state ;
        return (
            <div style={{ textAlign:'center'}}>
                <div> 
                    <h2>{header}</h2>
                    <p>{adminId}</p>
                </div>
                <table id="boardTable" style={tableStyle} >
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
                <div>
                    {Pagenation()}
                </div>
            </div>
        )
    }
}

export default BoardAdmin;