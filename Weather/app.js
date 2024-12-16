
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

            days[hour.date].hours.push(hour)
        }

        else {

            const day = {weekday: convertToWeekday(hour.date), hours: [hour]}
            
            days[hour.date] = day;
        }

        delete hour.date
    })
}


function convertToWeekday(date) {

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = new Date(date);

    return weekday[day.getDay()]
}

function convertToWeatherIcon(weather) {

    return `icons/${weather}.png`
}

function getLocationName(weather) {
    
    const cityName = weather.city.name;
    const countryName = new Intl.DisplayNames(['en'], {type: "region"}).of(weather.city.country);

    const location = cityName + ", " + countryName;

    return location
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
                "date": new Date(weather.list[i].dt_txt.split(" ")[0]).toDateString(),

                "time": weather.list[i].dt_txt.split(" ")[1],

                "temp": (Math.round(weather.list[i].main.temp - 273.15)).toString() + "C°",

                "weather": convertToWeatherIcon(weather.list[i].weather[0].main),
            }

            hours.push(hour);
        }

        splitIntoDays(hours, days);

       

        app.get("/", function(_req, res){

            res.render("index", {"days" : days, "current_time": new Date().toLocaleTimeString(), "location": getLocationName(weather),});
        })
    }
})


app.listen(port, function(){
    console.log("Exapme 101");
})
