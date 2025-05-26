

const PORT = 3000

const sql = require("./sql.js")
const express = require('express')
const app = express()


app.set("view engine", "pug")
app.use(express.static("public"))


app.listen(PORT, function() {

    console.log(`Listening on port: ${PORT}`)
})

app.get("/", function(req, res){

    res.render("main")
})

app.get("/dookie/:dex_num", async function(req, res) {

    let pokemon
    let dookie_dex_size = await sql.getDookieDexSize()

    if (req.params.dex_num <= dookie_dex_size) {

        pokemon = await sql.selectDookieWith("dex_num", req.params.dex_num)
    }

    else {
        pokemon = await sql.selectDookieWith("dex_num", dookie_dex_size)
    }

    res.render("dookie", {"pokemon": pokemon})
})

