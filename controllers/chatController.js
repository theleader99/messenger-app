import {authedUser} from  "../models/user.js"
import{sendMessage} from "../models/message.js"

function newChatController(){
    const chatController={};

    chatController.sendMessage= function(msg){
        sendMessage({uid: authedUser.id,content:msg});
        
    };
    return chatController;
}

export default newChatController;