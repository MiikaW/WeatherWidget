/*
Sää widget
Miika Wirtanen, IoT18L
*/


// "Global" variables
var areatext = document.getElementById('areatxt');
var temptxt = document.getElementById('temptxt');
var timetxt = document.getElementById('timetxt');
var datetxt = document.getElementById('datetxt');

//areatext.innerHTML = 'Helsinki';
//var time = n.getHours() + ":" + (n.getMinutes()<10?'0':'')+n.getMinutes(); // Format 00:00

var date =  new Date();
var timestamp = date.getHours() + ":" + (date.getMinutes()<10?'0':'')+date.getMinutes(); // Format 00:00
var currentlocation;
var currentweather;
var presetlocation = 'Helsinki'; // Used when IP location is faulty
var currentTemp;
// Load area & log data
$.get("http://ipinfo.io", function(response) {
	areatext.innerHTML = response.city;
	currentlocation = response.city;
	}, "jsonp").catch(function(error) {
        console.warn('Could not get location, switching to preset location: ' + presetlocation+ ' FI');
		currentlocation = presetlocation;
		areatext.innerHTML = presetlocation;
      });



// Log current data
function logdata(){
var styles = 'background: #222; color: #70CDE0; font-weight: bold; font-size: 14px;';
setTimeout(function(){
console.log('%c❄️Weather widget v0.0.1 loaded!' + 
			'\n' + '\n·Location: ' + currentlocation + 
			'\n·Date: ' + currentdate + 
			'\n·Time: ' + timestamp + 
			'\n·Temperature: ' + currentTemp + '°C' + 
			'\n·Weather: ' + currentweather + 
			'\n' + 
			'\n© Miika IoT18L' +
			'\n© FMIODATA' +
			'\nLähde: Ilmatieteen laitos'+
			'\nCC BY 4.0', styles);	
},1000);
};

// Load date
var checktime1 = setInterval(loaddate, 500);
var currentdate;
function loaddate(){
var n =  new Date();
var y = n.getFullYear();
var m = n.getMonth() + 1;
var d = n.getDate();
datetxt.innerHTML = d+"."+m+"."+y;	
currentdate = d+"."+m+"."+y;
}
loaddate();

// Load time
var checktime = setInterval(loadtime, 500);
function loadtime(){
var ndate =  new Date();
var time = ndate.getHours() + ":" + (ndate.getMinutes()<10?'0':'')+ndate.getMinutes(); // Format 00:00
timetxt.innerHTML = time;	
}	
loadtime();

//Load weather
function getWeather(){
	setTimeout(function(){
	// Get weather data from current location
	const url = ('http://opendata.fmi.fi/wfs/fin?service=WFS&version=2.0.0&request=GetFeature&storedquery_id=fmi::observations::weather::timevaluepair&place='+currentlocation+'&'); 
	fetchData().catch(function(error) { // Error getting data
        console.warn('Could not load weather data, trying again.');
		currentlocation = presetlocation; // Set current location to preset --> Helsinki
		// Try loading weather data again
		setTimeout(function(){ 
		getWeather();	
		},1000);
      });	
async function fetchData() {
    const temperatureElement = document.querySelector('#temperature');
    const response = await fetch(url);
    const xmlText = await response.text();
    const options = {
        ignoreNameSpace: true,
        ignoreAttributes: false
    }
    const data = parser.parse(xmlText, options);
    const temperatureData =
        data.FeatureCollection.member[0]
            .PointTimeSeriesObservation.result.MeasurementTimeseries.point;

    const latest = temperatureData[temperatureData.length - 1];

    temptxt.textContent = `${latest.MeasurementTVP.value}`; 
	console.log(`${latest.MeasurementTVP.WeatherSymbol3}`); 
	currentTemp = `${latest.MeasurementTVP.value}`;
}
logdata(); // Log weather data
},600);	
};
getWeather(); // Load weather



// Weather icons
var snow = document.getElementById('snowflake');
var snowy = document.getElementById('snowy');
var cloudy = document.getElementById('cloudy');
var sunny = document.getElementById('sunny');
var thunder = document.getElementById('thunder');
var night = document.getElementById('night');
var rainy = document.getElementById('rainy');
var partlycloudy = document.getElementById('partlycloudy');
var pouring = document.getElementById('pouring');


weather(snowy); // Set current weather icon



// Weather set function
function weather(weather){
clearicons();
setTimeout(function(){
weather.style.display = 'block';
},100);
currentweather = weather.id;
}


// Hide all weather icons
function clearicons(){
snow.style.display = 'none';	
snowy.style.display = 'none';	
cloudy.style.display = 'none';	
sunny.style.display = 'none';	
thunder.style.display = 'none';	
night.style.display = 'none';	
rainy.style.display = 'none';	
partlycloudy.style.display = 'none';	
pouring.style.display = 'none';	
}


