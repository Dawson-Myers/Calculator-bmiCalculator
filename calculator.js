//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
//This is the code you need to write everytime you want to use body parser.

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});
/*The res.sendFile path looks for the directory where the website is hosted.
Then it send the index.html file that is in that directory in response to the get. */
app.post("/", function(req, res){
  var num1 = Number(req.body.num1); //adding Number() to the req.body changes the return form text to a numebr.
  var num2 = Number(req.body.num2);
//The num1 and num2 come from the name in HTML. It is also the catch for the form data value.
  var result = num1 + num2;

  res.send("The result of the calculation is " + result);
});


app.get("/bmicalculator", function(req, res){
  res.sendFile(__dirname + "/bmiCalculator.html")
})

app.post("/bmicalculator", function(req, res){
  var weight = parseFloat(req.body.weight); //parseFloat looks at the string value and converts to float
  var height = parseFloat(req.body.height); //^-this means if the first character is a number it returns the number
                                            //^--otherwise it will return NaN and wont continue to the next section.
  var standard = 703 * (weight / (height * height)); // lbs & in
  var metric = weight / (height * height); // kg & m
  res.send("Your BMI is " + standard);
});


app.listen(3000, function(){
  console.log("Server listening to port 3000");
});

//Middleware is some code that transforms the incoming request.
//in app.use(bodyParser.urlencoded({extended: true})); this uses the built in middleware urlencoded to parse through incoming request with urlencoded paylods to look if the content-type header matches the type option.
//urlencoded paylods are bits on infromation form the form within the HTML the request are input through.

/*Parsing means analyzing and converting a program into an internal format that a runtime environment can actually run, for example the JavaScript engine inside browsers.

The browser parses HTML into a DOM tree.
HTML parsing involves tokenization and tree construction.
HTML tokens include start and end tags, as well as attribute names and values.
If the document is well-formed, parsing it is straightforward and faster.
The parser parses tokenized input into the document, building up the document tree.*/
