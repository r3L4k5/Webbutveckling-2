

const PORT = 3000

const sql = require("./sql.js")
const express = require('express')
const app = express()


sql.dropDookieTable()
sql.createDookieTable()

sql.insertDookie("Nils", "Normal", "Normal", "Own Tempo", "Intimidate")


app.set("view engine", "pug")
app.use(express.static("public"))


app.listen(PORT, function() {

    console.log(`Listening on port: ${PORT}`)
})

app.get("/dookie:dex_num", function(req, res) {

    console.log(sql.selectDookieWith("dex_num", req.params.dex_num, true))
})

