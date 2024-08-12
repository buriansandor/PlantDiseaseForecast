const saveButton = document.getElementById('saveAPIKEY');
const apiKeyInput = document.getElementById('APIKEY');
const locationElement = document.getElementById('location');

var apiKey = "";

saveButton.addEventListener('click', function() {
    apiKey = apiKeyInput.value;   
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("OpenWeatherAPI", apiKey);
        saveButton.value = localStorage.getItem("OpenWeatherAPI");
    }

    console.log(apiKey);
});


var latitude = 0;
var longitude = 0;
let apiData;

locationElement.addEventListener('click', function() {
    if(apiKey == ""){
        if (typeof(Storage) !== "undefined") {
            apiKey = localStorage.getItem("OpenWeatherAPI");
        } else {
            if(apiKey == ""){
                alert("The Open weather API key is not set! Set it in settings panel!");
            }
        }
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                //console.log("lat: " + latitude + ", long: " + longitude);
                document.getElementById("place").innerHTML = "lat: " + latitude + ", long: " + longitude;
                getWeather();
            });
        } else {
            alert("The browser does not support geolocation!");
        }
    }
});

// API call
function getWeather(){
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        apiData = data;
        console.log(apiData);
        refreshUI();
        estimateDiseases();
    })
    .catch(error => {
        console.error('Hiba történt a hívás során:', error);
    });
}

var currentDate = new Date();
var currentMonth = currentDate.getMonth() + 1;
var currentDay = currentDate.getDate();

function refreshUI(){
    while (!apiData){
        setTimeout(function() {
            console.log(".");
        }, 1500);
    }
    document.getElementById("timezonetitle").innerHTML = apiData["timezone"];

    if(apiData["alerts"].length >0) {
        document.getElementById("weatheralerts").innerHTML = '<div class="callout alert"> <h5>⚠ ' + apiData["alerts"][0]["description"] + " </h5> <p>" + apiData["alerts"][0]["event"]  + " by " + apiData["alerts"][0]["sender_name"] + "</p></div>";
    }
}

function getMonthNumber(monthName) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthNumber = monthNames.indexOf(monthName) + 1;
    return monthNumber;
}

function kelvinToCelsius(kelvin) {
   var celsius = kelvin - 273.15;
    return celsius;
}

function calculateRelativeHumidity(dewpoint, temperature) {
    const relativeHumidity = 100 * (Math.exp((17.625 * dewpoint) / (243.04 + dewpoint)) / Math.exp((17.625 * temperature) / (243.04 + temperature)));
    return relativeHumidity;
} 

function estimateDiseases(){
    for (let dayIdx = 0; dayIdx < apiData["daily"].length-1; dayIdx++) {
        const dayTemp = apiData["daily"][dayIdx];
        console.log("dew_point: " + dayTemp["dew_point"] + " humidity: " + dayTemp["humidity"] + " pressure: " + dayTemp["pressure"] + "temp min: " + dayTemp["temp"]["min"] + " temp max: " + dayTemp["temp"]["max"]);
        
        innerhtmlDiseases = "";
        fruits = [apple, apricot, cherry, grape, peach, pear];
        fruitemoji = ["🍎", "🍊", "🍒", "🍇", "🍑", "🍐"];

        for (let frIdx = 0; frIdx < fruits.length; frIdx++) {
            const fruit = fruits[frIdx];
            for (let fruitIdx = 0; fruitIdx < fruit["diseases"].length; fruitIdx++) {
                const disease = fruit["diseases"][fruitIdx];
                if((getMonthNumber(disease["weather_conditions"]["active"]["start_month"]) <= currentMonth) && (getMonthNumber(disease["weather_conditions"]["active"]["end_month"]) >= currentMonth)){

                    if(disease["weather_conditions"]["humidity"]["max"] >= dayTemp["humidity"]){
                        if((disease["weather_conditions"]["relative_dewpoint"]["min"] <= kelvinToCelsius(dayTemp["dew_point"])) && disease["weather_conditions"]["relative_dewpoint"]["max"] >= kelvinToCelsius(dayTemp["dew_point"])){
                            if((disease["weather_conditions"]["temperature"]["min"] <= kelvinToCelsius(dayTemp["temp"]["min"])) && disease["weather_conditions"]["temperature"]["max"] >= kelvinToCelsius(dayTemp["temp"]["min"]) ){
                                innerhtmlDiseases += fruitemoji[frIdx] + ' <a href="'+disease["wikipedia_link"]+'">'+disease["name"]+ '</a> <br>'
                                console.log(disease["name"]);
                                //console.log(disease["weather_conditions"]["temperature"]["min"]);
                                //console.log(kelvinToCelsius(dayTemp["temp"]["min"]));
                                //console.log(disease["weather_conditions"]["temperature"]["max"]); 
                                //console.log(kelvinToCelsius(dayTemp["temp"]["max"]));

                                //
                                //console.log(disease["weather_conditions"]["relative_dewpoint"]["min"]);
                                //console.log(kelvinToCelsius(dayTemp["dew_point"]));
                                //console.log(disease["weather_conditions"]["relative_dewpoint"]["max"]);
                                //console.log(disease["weather_conditions"]["humidity"]["min"]);
                                //console.log(dayTemp["humidity"]);
                                //console.log(disease["weather_conditions"]["humidity"]["max"]);
                            }
                            
                        }
                            
                    }

                }
            }
        }
        document.getElementById(dayIdx).innerHTML = innerhtmlDiseases;
    }
}