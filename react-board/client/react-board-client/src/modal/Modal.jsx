import React, { Component } from "react";

const modalStyle = {
    display: "none"
}

class Modal extends Component {
    state = {
    }

    showModal({text}) {
        return (
            <>
                <h1>{text}</h1>
                <div>
                    <input id='input-id'/>
                </div>
                <div>
                    <input id='input-pw'/>
                </div>
                <div>
                    <button id='btn-check-admin'>확인</button>
                </div>            
            </>
        )
    }
    
    render() {
        const { isOpen, children } = this.props;

        return (
            <div className="Modal" style={modalStyle}>
                {isOpen ? this.showModal(children) : null}
            </div>
        )
    }
}

export default Modal;