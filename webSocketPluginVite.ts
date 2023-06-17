import injectSocketIo from "./socketIoHandler"

export const webSocketServer = {
    name: 'webSocketServer',
    configureServer(server: any) {
        injectSocketIo(server.httpServer);
    }
};