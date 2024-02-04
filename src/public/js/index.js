const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);// 웹소켓 연결 생성

function makeMessage(type, payload){
    const msg = {type, payload}
    return JSON.stringify(msg);
}

function handleOpen(){
    console.log("Connected to Server ✅ ");
}
function handleClose(){
    console.log("Disconnected from Server ❌");
}

// 소켓이 연결되면 발생하는 이벤트 핸들러
socket.addEventListener("open", handleOpen);

// 서버로부터 메시지를 수신하면 발생하는 이벤트 핸들러
socket.addEventListener("message", async (message) => {
    const li = document.createElement("li");
    li.innerHTML = message.data;
    messageList.append(li);
}); 

// 소켓이 닫히면 발생하는 이벤트 핸들러
socket.addEventListener("close", handleClose);

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new message", input.value));
    input.value ="";
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
}
    
messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);