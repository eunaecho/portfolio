import React, { Component } from "react";
import { Link } from "react-router-dom";

const btnStyle = {
    margin: '2px',
    width: '200px',
    height: '30px',
    border: 'none'
}

const inputStyle = {
    margin: '2px',
    width: '400px',
    height: '30px',
    autocomplete: 'false',
}

class BoardHome extends Component {
    state = {
        type: ''
    };

    render() {
        return (
            <>
                <div>
                    <input id='input-id' style={inputStyle}/>
                    <input id='input-pw' style={inputStyle}/>
                </div>
                <div>
                    <button style={btnStyle} > 로그인 </button>
                    <Link to='/board/admin'>
                        <button style={btnStyle} > 관리자 </button>
                    </Link>
                </div>
            </>
        );
    }
}

export default BoardHome;