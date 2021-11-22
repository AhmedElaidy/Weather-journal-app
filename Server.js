/* Empty JS object to act as endpoint for all routes */
projectData = {};

/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));
const port = 4000;

// GET route
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData (req, res) {
  res.send(projectData);
};

// POST route
app.post('/add', addData);

// Callback funtion to complete POST '/add'
function addData(req,res){
  console.log(req.body)
  newEntery = {
    date = req.body.date,
    temp = req.body.temp,
    content = req.body.content
  }
  projectData.push(newEntery)
};

/* Spin up the server*/
const server = app.listen(port, listening);

// The server callback
 function listening(){
    // The message that will appear when running the server;
    console.log(`server`);
    console.log(` running on localhost: ${port}`);
  };

