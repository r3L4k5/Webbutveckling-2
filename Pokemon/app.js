
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.set("view engine", "pug");

app.get("/bulbasaur", function(_req, res) {
    res.render("index", {name: "Bulbasaur", img: "images/bulbasaur.png", type: "Grass/Posion"})
})

app.get("/charmander", function(_req, res){
    res.render("index", {name: "Charmander", img: "images/charmander.png", type: "Fire"})
})

app.get("/squirtle", function(_req, res){
    res.render("index", {name: "Squirtle", img: "images/squirtle.png", type: "Water"})
})

app.listen(PORT, () => {
    console.log("Example 101")
})

