
const hours = document.querySelectorAll(".hour");


hours.forEach(hour => {

    hour.addEventListener("mouseenter", hovering);

})

function hovering() {

    const weatherByIcon = this.querySelector(".icon").src.split("http://localhost:3000/icons/")[1].split(".png")[0];

    document.querySelector("body").style.backgroundImage = `url(background/${weatherByIcon}_background.jpg`;
}
