/*
Routing refers to determining how an application responds to a client request to a particular endpoint,
which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
Each route can have one or more handler functions, which are executed when the route is matched.
Route definition takes the following structure:
app.METHOD(PATH, HANDLER)
Where:
  app is an instance of express.
  METHOD is an HTTP request method, in lowercase.
  PATH is a path on the server.
  HANDLER is the function executed when the route is matched.
*/
const hbs = require('hbs');
const express = require('express');
const fs = require('fs');

var app = express();
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('year', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('messagehelper', (text)=>{
  return text.toUpperCase();
});
// app.use -> to register a middleware , in which we pass the middleware function to use.

app.use( (req, res , next) => {
  var now = new Date().toString();
  var log = `${now} with request method : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log' , log + '\n', (err) => {
    if(err)
      console.log(err);
  })
  next();
});

app.use( (req,res,next) => {
  res.render('about.hbs',{
    pagetitle : "Maintenance",
    message : "Maintenance in progress. We will be right back to you soon !!"
  });
});

app.use(express.static(__dirname+'/public')); // express middleware

app.get ('/', (request,response) => {
  response.render('about.hbs', {
    pagetitle : "Main",
    message : "Main Page",
    //year : new Date().getFullYear()
  });
});

app.get ('/about' , (request , response) => {
  //response.send("About Page!!");
  response.render('about.hbs',{
    pagetitle : "About",
    message : "About Page",
    //year : new Date().getFullYear()
  });
});

app.get('/help', (request,response) => {
  response.render('about.hbs',{
    pagetitle : "Help",
    message : "Help Page",
    //year : new Date().getFullYear()
  });
});

app.listen(3030, () => {
  console.log("Server is listening on port : 3030");
});
