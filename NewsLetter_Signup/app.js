const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
// const path = require("path");
const https = require("https");

const app = express();

app.use(express.static("public")); //path of static file, all static file present in one folder named "public".
app.use(bodyParser.urlencoded({ extended: true }));

//Home Route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});
// app.use(express.static(path.join(__dirname, "public")));

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email_id = req.body.email;
  // console.log(firstname,lastName,email);//print input data in console

  const data = {
    members: [
      {
        email_address: email_id,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  //Data of url and auth come from mailchimp api. 
  //Unique id: f974d2baa8
  //Api key: 9f46c93f53a3f6975d8592a24637af53-us10
  const jsonData = JSON.stringify(data);
  const url = "https://us10.api.mailchimp.com/3.0/lists/f974d2baa8";//us10 is unique come from Api key
  const options = {
    method: "post",
    auth: "Rishav:9f46c93f53a3f6975d8592a24637af53-us10",
  };

  const request = https.request(url, options, (response) => {

    if(response.statusCode===200) {
      res.sendFile(__dirname + "/success.html");//true then go to success page
    }
    else {
      res.sendFile(__dirname + "/failure.html");//false then go to failure page
    }
    response.on("data", (data) => {
      console.log(JSON.parse(data));//show output data from API
    });
  });

  request.write(jsonData);
  request.end();
});

//Click Try Again button to redirect to home page
app.post("/failure",(req,res)=>{
  res.redirect("/");//Home Route
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});