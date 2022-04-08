import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "./withRouter";
import { Client, clientsocket }  from './Client';

const clientSocket = clientsocket;

class BoardRead extends Component {
    state = {
        header: '관리자 게시글 확인 화면',
        boardIdx: null,
        title: null,
        writer: null,
        content: null,
        comment: null,
        rWriter : '관리자',
        rContent : null,
        replyList : []
    };

    refInputComment = createRef();
    refInputReply = createRef(); 

    componentDidMount() {
        this.getBoardData();
        // this.getComment();
        this.getReplyList();

        clientSocket.on('SuccessInsertReply', () => {
            this.getReplyList();
        });

    };

    numBoard = this.props.router.params.index;
    getBoardData = () => {
        fetch(`http://localhost:2999/board/read/select/${this.numBoard}`)
        .then((res) => res.json())
        .then((res) => { 
            this.setState({ title: res[0].title,
                            writer: res[0].writer_name,
                            content: res[0].contents }); 
        });
    };

    getComment = () => {
        fetch(`http://localhost:2999/board/read/select/${this.numBoard}/comment`)
        .then((res) => res.json())
        .then((res) => { 
            this.setState({ title: res[0].title,
                            writer: res[0].writer_name,
                            content: res[0].contents }); 
        });
    }

    getReplyList = () => {
        this.state.replyList = [];
        // 게시글 번호 넘겨서 해당 게시글에 대한 댓글
        fetch(`http://localhost:2999/board/read/select/${this.numBoard}/reply`)
        .then((res) => res.json())
        .then((res) => { this.setReplyList(res) }); 
    };

    setReplyList = (res) => {
        for( var i=0; i<res.length; i++) {
            this.setState( (prevState) => {
                return  { 
                    replyList: [...prevState.replyList, res[i]]
                };
            });
        }
    }

    getReplyValue = (e) => {
        this.setState({ rContent: e.target.value });
    };

    getCommentValue = (e) => {
        this.setState({ comment: e.target.value });
    };

    onClickCommentButton = () => {
        const post = { 
            postBoardIdx : this.numBoard,
            postComment : this.state.comment };

        if( post.postComment!=null) {
            clientSocket.emit('addComment', post);

            this.setState({ comment: null });
        }

        this.refInputComment.current.value = '';

        clientSocket.on('SuccessInsertComment', () => {
            console.log(' 답변 성공! ');
        });
    };

    onClickReplyButton = () => {
        const post = {
            postBoardNum : this.numBoard,
            postRWriter : this.state.rWriter,
            postRContent : this.state.rContent
        };

        if (post.postRWriter!=null && post.postRContent!=null){
            clientSocket.emit('addReply', post);
    
            this.setState({ rContent: null });
        }

        this.refInputReply.current.value = '';
    };

    render() {
        const { header, replyList} = this.state;
        return (
            <>
            <h1>{header}</h1>
            <div >
                <table id="tb-read-board">
                    <tbody>
                        <tr>
                            <th className="th-read-class"> 제목 </th>
                            <td className="td-read-class" id='read-title' width='200px'>{this.state.title}</td>
                        </tr>
                        <tr>
                            <th className="th-read-class"> 작성자 </th>
                            <td className="td-read-class" id='read-title' width='200px'>{this.state.writer}</td>
                        </tr>
                        <tr>
                            <th className="th-read-class"> 내용 </th>
                            <td className="td-read-class" id='read-content' width='200px'>{this.state.content}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* 답변 여부가 'N' 인 경우에만 나오도록 */}
            <div id='div-comment' style={{ marginTop:'10px', marginBottom:'50px' }}>
                <div style={{margin:'5px'}}> 답변 </div>
                <textarea id='div-input-comment-text' type='text' rows={10} style={{ verticalAlign:'middle' , marginLeft:'10px', width: '500px'}}
                            onChange={this.getCommentValue} ref={this.refInputComment}/>
                
                <button id='btn-comment' onClick={this.onClickCommentButton} style={{ marginLeft:'10px',  height: '150px'}}> 입력</button>
            </div>

            <div>
                <table id="tb-show-reply">
                <thead>
                    <tr>
                        <th className="th-reply-class" id='read-reply-writer'> 댓글 작성자 </th>
                        <th id='read-reply-content' width='400px'> 댓글내용 </th>
                        <th id='read-reply-time' width='100px'> 작성시간 </th>
                    </tr>
                </thead>
                <tbody>
                    { replyList.map((v, i) => { return ( <tr key={v.idx + v.board_idx}>
                                                            <td>{v.commenter}</td>
                                                            <td>{v.contents}</td>
                                                            <td>{v.writedate}</td>
                                                         </tr> )
                    })}
                </tbody>
                </table>
            </div>

            <div id='div-reply' style={{ marginTop:'10px', marginBottom:'10px' }}>
                <label  style={{ margin:'5px'}}> 관리자 댓글
                    <input id='div-input-reply-text' type='text' style={{ marginLeft:'10px', width: '250px', height:'25px'}}
                            onChange={this.getReplyValue} ref={this.refInputReply}/>
                </label>
                <button id='btn-reply' onClick={this.onClickReplyButton} style={{ marginLeft:'10px',  height: '30px'}}> 입력</button>
            </div>

            <div>
                <Link to="/board/admin">
                    <button id=" btn-board" style={{margin:"5px"}}>목록으로</button>
                </Link>
            </div>

            </>
        );
    };
};

export default withRouter(BoardRead);
