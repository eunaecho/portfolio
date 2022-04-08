import { io } from 'socket.io-client';

const ENDPOINT = 'http://localhost:2999';
export const clientsocket = io.connect(ENDPOINT, { cors: { origin:'localhost:2999' }});

export const Client = (clientsocket) => {    

    // 게시글 추가 성공시
    clientsocket.on('SuccessInsertBoard', (msg) => {
        console.log('SuccessInsertBoard', msg.msg);
    });
    
    // 답변 달린 경우
    clientsocket.on('SuccessInsertComment', () => {
        console.log('SuccessInsertComment');
    });

    // 새로운 댓글 알림 
    clientsocket.on('SuccessInsertReply', () => {
        console.log('SuccessInsertReply');
    });
}
