const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);// 웹소켓 연결 생성

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
    if (typeof message.data === 'string') {
        console.log(`New message :`, message.data);
        } else {
        const messageText = await message.data.text();
        console.log(messageText);
    }
});

// 소켓이 닫히면 발생하는 이벤트 핸들러
socket.addEventListener("close", handleClose);

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value ="";
}

messageForm.addEventListener("submit", handleSubmit);