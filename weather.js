

 
function getCityWeather(city){
	var api = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=c22f65626a53097515dda38a566d0cf3";
	var xmlhttp = new XMLHttpRequest();
	var jsonResponse;
	var resp;
	
	
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200){
		resp = JSON.parse(xmlhttp.responseText);
		//city name
        document.getElementById("cityText").innerHTML = resp.name + ", " + resp.sys.country;
      
	  
		//get the wind speed
        var w = resp.wind.speed ;
        document.getElementById("windText").innerHTML = "Wind speed: "+w.toFixed(1) + "m/s";
      
		//get the humidity
        var h = resp.main.humidity;
        document.getElementById("humidityText").innerHTML="Humidity: "+h.toFixed(1) + "%";
      
		//get the temp
        var fahr = (resp.main.temp * 9 / 5) - 459.67;
        var cels = (resp.main.temp - 273.15);
      
		document.getElementById("tempText").innerHTML = cels.toFixed(1) + " C&deg";     
		toDegg = function(){
		 document.getElementById("tempText").innerHTML = cels.toFixed(1) + " C&deg";
		} 
		toFF = function(){
          document.getElementById("tempText").innerHTML = fahr.toFixed(0) + " F&deg";
	  }
     //weather icons
    
		var imgURL = "Weather/" + resp.weather[0].main+".png";
			document.getElementById("weatherImg").src = imgURL;
			document.getElementById("weatherText").innerHTML = resp.weather[0].description;
			
	}}
	
	xmlhttp.open("GET", api, true);
	xmlhttp.send();
 

}
getCityWeather("toronto");
//Get City Input
getCity = function (){
	var x = document.getElementById("frm1");
    var text = "";
    var i;
    text = x.elements[0].value;
	var city = text;
	getCityWeather(city);
}

