import React, { Component } from "react";

class BoardRead extends Component {
    static = {
        title:'게시글 읽기 : 관리자'
    };

    render() {
        return (
            <>
                <h1>{this.state.title}</h1>
            </>
        );
    }
}