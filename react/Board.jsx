import React, { Component } from 'react';

class Board extends Component {
    state = {
    };

    onClickBoardTitle = () => {
        console.log('제목 클릭');
    };

    render() {
        return (
            <>
                <table id="boardTable">
                    <thead>
                        <tr>
                            <th>번호</th>       
                            <th style={{ width:'300px' }} onClick={this.onClickBoardTitle}>글쓴이</th>
                            <th style={{ width:'80px' }}>제목</th>   
                            <th style={{ width:'80px' }}>작성 날짜</th>
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

export default Board;