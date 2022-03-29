import React, { Component } from "react";

class BoardWrite extends Component {
    state = {
        header: '사용자 입력 화면',
        title: '_빈 제목',
        content: '_빈 내용'
    };

    getTitleValue = (e) => {
        this.setState({ title: e.target.value });
        console.log(e.target.id, this.state.title);
    };

    getContentValue = (e) => {
        this.setState({ content: e.target.value });
        console.log(e.target.id, this.state.content);
    };

    onClickSave = () => {
        //db로 저장
        //

        this.setState({
            title: '',
            content: ''
        })
    };

    render() {
        const { header, title, content } = this.state;
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
                    <button >취소</button>
                    <button onClick={this.onClickSave}>저장</button>
                </div>
            </>
        );
    };
}

export default BoardWrite;