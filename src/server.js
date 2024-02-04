import path from 'path';
import express from "express";
import http from "http";
import { WebSocketServer } from 'ws';

const app = express(); // Express 애플리케이션 생성
const __dirname = path.resolve(); // 현재 디렉토리 경로 해결

// Pug 템플릿을 위한 뷰 엔진 및 뷰 디렉토리 설정
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src", "public", "views"));

// 'public' 디렉토리에서 정적 파일 제공
app.use(express.static(path.join(__dirname, "src", "public")));

// Pug 템플릿인 "home.pug"으로 루트 경로 ("/") 처리
app.get("/", (req, res) => res.render("home.pug"));

// 루트 경로 ("/")를 제외한 모든 경로에 대한 GET 요청 처리
app.get("/*", (req, res) => {
    // 클라이언트에게 루트 경로 ("/")로 리디렉션하는 응답 전송
    res.redirect("/");
});

// 서버 리스닝을 처리할 함수 정의
const handleListen = () => console.log(`Listening on http://localhost:3000`);

// Express 애플리케이션을 사용하여 HTTP 서버 생성
const server = http.createServer(app);

// HTTP 서버에 연결된 WebSocket 서버 생성
const wss = new WebSocketServer({server});

function onSocketClose(){
    console.log("Disconnected from Server ❌")
}

const sockets = []; // Fake DB

// WebSocket 연결에 대한 이벤트 핸들러
wss.on("connection", (socket)=>{
    sockets.push(socket);
    // 연결이 성립되었다는 로그 표시    
    console.log("Connected to Browser ✅ ");
    // 소켓 닫힘에 대한 이벤트 핸들러
    socket.on("close", onSocketClose);
    // 클라이언트로부터 수신된 메시지에 대한 이벤트 핸들러
    socket.on("message", (message, isBinary) => {
        sockets.forEach((aSocket)=> {
        const messageString = isBinary ? message : message.toString('utf8');
        aSocket.send(messageString);
        })});
    // 연결된 클라이언트에게 메시지 전송
});

server.listen(3000, handleListen); //서버 시작

