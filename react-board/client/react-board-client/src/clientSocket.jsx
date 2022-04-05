import { io } from 'socket.io-client';

const ENDPOINT = 'http://localhost:2999';

export const clientsocket = io.connect(ENDPOINT, { cors:{origin:'localhost:2999'}});
