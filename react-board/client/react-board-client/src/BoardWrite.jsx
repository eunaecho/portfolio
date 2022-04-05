import React, { Component } from "react";
import { Link } from "react-router-dom";


class BoardWrite extends Component {
    state = {
        header: '사용자 입력 화면',
        title: '_빈 제목',
        writer: '작성자',
        content: '_빈 내용'
    };

    getTitleValue = (e) => {
        this.setState({ title: e.target.value });
    };

    getContentValue = (e) => {
        this.setState({ content: e.target.value });
    };

    onClickSave = (e) => {
        // 서버로 전송 -> 서버에서 받아서 db에 저장
        const post = {
            postTitle : this.state.title,
            postContent : this.state.content
        };

        fetch("http://localhost:2999/board/write/insert", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post),
        })
        .then((res) => res.json())
        .then((res) => { console.log('server response : ' , res); });

        // state 초기화
        this.setState({
            title: '',
            content: ''
        })

    };

    render() {
        const { header} = this.state;
        return (
            <>
                <div>
                    <h1>{header}</h1>
                    <table id='client-input'>
                        <thead>
                            <tr>
                                <th> 제목 </th>
                                <td>
                                    <input id='board-title' type='text' onChange={this.getTitleValue}/>
                                </td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <th> 내용 </th>
                                <td>
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