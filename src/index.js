import app from "./app";
import { Server as webSocketServer } from "socket.io";
import http from "http";
import sockets from "./sockets";
import { PORT } from "./config";

import { connectDB } from "./db";

connectDB();

const server = http.createServer(app);
const httpServer = server.listen(PORT);
console.log("server is runing on port", PORT);

const io = new webSocketServer(httpServer);
sockets(io);
