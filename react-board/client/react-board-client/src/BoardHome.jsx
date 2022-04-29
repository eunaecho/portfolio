import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "./modal/Modal"

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
        isAdminCheckModalOn: false
    };

    handleAdminCheckModal = () => {
        this.setState({
            isAdminCheckModalOn: true
        });
    }

    render() {
        const { isAdminCheckModalOn } = this.state;

        return (
            <>
                <div>
                    <Link to='/board/user'>
                        <button style={btnStyle} > 홈페이지 </button>
                    </Link>
                        <button onClick={this.handleAdminCheckModal} style={btnStyle} > 관리자 </button>
                </div>
                <Modal isOpen={isAdminCheckModalOn}>{"관리자 로그인"}</Modal>
            </>
        );
    }
}

export default BoardHome;