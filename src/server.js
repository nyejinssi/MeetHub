import path from 'path';
import express from "express";
import http from "http";
import { WebSocketServer } from 'ws';

const app = express();

const __dirname = path.resolve();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src", "public", "views"));
app.use(express.static(path.join(__dirname, "src", "public")));  // 수정된 부분

app.get("/", (req, res) => res.render("home.pug"));
// 루트 경로("/")를 제외한 모든 경로에 대한 GET 요청 핸들러
app.get("/*", (req, res) => {
    // 클라이언트에게 루트 경로("/")로 리디렉션(재지정)하는 응답을 보냄
    res.redirect("/");
});


const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocketServer({server}); 

server.listen(3000, handleListen);
