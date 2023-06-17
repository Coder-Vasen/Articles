import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
// import { webSocketServer } from './webSocketPluginVite';
// import preprocess from 'svelte/types/compiler/preprocess';
import { Server } from 'socket.io'

const webSocketServer = {
  name: 'webSocketServer',
  configureServer(server) {
    const io = new Server(server.httpServer)

    io.on('connection', (socket) => {
      socket.emit('eventFromServer', 'Hello, World 👋')
    })
  },
}
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		vite: {
			plugins: [webSocketServer],
		  },
	}
};

export default config;
