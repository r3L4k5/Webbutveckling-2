
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.set("view engine", "pug");

app.get("/bulbasaur", (_req, res) => {
    res.render('index', {name: "Bulbasaur", img: "images/bulbasaur.png", type: "Grass/Posion"})
})

app.listen(PORT, () => {
})

