import React, { Component } from "react";

class BoardWrite extends Component {
    static = {
        title:'게시글 작성 : 사용자'
    };

    render() {
        return (
            <>
                <h1>{this.state.title}</h1>
            </>
        );
    }
}