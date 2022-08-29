const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var num1 = Number(req.body.n1);
  var num2 = Number(req.body.n2);

  var result = num1 + num2;

  res.send("The result of the calculation is " + result);
});


app.get("/bmicalculator", function(req,res){
    res.sendFile(__dirname + "/BMI.html");
});

app.post("/bmicalculator",function(req,res){
    let weight=parseFloat(req.body.weight);
    let height=parseFloat(req.body.height);

    let bmi= weight / (height * height) * 10000;

    res.send("Your Body mass Index(BMI) in kg/cm^2 is " + bmi);
});


app.listen(3000, function () {
console.log("Server is running on port 3000.");
});
