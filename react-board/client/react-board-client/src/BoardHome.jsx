import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "./modal/Modal"
import {  clientsocket }  from './Client';

const userBtnStyle = {
    padding: '10px',
    width: '200px',
    height: '100px',
    border: 'none',
    borderRadius: '30px',
    background: '#003366',
    color: 'white',
    fontSize: '15px',
    
}
const adminStyle = {
    display: 'inline-block',
    float: 'right',
    background: 'pink'
}
const adminBtnStyle = {
    display: 'inline-block',
    margin: 'auto',
    width: '200px',
    height: '30px',
    border: 'none',
    background: 'none',
    borderRadius: '20px'
}

const clientSocket=null;

class BoardHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdminCheckModalOn: false
        };
        
        this.clientSocket = clientsocket;
    }

    componentDidMount() {
        
    }

    handleAdminCheckModal = () => {
        this.setState({
            isAdminCheckModalOn: !(this.state.isAdminCheckModalOn) 
        });
    }

    render() {
        const { isAdminCheckModalOn } = this.state;

        return (
            <div style={{ margin:'auto', textAlign: 'center' }}>
                <h1> Voice Of Customer </h1>
                
                <div>
                    <Link to='/board/user'>
                        <button style={userBtnStyle} >
                            고객의 소리 입장
                        </button>
                    </Link>
                    <div style={adminStyle}>
                        <button onClick={this.handleAdminCheckModal} style={adminBtnStyle}>관리자 로그인</button>
                        <Modal isOpen={isAdminCheckModalOn}>관리자 로그인</Modal>
                    </div>
                </div>
            </div>
        );
    }
}

export default BoardHome;