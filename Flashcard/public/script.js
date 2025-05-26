

function resetDatabase() {

    let xhr = new XMLHttpRequest()

    xhr.open("POST", "http://localhost:4000", false)
    
    xhr.send()

    window.location.reload()
}