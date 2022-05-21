const express = require("express");
const bdparser = require("body-parser");
const res = require("express/lib/response");
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
  res.sendFile(__dirname + "/routefile/weather.html");
});

//! End Weather Route
////-------------------------------------------------------

app.get("/newsletter", (req, res) => {
  res.sendFile(__dirname + "/routefile/newsletter.html");
});
app.get("/todolist", (req, res) => {
  res.sendFile(__dirname + "/routefile/todolist.html");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
