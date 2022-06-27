import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "./modal/Modal"

const frameStyle = {
    display: 'block',
    margin: 'auto',
}
const userBtnStyle = {
    margin: 'auto',
    padding: '10px',
    width: '200px',
    height: '100px',
    border: 'none',
    borderRadius: '30px',
    background: '#003366',
    color: 'white',
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
                <div style={{"width":"fit-content"}}>
                    <Link to='/board/user'>
                    <button style={userBtnStyle} >
                        고객의 소리
                    </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default BoardHome;