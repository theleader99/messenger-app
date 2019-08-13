import messages from '../../models/message.js'
import { authedUser } from '../../models/user.js';
import newChatController from '../../controllers/chatController.js';
import {subscribe} from'../../models/message.js'
let lastMessage;

const chatScreen = `
<div class="h-100">
<div class="d-flex flex-column h-100">
    <div class="bg-primary text-light">
        <h1>Name</h1>
    </div>

    <div class="flex-grow-1 h-100" id="js-chatArea" ></div>

    <div class="p-3 bg-secondary">
    <form class="" id="js-formChat">
      <div class="d-flex flex-row w-100">
        <div class="flex-grow-1 pr-2">
           <input type="text" class="form-control" id="chatMsg" placeholder="type your message..."> 
        </div>
        <div>
            <button  type="submit" class="btn btn-primary">Send</button>         
        </div>
      </div>
      
  </form>
    </div>
</div>
</div>`;

function addMessage(message) {
    const msgDiv = document.createElement('div');
    const msgSpan = document.createElement("span");
    msgSpan.innerHTML = message.content
    if (lastMessage && lastMessage.uid !== message.uid) {
        msgDiv.setAttribute('class', 'mt-4 mb-4')
    } else {
        msgDiv.setAttribute('class', 'mt-1 mb-1')
    }
    if (message.uid === authedUser.id) {
        msgDiv.classList.add("text-right")
        msgSpan.setAttribute("class", "badge badge-primary");
    } else {
        msgSpan.setAttribute("class", "badge badge-secondary");
    }
    msgDiv.appendChild(msgSpan);
    console.log(msgDiv)
    document.getElementById('js-chatArea').appendChild(msgDiv)
    lastMessage = message;
}

function addSingleMessage(content, isOwn) {
    const msgDiv = document.createElement('div');
    msgDiv.setAttribute('class', 'mt1 mb1')
    const msgSpan = document.createElement('span');
    if (isOwn) {
        msgSpan.setAttribute('class', 'badge badge-primary')
    }
    else {
        msgSpan.setAttribute('class', 'badge badge-secondary')
    }
    msgSpan.innerHTML = content;
    msgDiv.appendChild(msgSpan);
    return msgDiv;
}

function onload() {
    subscribe(chat);
    for (let i = 0; i < messages.length; i++) {
        addMessage(messages[i]);
    }

    const formChat = document.getElementById("js-formChat");
    formChat.addEventListener('submit', function (event) {
        event.preventDefault();
        const message = formChat.chatMsg.value;
        const controller = newChatController();
        controller.sendMessage(message);

    });
}

function onNotifyMessage(message){
    addMessage(message);
}
const chat = {
    content: chatScreen,
    onload: onload,
    onNotifyMessage: onNotifyMessage
};
export default chat;