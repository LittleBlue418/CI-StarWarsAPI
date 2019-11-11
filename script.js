//Taking the URL out of the function into a global constant
const baseURL = "https://swapi.co/api/"

//Wrapping all of the getting data code in a fucntion
//we will use cb as our call back function
function getData(type, cb) {
  //Inbuilt object that JavaScript provides to allow us to consume APIs
  //Method to open connections, send and close them
  //Creating a new instance of this object
  var xhr = new XMLHttpRequest();

  //Opening a connection, use the 'get' method to retrieve the data
  //Url is the data that we want to retrieve
  xhr.open("GET", baseURL + type + "/");

  //The send method sends the request to the swapi api
  xhr.send();

  //Whenever the state changes on our Xhr object we run a check
  //This happens five times
  xhr.onreadystatechange = function () {

    //xhr state 4 is done, loaded and ready.
    //200 is a http code meaning request suceeded, content delivered
    if (this.readyState == 4 && this.status == 200) {

      //we find our div, target the inner html, set it to contain the response text
      document.getElementById("data").innerHTML = this.responseText;

      //invoking the call back function.
      cb(JSON.parse(this.responseText));
    }
  };
}

function writeToDocument(type) {
  getData(type, function (data) {
    //breaking out for clean code
    data = data.results;
    //runs for each object in the list
    data.forEach(function (item) {
      //item.name gives the name field for each, and the += avoids overwriting
      document.getElementById("data").innerHTML += item.name;
    })
    console.dir(data)

  });
}


