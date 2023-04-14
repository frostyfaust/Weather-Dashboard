var searchBtnEl = document.querySelector("#search-btn");
var cityNameRetriever = document.querySelector("#newCity");
var clearHistoryEl = document.querySelector("#clear-history");
var todayDate = dayjs().format("MM/DD/YYYY");
var cityNameEl = document.querySelector("#cityName");
var newPicEl = document.querySelector("#tempPic");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var uvEl = document.querySelector("#uv");
var fiveDayContainerEl = document.querySelector("#fiveDayContainer");
// var calendar = require('dayjs/plugin/calendar');
// dayjs.extend(calendar);
var days= document.querySelectorAll(".days");
var icons = document.querySelectorAll(".icon");
var temps = document.querySelectorAll(".temp");
var winds = document.querySelectorAll(".wind");
var humiditys = document.querySelectorAll(".humidity");

var weatherAPIkey ="a861eeacfb88dac49a4546b73847a560";
function startPage (){

    function getFiveData(data){
            for(x=0; x<days.length; x++){
                var weatherIndex = ((x * 8) + 4);
                var weatherDate = new Date(data.list[weatherIndex].dt_txt);
                console.log(weatherDate);
                days[x].textContent = ("("+ (weatherDate.getMonth()+1) + "/" + weatherDate.getDate() + "/" + weatherDate.getFullYear() + ")");
                var weatherImg = data.list[weatherIndex].weather[0].icon;
                var picURL = "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png";
                var picAlt = data.list[weatherIndex].weather[0].description;
                var fahrenheit = Math.round(((parseFloat(data.list[weatherIndex].main.temp)-273.15)*1.8)+32);
                var windSpeed = data.list[weatherIndex].wind.speed;
                var humidNum = data.list[weatherIndex].main.humidity;
                icons[x].setAttribute("src", picURL);
                icons[x].setAttribute("alt", picAlt);
                temps[x].textContent = "Temperature: " + fahrenheit + "°F";
                winds[x].textContent = "Wind Speed: " + windSpeed + " MPH";
                humiditys[x].textContent = "Humidity: " + humidNum + "%";
            }   
    }

    function getTodayData (data){
        
    }


    function GrabLocalWeather (city) {
        var citySearch = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + weatherAPIkey;
        console.log(citySearch);
        fetch(citySearch)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            getFiveData(data);
        })
        .catch(function(){
            //catch errors
        })
    }

    searchBtnEl.addEventListener("click", function(){
        var city = cityNameRetriever.value.trim();
        GrabLocalWeather(city);
    })
   
}
startPage();
