
const ip = "localhost:3000"

let latestMessageId = 0

function getId(id){
    return document.getElementById(id)
}

function getClass(name){
    return document.getElementsByClassName(name)[0]
}

function sendMessage() {
   
    let xhr = new XMLHttpRequest();

    xhr.open("POST", `http://${ip}/sendMessage` , true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify({
        username: inputUsername.value,
        message: inputText.value
    }));

    getId("inputText").value = ""

    window.location.reload()
}

function createMessage() {
    
    let new_message = document.createElement("div");
    new_message.id = "message";

    new_message.appendChild(document.createElement("h1"));
    new_message.appendChild(document.createElement("h3"));

    return new_message;
}

function displayMessage(messages){
 
    messages = JSON.parse(messages);

    let chat = getClass("chat");
    
    for (let i = latestMessageId; i < messages.length; i++){
        let new_message = createMessage();

        new_message.children[0].innerHTML = messages[i]["username"];
        new_message.children[1].innerHTML = messages[i]["message"];
    
        chat.insertBefore(new_message, chat.children[0]);

        latestMessageId = messages[i]["id"]
    }

}


function getMessage()  {
    
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            displayMessage(xhr.responseText);
        }
    }

    xhr.open("GET", `http://${ip}/getMessage`, true);
    xhr.send();
}   

setInterval(getMessage, 500);
