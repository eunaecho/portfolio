import React, { Component } from 'react';

class BoardAdmin extends Component {
    state = {
    };

    render() {
        return (
            <>
                <h1>관리자</h1>
                <table id="boardList">
                    <thead>
                        <tr>
                            <th>번호</th>       
                            <th style={{ width:'300px' }} onClick={this.onClickBoardTitle}>글쓴이</th>
                            <th style={{ width:'80px' }}>제목</th>   
                            <th>답변</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td> 0 </td>
                            <td> 글 제목 </td>
                            <td> 작성자 </td>
                            <td> N </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button style={{ margin:'5px' }}>글쓰기</button>
                </div>
            </>
        )
    }
}

export default BoardAdmin;