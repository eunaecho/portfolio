import React, { Component } from "react";

class BoardRead extends Component {
    state = {
        header: '관리자 게시글 확인 화면',
        title: '읽어올 제목',
        content: '읽어올 내용'
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
                                <text id='text-read-content'>{this.state.content}</text>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <button id="btn-answer">답변하기</button>
            </div>
            </>
        );
    };

}

export default BoardRead;