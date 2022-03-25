import React, { Component } from 'react';

const Try_hooks = ({ tryInfo }) => {
    return (
        <li>
            <b>{tryInfo.try}</b> - { tryInfo.result}
        </li>
    )
};

export default Try_hooks;