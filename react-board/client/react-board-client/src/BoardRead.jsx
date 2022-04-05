import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "./withRouter";

class BoardRead extends Component {
    state = {
        header: '게시글 확인 화면',
        title: '읽어올 제목',
        writer: '글 작성자',
        content: '읽어올 내용'
    };
    
    //BoardUser에서 받아온 소켓
    socket;

    componentDidMount() {
        console.log(this.props);
        this.getBoardData();
    };

    getBoardData = () => {
        const numBoard = this.props.router.params.index;
        fetch(`http://localhost:2999/board/read/select/${numBoard}`)
        .then((res) => res.json())
        .then((res) => { 
            this.setState({ title: res[0].title,
                            writer: res[0].writer_name,
                            content: res[0].contents }); 
        });
    };

    onClickReplyButton = () => {
        console.log(this);
    };

    render() {
        const { header} = this.state;
        return (
            <>
            <h1>{header}</h1>
            <div >
                <table id="tb-read-board">
                    <tbody>
                        <tr>
                            <th className="th-read-class"> 제목 </th>
                            <td className="td-read-class" id='read-title' style={{width:'100px'}}>
                                <label id='label-read-title' style={{ width:'200px' }} >{this.state.title}</label>
                            </td>
                        </tr>
                        <tr>
                            <th className="th-read-class"> 작성자 </th>
                            <td className="td-read-class" id='read-title'>
                                <label id='label-read-title' style={{ width:'200px' }} >{this.state.writer}</label>
                            </td>
                        </tr>
                        <tr>
                            <th className="th-read-class"> 내용 </th>
                            <td className="td-read-class" id='read-content'>
                                <text id='text-read-content' style={{ width:'200px' }}> {this.state.content} </text>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id='div-reply'>
                <input id='div-input-reply-text' type='text' />
                <button id='btn-reply' onClick={this.onClickReplyButton}> 입력</button>
            </div>

            <div>
                <table id="tb-show-reply">
                <tbody>
                    <tr>
                        <th className="th-reply-class"> 댓글 작성자 </th>
                        <td className="td-reply-class" id='read-content'>
                            <text id='text-read-reply' style={{ margin: '10px'}}> 댓글 내용 </text>
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