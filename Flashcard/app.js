
const PORT = 4000

const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database('database.db')


//SQLite 

db.run("PRAGMA foreign_keys = ON")

db.serialize(function(){

    db.all(`CREATE TABLE IF NOT EXISTS collection 

        (
        id INTEGER PRIMARY KEY, 
        name TEXT NOT NULL UNIQUE, 
        author TEXT NOT NULL
        )`, 
    
    function(err, row){})

    db.all(`CREATE TABLE IF NOT EXISTS card 
       
        (id INTEGER PRIMARY KEY, 
        collection INTEGER NOT NULL, 
        front TEXT NOT NULL, 
        back TEXT NOT NULL, 
        
        FOREIGN KEY (collection) REFERENCES collection(id))`, 
        
    function(err, row){})
})

function addCollection(name, author) {

    db.serialize(function(){

        db.all(`INSERT INTO collection(name, author) VALUES('${name}', '${author}')`, function(err, row) {})
    })
}

function addCard(collectionName, front, back) {

    let collectionId;

    db.serialize(function(){

        db.all(`SELECT * FROM collection WHERE name = '${collectionName}'`, function(err, rows){

            collectionId = rows[0].id

            db.all(`INSERT INTO card(collection, front, back) VALUES(${collectionId}, '${front}', '${back}')`, function(err, row) {})
        })
    })
}


//NodeJS

const express = require("express");
const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set("view engine", "pug")


app.get("/", function(req, res){

    res.render("index")
})

app.post("/", function(req, res){

    db.serialize(function(){
        
        db.all("DELETE FROM card")
        db.all("DELETE FROM collection")

    })

    res.sendStatus(200)
})


app.get("/add", function(req, res) {

    res.render("add")
})

app.post("/add", function(req, res) {

    addCollection(req.body["collectionName"], req.body["collectionAuthor"])
    
    addCard(req.body["collectionName"], req.body["cardFront"], req.body["cardBack"])

    res.sendStatus(200)
})

app.get("/collections", function(req, res) {

    db.serialize(function(){

        db.all("SELECT * FROM collection", function(err, rows) {

            res.render("collection", {"collections": rows })
        })
    })
})

app.get("/collections/:collection_id", function(req, res) {

    db.serialize(function(){

        db.all(`SELECT * FROM card WHERE collection = ${req.params.collection_id}`, function(err, rows) {

            if (rows != undefined && rows.length > 0) {

                res.render("flashcard", {"cards": rows})
            }
        })  
    })
})


app.listen(PORT, function(){

    console.log(`Listening on port: ${PORT}`);
})

