/* Global Variables */

// The API key for OpenWeatherMap API
let baseURL = "api.openweathermap.org/data/2.5/weather?zip="
let apiKey = "&appid=9cb653ca326d4ad40e60c6690645668b"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Adding event listener to the button when click to add function

document.getElementById("generate").addEventListener("click" ,Start)

// Start function that called before by event listenetr

function start() {
    let userZip = document.getElementById("zip").value;
    let userFellings = document.getElementById("feelings").value;
    userWeather(baseURL,userZip,apiKey)
    .then(function(data){
        console.log(data)
        //Adding Data to the POST request
        postData('/add', {date:d , temp:data.list[0].main.temp, content:feelings})
        displayIN(); // UpdateUI displays all the informations in the screen
    })
}

//  funtion(userWeather) to GET web API Data
 const userWeather = async (baseURL,zip,key)=>{
     const res = await fetch(baseURL+zip+key)
     try {
         const data = await res.json();
         return data;
     }catch(error){
     console.log("error", error) //appropriately handle the error
     }
 }

 //function to POST Data

 const postData = async (url = "" , data ={})=>{
     console.log(data);
     const response = await fetch(url,{
         method:"POST",
         credentials:"same-origin",
         headers:{
             "content-type" : "application/json",
         },
         //Body data type must be like "content-type" header
         //Creating JSON string from a javascript object.
         body: JSON.stringify(data) 
     });
     try {
         const UserData = await response.json();
         console.log(UserData);
         return UserData;
        }catch(error){
            console.log("error" , error)
        }

 }

 // Funtion to display all project data (displayIN)
 const displayIN = async ()=> {
     const request = await fetch('/all');
     try{
         const mainData = await request.json();
         document.getElementById("temp").innerHTML = `tempratuer: ${mainData[0].temp}`;
         document.getElementById("content").innerHTML = `the weather is: ${mainData[0].content}`;
         document.getElementById("date").innerHTML = `Date: ${mainData[0].date}`;

     }catch(error){
         console.log("error", error)
     }
 }