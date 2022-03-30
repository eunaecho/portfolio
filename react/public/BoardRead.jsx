import React, { Component } from "react";

class BoardRead extends Component {
    state = {
        header: '관리자 게시글 확인 화면',
        title: '읽어올 제목',
        content: '읽어올 내용'
    };

    render() {
        return (
            <>
            <div class="tb-read-board">
                <table>
                    <tr>
                        <th> 제목 </th>
                        <td id='read-title'>
                            <label id='label-read-title'>{this.state.title}</label>
                        </td>
                    </tr>

                    <tr>
                        <th> 내용 </th>
                        <td id='read-content'>
                            <text id='text-read-content'>{this.state.content}</text>
                        </td>
                    </tr>
                </table>
            </div>
            </>
        );
    };

}

export default BoardRead;