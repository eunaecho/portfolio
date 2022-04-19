import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "./withRouter";
import { Client, clientsocket }  from './Client';

const clientSocket = clientsocket;

class BoardRead extends Component {
    state = {
        header: '게시글 확인 화면',
        boardIdx: null,
        title: '',
        writer: '',
        content: '',
        answer: '미답변',
        answerTime: '-',
        isAnswer: false,
        rWriter : null,
        rContent : null,
        replyList : []
    };

    // 답변 추가시 알림받고 리렌더링

    refInputName = createRef();
    refInputReply = createRef(); 

    componentDidMount() {
        this.getBoardData();
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
                            content: res[0].contents 
            }); 
            if(res[0].answer_yn ==='Y'){
                this.getAnswer(this.numBoard);
            }});
    };
                    
    getAnswer = (num) => {
        fetch(`http://localhost:2999/board/read/select/${num}/answer`)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ answer: res[0].contents,
                                answerTime: res[0].writedate }); 
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

    getNameValue = (e) => {
        this.setState( { rWriter : e.target.value });
    };

    getReplyValue = (e) => {
        this.setState({ rContent: e.target.value });
    };

    onClickReplyButton = () => {
        // 서버로 전송 -> 서버에서 받아서 db에 저장
        const post = {
            postBoardNum : this.numBoard,
            postRWriter : this.state.rWriter,
            postRContent : this.state.rContent
        };

        if (post.postRWriter!=null && post.postRContent!=null){
            clientSocket.emit('addReply', post);
    
            // state 초기화
            this.setState({
                rWriter: '',
                rContent: ''
            });
        }

        this.refInputName.current.value = '';
        this.refInputReply.current.value = '';
    };


    render() {
        const { header, replyList, content, answer, answerTime} = this.state;
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
                            <td className="td-read-class" id='read-content' width='200px'>{content}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <table id='tb-show-comment'>
                    <tbody>
                        <tr>
                            <th style={{width:'80px'}} rowSpan='2'> 관리자 <br/> 답변 </th>
                            <td style={{width:'400px'}} rowSpan='2'> {answer} </td>
                          <th style={{width:'100px'}} >작성시간</th>
                      </tr>
                      <tr>
                        <td>{answerTime}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <table id="tb-show-reply">
                <thead>
                    <tr>
                        <th className="th-reply-class" id='read-reply-writer'> 작성자 </th>
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

            <div id='div-reply' style={{marginTop:'10px', marginLeft:'5px'}}>
                <label> 이름
                    <input id='div-input-reply-name' type='text' style={{width: '80px', height:'25px'}}
                            onChange={this.getNameValue} ref={this.refInputName}/>
                </label>
                <label> 댓글
                    <input id='div-input-reply-text' type='text' style={{width: '200px', height:'25px'}}
                            onChange={this.getReplyValue} ref={this.refInputReply}/>
                </label>
                <button id='btn-reply' onClick={this.onClickReplyButton}> 입력</button>
            </div>

            <div>
                <Link to="/board/user">
                    <button id=" btn-board" style={{marginTop:'10px', marginLeft:'5px'}}>목록으로</button>
                </Link>
            </div>

            </>
        );
    };
};

export default withRouter(BoardRead);

//파스칼 케이스로 해야함 -> <text> 부분 고치기