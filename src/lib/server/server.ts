import http from 'http';
import express from 'express'
import injectSocketIo from '../../../socketIoHandler';
import { handler } from '../../../build/handler';

const app = express();
const server = http.createServer(app);

injectSocketIo(server);
app.arguments(handler);

server.listen(3000, () => {
	console.log('Running on http://localhost:3000');
});
