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

      //invoking the call back function.
      cb(JSON.parse(this.responseText));
    }
  };
}

//Putting out objects into tables
function getTableHeaders(obj) {

  //variable for the table headders
  var tableHeaders = [];

  //Itterating through each object
  Object.keys(obj).forEach(function (key) {

    //Pushing each key into a table cell
    tableHeaders.push(`<td>${key}</td>`)
  })

  //returing the formatted table header in a table row
  return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type) {
  var tableRows = [];

  //creating a variable to hold the page element
  var el = document.getElementById("data");

  //On each click, clearing the element first
  el.innerHTML = "";

  //Running out Get Data function with a callback once it's done
  getData(type, function (data) {

    //moving the data.results into a variable data
    data = data.results;

    //creating a variable for table headers and running the function
    var tableHeaders = getTableHeaders(data[0]);

    //runs for each object in the list
    data.forEach(function (item) {

      var dataRow = [];

      Object.keys(item).forEach(function(key) {
        dataRow.push(`<td>${item[key]}</td>`);
      })
      tableRows.push(dataRow);
    })

    //to test - setting the inner html to the results we got from the
    //table headers
    el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`
  });
}


