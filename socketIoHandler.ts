import {Server} from "socket.io"

export default function injectSocketIo(server: any){
    const io = new Server(server);

    io.on('connection', socket => {
        let username = `User ${Math.round(Math.random()*999999)}`
        socket.emit('name', username)

        socket.on('message', message => {
            io.emit('message', {
                from: username,
                message: message,
                time: new Date().toLocaleTimeString()
            })
        })
    })

    console.log("SocketIo Injected")
}