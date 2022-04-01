import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "./withRouter";


class BoardRead extends Component {
    state = {
        header: '게시글 확인 화면',
        title: '읽어올 제목',
        content: '읽어올 내용'
    };
   
    componentDidMount() {
        console.log();        
        this.getBoardData();
    }

    getBoardData = () => {
        const numBoard = this.props.router.params.index;
        fetch(`http://localhost:2999/board/read/select/${numBoard}`)
        .then((res) => res.json())
        .then((res) => { 
            this.setState({ title: res[0].title,
                            content: res[0].contents }); 
        });
    };

    render() {
        const { header, title, content } = this.state;
        return (
            <>
            <h1>{header}</h1>
            <div >
                <table id="tb-read-board">
                    <thead>
                        <tr>
                            <th> 제목 </th>
                            <td id='read-title'>
                                <label id='label-read-title'>{this.state.title}</label>
                            </td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th> 내용 </th>
                            <td id='read-content'>
                                <text id='text-read-content'> {this.state.content} </text>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id='div-input-reply'>
                <input type='text' />
                <button id='btn-reply'> 입력</button>
            </div>

            <div>
                <table id="tb-show-reply">
                <tbody>
                    <tr>
                        <th> 댓글 작성자 </th>
                        <td id='read-content'>
                        <text id='text-read-reply'> 댓글 내용 </text>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>

            <div>
                <Link to="/board/user">
                    <button id=" btn-board">목록으로</button>
                </Link>
            </div>

            </>
        );
    };
};

export default withRouter(BoardRead);

//파스칼 케이스로 해야함 -> <text> 부분 고치기