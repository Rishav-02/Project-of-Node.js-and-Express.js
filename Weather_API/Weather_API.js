const express = require("express");
const https = require("https");
const app = express();

app.get("/", (req, res) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Deoghar&appid=a6e43bb3c9b9ca7b922d583056561b65&units=metric&mode=json";

  https.get(url, (response) => {
    // console.log(response.statusCode);

    response.on("data", (d) => { //"data" is must
      const weatherData = JSON.parse(d);
      console.log(weatherData);
      const temp = weatherData.main.temp;
    //   console.log(temp);
      const desc = weatherData.weather[0].description;
    //   console.log(desc);
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/" + icon +  "@2x.png";
    //res.write() send request to browser
    res.write("<h1>The Temprature in Deoghar is " + temp + " degree Celcius.</h1>");
    res.write("<h2>The weather is currently " + desc + "</h2>");
    res.write("<img src =" + imageURL +">");//show image but there is some error
    res.send();
    });
  });
});
app.listen(4100);