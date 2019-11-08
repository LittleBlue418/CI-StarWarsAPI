var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("data").innerHTML = this.responseText;
    console.log(JSON.parse(this.responseText))
  }
};

xhr.open("GET", "https://swapi.co/api/");

xhr.send();