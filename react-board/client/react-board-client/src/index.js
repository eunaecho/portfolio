import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from './Board';
import BoardAdmin from './BoardAdmin';
import BoardWrite from './BoardWrite';
import BoardRead from './BoardRead';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/board/user" element={ <Board/> }/>
            <Route path="/board/admin" element={ <BoardAdmin/> }/>
            <Route path="/board/read/:index" element={ <BoardRead/> }/>
            <Route path="/board/write" element={ <BoardWrite/> }/>
        </Routes>
    </BrowserRouter>
    , document.getElementById('root')
);

// react-router-dom v6 -> useParams로 param 받기 :hooks..

