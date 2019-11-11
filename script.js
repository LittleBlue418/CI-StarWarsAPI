//Inbuilt object that JavaScript provides to allow us to consume APIs
//Method to open connections, send and close them
//Creating a new instance of this object
var xhr = new XMLHttpRequest();

//Storing the object in a variable in order to manipulate it
var data;

//Opening a connection, use the 'get' method to retrieve the data
//Url is the data that we want to retrieve
xhr.open("GET", "https://swapi.co/api/");

//The send method sends the request to the swapi api
xhr.send();

//Setting the data variable outside of the on ready state change function
function setData(jsonData) {
  data = jsonData;
}

//Whenever the state changes on our Xhr object we run a check
//This happens five times
xhr.onreadystatechange = function () {

  //xhr state 4 is done, loaded and ready.
  //200 is a http code meaning request suceeded, content delivered
  if (this.readyState == 4 && this.status == 200) {

    //we find our div, target the inner html, set it to contain the response text
    document.getElementById("data").innerHTML = this.responseText;

    //Sending through a JSON parsed object into our setData function.
    setData(JSON.parse(this.responseText));
  }
};

setTimeout(function () {
  console.log(data);
}, 900);


