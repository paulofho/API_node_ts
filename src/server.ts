import { server } from './app.ts';

server.listen({ port: 1313 }).then(() => {
  console.log("HTTP server running on port 1313!");
});

