// 웹소켓 연결 생성
var socket = new WebSocket(`ws://${window.location.host}`);

// 소켓이 연결되면 발생하는 이벤트 핸들러
socket.addEventListener("open", () => {//socket이 connection을 open했을 때
    console.log("Connected to Server ✅ ");
})
// 서버로부터 메시지를 수신하면 발생하는 이벤트 핸들러
socket.addEventListener("message", (message) => {
    console.log("New Message: ", message.data );
});
// 소켓이 닫히면 발생하는 이벤트 핸들러
socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌");
});
// 10초 후에 "hello from the browser" 메시지를 서버로 전송
setTimeout(() => {
    socket.send("hello from the browser");
}, 10000); 
