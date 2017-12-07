

   var polyline= document.getElementById('pd')
  , points = polyline.getAttribute('points'), sw = polyline.getAttribute('stroke-width');
function getCityForecast(city){
	var api = "http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=c22f65626a53097515dda38a566d0cf3";
	var xmlhttp = new XMLHttpRequest();
	var jsonResponse;
	var resp;
	var weekday=new Array(7);
	weekday[1]="Mon";
	weekday[2]="Tue";
	weekday[3]="Wed";
	weekday[4]="Thur";
	weekday[5]="Fri";
	weekday[6]="Sat";
	weekday[0]="Sun";
	
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200){
			resp = JSON.parse(xmlhttp.responseText);
	 var theDate, currDate, prevDate;
       //get the wind speed
	    var w,today;
		var j = 0;
				 var fahr,cels;
		var k = 0;
		var t = 10;
		var varh;
		var varl;
		today = new Date(resp.list[0].dt_txt);
	    var size = Object.keys(resp.list).length;
		
		var imgURL;
		
		for (i = 0; i < size ;i++) {
			
			theDate = new Date(resp.list[i].dt_txt);
			
			currDate = theDate.getDate();
			//Set weather icons
			if (currDate != prevDate && j != 5){
				imgURL = "Weather/" + resp.list[i].weather[0].main+".png";
				document.getElementById('weatherImg' + j).src = imgURL ;
				w = resp.list[i].wind.speed ;
				document.getElementById("windText"+j).innerHTML = w.toFixed(1) + " m/s";
				w = resp.list[i].main.humidity ;
				document.getElementById("humidityText"+j).innerHTML = w.toFixed(1) + " %";
				cels = (resp.list[i].main.temp - 273.15);
				document.getElementById("tempText"+j).innerHTML = cels.toFixed(1) + " C&deg" ; 
				w = weekday[theDate.getDay()];
			
				document.getElementById("day"+j).innerHTML = w + "";
				j++;

			}
			
			//Get wind and temp up until 7 days 
			if (k != 7 ){

				w = resp.list[i].wind.speed ;
				document.getElementById("windTextt"+k).innerHTML = w.toFixed(1) + " m/s";
				w = resp.list[i].main.humidity ;
				
				cels = (resp.list[i].main.temp - 273.15);
				document.getElementById("tempTextt"+k).innerHTML = cels.toFixed(1) + " C&deg"+ "<br>"+ "<br>"; 
				
				points += t+","+(120-w)+" "; 
				varh = document.getElementById("n"+k);
				varh.setAttributeNS(null,"x",t); 
				varh.setAttributeNS(null,"y",120-w); 		
				varh.innerHTML = w+"%";
		
				varl = document.getElementById("l"+k);
				varl.setAttributeNS(null,"x",t); 
				varl.setAttributeNS(null,"y",117-0); 		
				varl.innerHTML = theDate.getUTCHours()+" UTC";
				sw = 0;
			
				k++;
				t+=55;
				
			}
			prevDate = currDate;
		
		}
	
		polyline.setAttribute('points', points );
	
		//To celsius
	toDeg = function(){
		 for (i = 0; i < size ;i++) {
			cels = (resp.list[i].main.temp - 273.15);
			if (i < 5){
			document.getElementById("tempText"+i).innerHTML = cels.toFixed(1) + " C&deg"+ "<br>"+ "<br>"; 
		
			}
			if (i <k){
			document.getElementById("tempTextt"+i).innerHTML = cels.toFixed(1) + " C&deg"+ "<br>"+ "<br>"; 
		 }}
	 } 
	 // To Fahr
	 toF = function(){
		 for (i = 0; i < size ;i++) {
			fahr = (resp.list[i].main.temp * 9 / 5) - 459.67;
		
			if (i < 5){
		
			document.getElementById("tempText"+i).innerHTML = fahr.toFixed(0) + " F&deg"+ "<br>"+ "<br>";
		
			}
			if (i <k){
			document.getElementById("tempTextt"+i).innerHTML = fahr.toFixed(0) + " F&deg"+ "<br>"+ "<br>";}
		}
	  }
		 
	
	}}

	
	xmlhttp.open("GET", api, true);
	xmlhttp.send();
 

}

getCityForecast("toronto");
//get the city input
getCityName = function (){
	var x = document.getElementById("frm1");
    var text = "";
    var i;
    text = x.elements[0].value;
	var city = text;
	points = " ";
	
	getCityForecast(city);
}
