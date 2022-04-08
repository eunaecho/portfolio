import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Client, clientsocket }  from './Client';

const clientSocket = clientsocket;

class BoardWrite extends Component {
    state = {
        header: '사용자 입력 화면',
        title: null,
        writer: null,
        content: null
    };
    componentDidMount() {

    }

    getTitleValue = (e) => {
        this.setState({ title: e.target.value });
    };

    getWriterValue = (e) => {
        this.setState({ writer: e.target.value });
    };

    getContentValue = (e) => {
        this.setState({ content: e.target.value });
    };

    onClickSave = (e) => {
        // 서버로 전송 -> 서버에서 받아서 db에 저장
        const post = {
            postTitle : this.state.title,
            postWriter : this.state.writer,
            postContent : this.state.content
        };

        if (post.postTitle!=null && post.postContent!=null){
            clientSocket.emit('addBoard', post);
    
            // state 초기화
            this.setState({
                title: '',
                writer: '',
                content: ''
            })
        }
    };

    render() {
        const { header} = this.state;
        return (
            <>
                <div>
                    <h1>{header}</h1>
                    <table id='client-input'>
                        <tbody>
                            <tr>
                                <th className="th-client-input"> 제목 </th>
                                <td className="td-client-input">
                                    <input id='board-title' type='text' onChange={this.getTitleValue}/>
                                </td>
                            </tr>
                            <tr>
                                <th className="th-client-input"> 작성자 </th>
                                <td className="td-client-input">
                                    <input id='board-writer' type='text' onChange={this.getWriterValue}/>
                                </td>
                            </tr>
                            <tr>
                                <th className="th-client-input"> 내용 </th>
                                <td className="td-client-input">
                                    <textarea id='board-content' rows="10" onChange={this.getContentValue}></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <Link to="/board/user">
                        <button >취소</button>
                        <button onClick={this.onClickSave}>저장</button>
                    </Link>
                </div>
            </>
        );
    };
}

export default BoardWrite;