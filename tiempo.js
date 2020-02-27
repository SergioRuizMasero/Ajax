var appid = "479092b77bcf850403cb2aeb1a302425";

window.addEventListener("load",getJSON);

// función que devuelve  de manera asíncronada el resultado del API REST
function getXML() {
    
var ciudad = document.getElementById("select-categorias").value;
console.log(ciudad);
var urlWeather =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  ciudad +
  ",es&lang=es&units=metric&mode=xml&appid=" +
  appid;
  var xhttp = new XMLHttpRequest();
  xhttp.addEventListener('readystatechange',manageResponse);
  xhttp.open("GET", urlWeather, true);
  xhttp.send();
  
}

function getJSON() {

  const urlCategorias =
  "https://raw.githubusercontent.com/IagoLast/pselect/master/data/provincias.json";
  const categoriasInput = document.getElementById("select-categorias");

    // llámada asíncrona con AJAX
    var getJSON = function(url) {
      return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.responseType = "json";
        xhr.onload = function() {
          var status = xhr.status;
          if (status == 200) {
            console.log("listo");
            resolve(xhr.response);
          } else {
            reject(status);
            console.log("algo fue mal");
          }
        };
        xhr.send();
      });
    };

    // Hacemos una petición AJAX para crear las categorias
    getJSON(urlCategorias).then(
      function(data) {
        data.forEach(function(categoria) {
          console.log(categoria);
          option = document.createElement("option");
          option.innerHTML = categoria.nm;
          categoriasInput.appendChild(option);
        });
      },
      function(status) {
        alert("Algo fue mal.");
      }
    );

}


 function manageResponse(event) {
    if (this.readyState == 4 && this.status == 200) {
    procesarXML(this);
    }
  };
  
function procesarXML(xml) {
 
    var i;
  var xmlDoc = xml.responseXML;
  
  var x = xmlDoc.getElementsByTagName("time");
  var table= "<table border='1px' style='text-align:center;'><tr><th>Día "  + "</th><th>Temperatura</th></tr>";
  
  for (i = 0 ; i <x.length; i++) { 
   table += "<tr><td>" +  x[i].getAttribute("from") + "</td>"
    table += "<td>" + x[i].getElementsByTagName("temperature")[0].getAttribute("value") +"º </td></tr>"

  
    
  
   
  
   
    
  }
  
  table += "</table>";
  document.getElementById("ciudad").innerHTML = "<br><br><b>Ciudad: " + document.getElementById("select-categorias").value + "</b><br><br>";
  document.getElementById("tabla").innerHTML = table;
  
}


