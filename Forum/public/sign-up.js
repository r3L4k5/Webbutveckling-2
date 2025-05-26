
const joinButton = document.getElementById("joinButton")

const inputUsername = document.getElementById("inputUsername")
const inputPassword = document.getElementById("inputPassword")
const inputBio = document.getElementById("inputBio")


function createdDate() {

    let date = new Date().toLocaleString();

    date.slice(0, 10);

    return date;
}


joinButton.addEventListener("click", function() {

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:3000/sign-up", false)
    xhr.setRequestHeader("Content-Type", "application/json")

    let reqBody = {
        "username": inputUsername.value,
        "password": inputPassword.value,
        "bio": inputBio.value,
        
        "created" : createdDate()
    }

    xhr.send(JSON.stringify(reqBody))
})