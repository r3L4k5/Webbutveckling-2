
const sql = require("sqlite3").verbose()
const db = new sql.Database("database.db")


function createDookieTable() {

    db.serialize(function() {

        const attributes = 
        
        `dex_num INTEGER PRIMARY KEY UNIQUE,  
                                
        name TEXT NOT NULL,

        primary_type TEXT NOT NULL, 

        secondary_type TEXT,
        
        primary_ability TEXT NOT NULL,
        
        secondary_ability TEXT`


        db.all(`CREATE TABLE IF NOT EXISTS dookie (${attributes})`, function(err) {

            if (err) {
                console.log(err)
            }
        })
    })
}

function dropDookieTable() {

    db.serialize(function() {

        db.all("DROP TABLE IF EXISTS dookie", function(err) {
            
            if (err) {
                console.log(err)
            }
        })
    })
}

function selectDookieWith(attribute, condition, singular = false) {

    db.serialize(function() {

        db.all(`SELECT * FROM dookie WHERE ${attribute} = "${condition}"`, function(err, rows) {
            
            if (err) {

                console.log(err)
            }
            
            else if (singular) {
                
                console.log(rows[0])
                return rows[0]
            }

            else {
                console.log(rows)
                return rows
            }
        })
    })
}

function deleteDookieWith(attribute, condition) {

    db.serialize(function() {

        db.all(`DELETE FROM dookie WHERE ${attribute} =  ${condition})`, function(err, rows) {
            
            if (err) {

                console.log(err)
            }
        })
    })
}

function insertDookie(name, primary_type, secondary_type, primary_ability, secondary_ability) {

    db.serialize(function(){

        db.all(`INSERT INTO dookie(name, primary_type, secondary_type, primary_ability, secondary_ability) 
            
                VALUES("${name}", "${primary_type}", "${secondary_type}", "${primary_ability}", "${secondary_ability}")`, function(err){

                    if (err) {
                        console.log(err)
                    }
                })
    })
}


module.exports = {createDookieTable, selectDookieWith, dropDookieTable, insertDookie, deleteDookieWith}