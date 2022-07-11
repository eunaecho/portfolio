import React, { Component } from "react";

const labelStyle = {
    display: 'inline-block',
    width: '60px',
    height: '20px',
    fontWeight: 'bold',
    fontSize: '13px',
}
const inputStyle = {
    margin: '3px',
    height: '20px',
    border: 'none',
    borderRadius: '10px',
    padding: '2px'
}
const btnStyle = {
    width: '50px',
    height: '30px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '13px',
    marginTop: '10px',
    background: '#003366',
    border: '1px solid #003366',
    borderRadius: '15px',
}
const ModalContainer = {
    position: "fixed",
    left: "50%",
    top: "30%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    height: "170px",
    padding: "16px",
    background: '#6699cc',
    borderRadius: "100px",
    color: 'white',
    textAlign: "center",
    boxShadow:'1px 3px 5px rgba(0, 0, 0, .25)',
}

class Modal extends Component {
    constructor(props) {
        super(props);

        this.checkInfo = this.checkInfo.bind(this);
    }

    checkInfo = () => {
        var tmpId = document.getElementById('input-id').value;
        var tmpPw = document.getElementById('input-pw').value;

        if(tmpId!==""&&tmpPw!=="") {
            fetch(`http://localhost:2999/board/admin/select/${tmpId}/${tmpPw}`)
            .then((res) => res.json())
            .then((res) => { 
                if(res==="") console.log('잘못 입력');
                else console.log(res[0].name);
            });
        }
    }
   
    showModal(text) {
        return (
            <div style={ModalContainer}>
                <h3>{text}</h3>
                <div>
                    <label style={labelStyle}>아이디</label>
                    <input id='input-id' style={inputStyle}/>
                </div>
                <div>
                <label style={labelStyle}>비밀번호</label>
                    <input id='input-pw' style={inputStyle} type='password'/>
                </div>
                <div>
                    <button id='btn-check-admin' style={btnStyle} onClick={this.checkInfo}>확인</button>
                </div>            
            </div>
        )
    }
    
    render() {
        const { isOpen } = this.props;
        
        return (
            < div className="ModalView" >
                {isOpen ? this.showModal(this.props.children) : null}
            </div>
        )
    }
}

export default Modal;