
const collectionName = document.getElementById("collectionName");
const collectionAuthor = document.getElementById("collectionAuthor");

const cardFront = document.getElementById("cardFront");
const cardBack = document.getElementById("cardBack");

const submitButton = document.getElementById("submitButton");

const backButton = document.getElementById("backButton");


submitButton.addEventListener("click", function(){

    let xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:4000/add", false);
    xhr.setRequestHeader("Content-Type", "application/json");

    let reqBody = {

        "collectionName": collectionName.value,
        "collectionAuthor": collectionAuthor.value,

        "cardFront": cardFront.value,
        "cardBack": cardBack.value,
    };
    
    xhr.send(JSON.stringify(reqBody));

    cardFront.value = "";
    cardBack.value = "";

})



