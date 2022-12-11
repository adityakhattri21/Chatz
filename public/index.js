

const socket = io()

let username ;
do {
    username = prompt("Enter username");
}while(!username)

let textarea = document.querySelector("#text_area");
let messageArea = document.querySelector(".message__area");

textarea.addEventListener('keyup',(e)=>{
    if (e.key === 'Enter'){
        // alert('fuck you')
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg = {
        user: username,
        message: message.trim()
    }

    //Append
appendMessage(msg,'outgoing');
textarea.value = '';

//Sending to server
socket.emit("message" , msg); //emit takes two arguments event naem and the object to pass the value
}



function appendMessage(msg,type){
    let mainDiv = document.createElement("div");
    let className= type;
    mainDiv.classList.add(className,'message');

    let markup =`
       <h4>${msg.user}</h4>
       <p>${msg.message}</p>
    `;

    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv);
    scrollToBottom()

}

//Receiving the message
socket.on('message', (msg)=>{
     appendMessage(msg,'incoming');
     scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}