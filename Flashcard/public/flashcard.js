
const allCards= document.getElementById("cardDiv").children

let currentCard = 0


function flipCard(button, cardFront, cardBack) {

    let buttonText = button.children[0].innerHTML
    
    if (buttonText == cardFront) {

        buttonText = cardBack
    }

    else {
        buttonText = cardFront
    }

    button.children[0].innerHTML = buttonText
}

function changeCard(next) {

    if (next == true) {

        allCards[currentCard].classList.add("hidden") 

        if (currentCard <= allCards.length) {currentCard += 1}
    }

    else {

        allCards[currentCard].classList.add("hidden") 

        if (currentCard >= 0) {currentCard -= 1}
    }
    
    showCard()
}

function showCard() {

    allCards[currentCard].classList.remove("hidden")
}

showCard()