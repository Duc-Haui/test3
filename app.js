const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})




app.post('/', (req, res) => {
    var CityName = req.body.cityName;
    const query = CityName;
    const apiKey = "68569760214737bc3ab71318463abb1f";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "";

    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const type = weatherData.sys.type;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            console.log(icon);
            const urlimage = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>the temp is " + temp + " degrees Celcius.</h1>");
            res.write("<h2>the weather London is " + description + " type " + type + "</h2>");
            res.write("<img src='" + urlimage + "'/>");
            res.send();
        })
    })
})


app.listen("3001", function() {
    console.log("listening on 3001");
});