import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    state = {
        header: '서버 페이지',
    };

    render() {
        return (
            <>
            <h1>{this.state.header}</h1>
            </>
        )
    }
}

export default ServerApp;