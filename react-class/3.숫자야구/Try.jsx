import React, { Component } from 'react';

class Try extends Component {
    
    render() {
        const {tryInfo} = this.props;
        return (
            <li>
                <b>{tryInfo.try}</b> - { this.props.tryInfo.result}
            </li>
        )
    }
}

export default Try;