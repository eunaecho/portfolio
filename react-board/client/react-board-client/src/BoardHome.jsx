import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "./modal/Modal"

const frameStyle = {
    margin: 'auto',
}
const userBtnStyle = {
    display: 'block',
    margin: 'auto',
    width: '200px',
    height: '100px',
    border: 'none',
    borderRadius: '60px',
    background: '#003366',
    fontSize: '20px',
}
const adminStyle = {
    display: 'inline-block',
    float: 'right'
}
const adminBtnStyle = {
    display: 'block',
    margin: 'auto',
    width: '200px',
    height: '30px',
    border: 'none',
    background: 'none',
    borderRadius: '20px'
}

class BoardHome extends Component {
    state = {
        isAdminCheckModalOn: false
    };

    handleAdminCheckModal = () => {
        this.setState({
            isAdminCheckModalOn: !(this.state.isAdminCheckModalOn) 
        });
    }

    render() {
        const { isAdminCheckModalOn } = this.state;

        return (
            <div style={frameStyle}>
                <div style={adminStyle}>
                    <button onClick={this.handleAdminCheckModal} style={adminBtnStyle}>관리자 로그인</button>
                    <Modal isOpen={isAdminCheckModalOn}>관리자 로그인</Modal>
                </div>
                <div>
                    <button style={userBtnStyle} >
                    <Link to='/board/user'>
                        VoC
                    </Link>
                    </button>
                </div>
            </div>
        );
    }
}

export default BoardHome;