import express from 'express'; // importing express server
import logger from 'morgan';
import { Server } from 'socket.io'; // importing a web socket server
import { createServer } from 'http'; // importing createServer from 'http'

const port = process.env.PORT ?? 3000;
const app = express();

app.use(logger('dev'));

const server = createServer(app);
const io = new Server(server); // passing the server

io.on('connection', (socket) => { // with this callback we verify when a user is connected
    console.log('a user has connected');

    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });

    socket.on('chat message', (msg) => { // corrected 'chat message'
        console.log('message: ' + msg);
        io.emit('chat message', msg); // Broadcast message to all clients
    });
});

app.get('/chat', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`); // here we listen to the server
});
