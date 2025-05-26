
const port = 4000;

const express = require('express');
const cors = require("cors");
const tables = require("./tables");
const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database("database.db");

db.run("PRAGMA foreign_keys = ON");

db.serialize(function(){

    db.all(tables.createUserTable(), function(err, row) {

        if (err) {

            console.error(err.message);
        }
    })

    db.all(tables.createCategoryTable(), function(err, row) {

        if (err) {

            console.error(err.message);
        }
    })

    db.all(tables.createThreadTable(), function(err, row) {

        if (err) {

            console.error(err.message);
        }
    })

    db.all(tables.createPostTable(), function(err, row) {

        if (err) {

            console.error(err.message);
        }
    })

})

function createdDate() {

    let date = new Date().toLocaleString();

    date.slice(0, 10);

    return date;
}

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors( origin = false))

app.set('view engine', 'pug');


//Home
app.get('/home', function(req, res){

    db.serialize( function() {

        db.all(tables.getCategories(), function(err, row) {
            
            res.render("index", {"categories": row});
        })
    })
})

app.get("/", function(req, res){
    
    res.redirect("/home");
})

//Sign-up
app.get("/sign-up", function(req, res) {
    
    res.render("sign-up")
})

app.post("/sign-up", function(req, res) {

    db.serialize(function(){

        db.all(tables.createUser(), [`${req.body.username}`,`${req.body.password}`, `${req.body.bio}`, "background-crt-image.jpg", `${req.body.created}`])
    })
})

//Category
app.get("/category/:id", function(req, res){

    let threads 
    let category 

    db.serialize(function(){
        
        db.all(`SELECT * FROM thread WHERE category = ${req.params.id} `, function(err, thr) {console.log(thr); threads = thr[0]})
        
        db.all(`SELECT * FROM category WHERE ID = ${req.params.id}`, function(err, cat) {console.log(cat); category = cat[0]})
    })

    console.log(category)

    res.render("category", {"threads": threads, "category": category})
}) 


app.listen(port, function(){
    console.log("Listening on port: " + port);
})


