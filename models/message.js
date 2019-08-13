import guid from "../untils/guid.js";
const messages = [];

var db=firebase.firestore();
    db.collection('conversations').onSnapshot(function(snapShot){
      const conversations = snapShot.docChanges()
      const conversation =conversations [0]; 
      const messages = conversation.doc.data().messages
      if(messages){
          receiveMessage(messages[messages.length-1])
    //   for(let i=0;i<messages.length;i++){
    //     receiveMessage(conversation.doc.data().messages[i])
    //   }
    }
      });


      const listSubscriber = [];

function subscribe(screen){
    listSubscriber.push(screen);
}
function unsubscribe(screen){
    //to do: homework
}
function notifyMessagae(message){
    console.log(message)
    console.log(listSubscriber);
    for(let i=0;i<listSubscriber.length;i++)
        listSubscriber[i].onNotifyMessage(message);
}
function receiveMessage(message){
    messages.push(message);
    notifyMessagae(message);
}

function sendMessage(message){
    saveMessage(message);
}

function saveMessage(message){
    message.id=guid();
    db.collection("conversations").doc("vsQbBQTxNd9Sq73hUp1F").update({
       messages: firebase.firestore.FieldValue.arrayUnion(message),

    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    
}
export {sendMessage,subscribe};
export default messages;