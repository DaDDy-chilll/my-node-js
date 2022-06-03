const express = require("express");
const https = require("https");
const bdparser = require("body-parser");
const res = require("express/lib/response");
const { json } = require("express/lib/response");
const { log } = require("console");
// const textmodify = require(__dirname+'/public/js/calculator.js');

let app = express();
let PORT = 3000;
app.use(bdparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//! Start Calculator Route
app.get("/calculator", (req, res) => {
  res.render("calculator", { calculator: "Calculator" });
});
app.post("/calculator", (req, res) => {
  let num1 = Number(req.body.fno);
  let num2 = Number(req.body.lno);
  let result = num1 + num2;
  res.render("calculator", { calculator: result });
  // res.redirect('/calculator');
});
app.get("/bmi", (req, res) => {
  res.render("bmi", { bmi: "BIM-Calculator" });
});
app.post("/bmi", (req, res) => {
  let weight = parseFloat(req.body.weight);
  let height = parseFloat(req.body.height);
  let bmi = weight / (height * height);
  res.render("bmi", { bmi: bmi });
  // res.redirect('/bmi');
});
//! End Calculator Route
////-------------------------------------------------------
//! Start Weather Route

app.get("/weather", (req, res) => {
  let zero = 0;
  let imgsrc = "http://openweathermap.org/img/wn/10d@2x.png";
  res.render("weather", { temp: zero, imgsrc: imgsrc });
});

app.post("/weather", (req, res) => {
  const userSearch = req.body.userSearch;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&units=metric&appid=a91e35d21cd69d9b1fce078e882eafb1`;
  https.get(url, (resp) => {
    resp.on("data", (data) => {
      const weatherData = JSON.parse(data);
      try {
        const temp = weatherData.main.temp;
        const icon = weatherData.weather[0].icon;
        const imgsrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        res.render("weather", { temp: temp, imgsrc: imgsrc });
      } catch (error) {
        res.redirect("/weather");
      }
    });
  });
});

//! End Weather Route
////-------------------------------------------------------
//! Start Newsletter Route
app.get("/newsletter", (req, res) => {
  res.render('newsletter');
});
app.post('/newsletter',(req,res)=>{
  const Fname = req.body.fname;
  const Lname = req.body.lname;
  const Email = req.body.email;
  let data = {
    members:[
      {
        email_address:Email,
        status:'subscribed',
        merge_fields:{
          FNAME:Fname,
          LNAME:Lname
        }
      }
    ]
  };
  let jsonData = JSON.stringify(data);
  let url = 'https://us14.api.mailchimp.com/3.0/lists/d8d49f05c7';
  let options = {
    method:'POST',
    auth:'imwho:cb44547e935b56c1ae9e51e5b1903dfa-us14'
  };
  const request = https.request(url,options,(resp)=>{
    if(resp.statusCode===200){
      res.render('newsletter/finish',{text:'Thanks for Subscribed',btn:'new signup'});
    }else{
      res.render('newsletter/finish',{text:"Woo! Sorry Please Sigup Again",btn:'Try again'});
    }
    // resp.on('data',(data)=>{
    //   console.log(JSON.parse(data));
    // });
  });
  request.write(jsonData);
  request.end();
});
//! End Newsletter Route
////-------------------------------------------------------
app.get("/todolist", (req, res) => {
  res.sendFile(__dirname + "/routefile/todolist.html");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
