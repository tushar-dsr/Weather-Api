const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(express.urlencoded({extended: true}));
const port = 3000;
app.listen(port, function () {
  console.log("I am running baby!");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/" , function(req,res){
    const query=req.body.cityName;
    const apiKey="#";
const url =
    "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apiKey +"&units=metric";
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write(
        "<h1>The temperature in "+query+" is " + temp + " degree Celciuls.</h1>"
      );
      res.write("<img src=" + imageUrL + ">");
      res.send();
    });
  });

});

















