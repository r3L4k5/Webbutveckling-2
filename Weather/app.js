
const express = require("express");
const request = require("request");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "pug");

const api = "4c1713abb514d205e01668137dba99c3";
const lat = '63.1793655';
const lon = '14.6357061';
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api}`


function splitIntoDays(hours, days){

    hours.forEach(hour => {

        if (hour.date in days) {

            days[hour.date].push(hour)
           
        }

        else {
            days[hour.date] = [hour]

        }

        delete hour.date
    })

}


request(url, function(err, _res, body){

    if (err) {
        console.log("error: ", err);
    } 

    else {
        let weather = JSON.parse(body);
        let hours = [];
        let days = {};

        for (i = 0; i < weather.list.length; i++) {

            let hour = {
                date: weather.list[i].dt_txt.split(" ")[0],


                // you're gay


                time: weather.list[i].dt_txt.split(" ")[1],
                temp: (Math.round(weather.list[i].main.temp - 273.15)).toString() + "C°"
            }

            hours.push(hour);
        }

        splitIntoDays(hours, days);

        app.get("/", function(_req, res){
            res.render("index", {"days" : days});
        })
    }
})


app.listen(port, function(){
    console.log("Exapme 101");
})
