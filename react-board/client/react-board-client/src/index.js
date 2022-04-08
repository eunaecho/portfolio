import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BoardUser from './BoardUser';
import BoardAdmin from './BoardAdmin';
import BoardWrite from './BoardWrite';
import BoardRead from './BoardRead';
import BoardAdminRead from './BoardAdminRead';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/board/user" element={ <BoardUser/> } />
            <Route path="/board/read/:index" element={ <BoardRead/> } />
            <Route path="/board/admin" element={ <BoardAdmin/> } />
            <Route path="/board/admin/read/:index" element={ <BoardAdminRead/> } />
            <Route path="/board/write" element={ <BoardWrite/> } />
        </Routes>
    </BrowserRouter>
    , document.getElementById('root')
);
