
//Wrapping all of the getting data code in a fucntion
//we will use cb as our call back function
function getData(url, cb) {

  //Inbuilt object that JavaScript provides to allow us to consume APIs
  //Method to open connections, send and close them
  //Creating a new instance of this object
  var xhr = new XMLHttpRequest();

  //Opening a connection, use the 'get' method to retrieve the data
  //Url is the data that we want to retrieve
  xhr.open("GET", url);

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

//Function to generate next and previous buttons if we have more than 10 results
function generatePaginationButtons(next, prev) {
  if (next && prev) {
    return `<button onclick="writeToDocument('${prev}')">Previous</button>
            <button onclick="writeToDocument('${next}')">Next</button>`;
  } else if (next && !prev) {
    return `<button onclick="writeToDocument('${next}')">Next</button>`;
  } else if (!next && prev) {
    return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
  }
}

function writeToDocument(url) {
  //House each row of data
  var tableRows = [];

  //creating a variable to hold the page element
  var el = document.getElementById("data");

  //On each click, clearing the element first
  el.innerHTML = "";

  //Running out Get Data function with a callback once it's done
  getData(url, function (data) {

    //The variable to store the pagination function output
    var pagination;

    //logic to determine whether we run the function
    if (data.next || data.previous) {

      // if we run the function, set variable equal to function with these inputs
      pagination = generatePaginationButtons(data.next, data.previous)
    }

    //moving the data.results into a variable data
    data = data.results;

    //creating a variable for table headers and running the function
    var tableHeaders = getTableHeaders(data[0]);

    //runs for each object in the list
    data.forEach(function (item) {

      //An empty array for each individual row.
      //things that will be in that row
      var dataRow = [];

      // Creating an individual row array
      //Itterating over our keys again, using the same method as before
      Object.keys(item).forEach(function(key) {

        //Set to the value of the key
        var rowData = item[key].toString();

        //Takes the first 15 charactors from our row data
        var truncatedData = rowData.substring(0, 15)

        // we are pushing each truncated element onto our data row
        // <td> created a new table cell for each item
        // item[key] gives the data that's in each key. the value
        dataRow.push(`<td>${truncatedData}</td>`);
      })

      // Pushing the data row array into our table row array
      tableRows.push(`<tr>${dataRow}</tr>`);
    })

    //setting the inner html to the results we got from the
    //table headers and the table rows
    el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`;
  });
}


