import React, { Component } from "react";

class BoardWrite extends Component {
    state = {
        header: '사용자 입력 화면',
        title: '',
        content: ''
    };

    onClickSave = () => {
        const { title, content } = this.state;
        var ctitle = document.getElementById('board-title').value;
        var ccontent = document.getElementById('board-content').value;
        console.log(ctitle, ccontent);
    };

    render() {
        return (
            <>
                <div>
                    <h1>{this.state.header}</h1>
                    <table id='client-input'>
                        <tr>
                            <th> 제목 </th>
                            <td>
                                <input id='board-title' type='text'/>
                            </td>
                        </tr>
                        <tr>
                            <th> 내용 </th>
                            <td>
                                <textarea id='board-content' rows="10"></textarea>
                            </td>
                        </tr>
                    </table>
                </div>
                <div>
                    <button >취소</button>
                    <button onClick={this.onClickSave}>저장</button>
                </div>
            </>
        );
    };
}

export default BoardWrite;