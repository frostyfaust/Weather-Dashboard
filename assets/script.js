//global variables
var searchBtnEl = document.querySelector("#search-btn");
var cityNameRetriever = document.querySelector("#newCity");
var searchHistoryButtons = document.querySelector("#history");
var clearHistoryEl = document.querySelector("#clear-history");
var cityNameEl = document.querySelector("#cityName");
var newPicEl = document.querySelector("#tempPic");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var days = document.querySelectorAll(".days");
var icons = document.querySelectorAll(".icon");
var temps = document.querySelectorAll(".temp");
var winds = document.querySelectorAll(".wind");
var humiditys = document.querySelectorAll(".humidity");
var forecastEl = document.querySelector("#none");
var searchHistory = [];

//openweather API key
var weatherAPIkey = "a861eeacfb88dac49a4546b73847a560";

function startPage() {
  //retrieves 5 day forcast data
  function getFiveData(data) {
    for (x = 0; x < days.length; x++) {
      var weatherIndex = x * 8 + 4;
      var weatherDate = new Date(data.list[weatherIndex].dt_txt);
      days[x].textContent =
        "(" +
        (weatherDate.getMonth() + 1) +
        "/" +
        (weatherDate.getDate() + 1)+
        "/" +
        weatherDate.getFullYear() +
        ")";
      var weatherImg = data.list[weatherIndex].weather[0].icon;
      var picURL =
        "https://openweathermap.org/img/wn/" + weatherImg + "@2x.png";
      var picAlt = data.list[weatherIndex].weather[0].description;
      var fahrenheit = Math.round(
        (parseFloat(data.list[weatherIndex].main.temp) - 273.15) * 1.8 + 32
      );
      var windSpeed = data.list[weatherIndex].wind.speed;
      var humidNum = data.list[weatherIndex].main.humidity;
      icons[x].setAttribute("src", picURL);
      icons[x].setAttribute("alt", picAlt);
      temps[x].textContent = "Temperature: " + fahrenheit + "°F";
      winds[x].textContent = "Wind Speed: " + windSpeed + " MPH";
      humiditys[x].textContent = "Humidity: " + humidNum + "%";
    }
  }

  // retrieves current weather of named location
  function getTodayData(data) {
    var weatherDate = new Date(data.dt * 1000);
        cityNameEl.textContent = data.name + 
        " (" +
        (weatherDate.getMonth() + 1) +
        "/" +
        weatherDate.getDate() +
        "/" +
        weatherDate.getFullYear() +
        ")";
    var picURL =
      "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    newPicEl.setAttribute("src", picURL);
    newPicEl.setAttribute("alt", data.weather[0].description);
    var fahrenheit = Math.round(
      (parseFloat(data.main.temp) - 273.15) * 1.8 + 32
    );
    tempEl.textContent = "Temperature: " + fahrenheit + "°F";
    windEl.textContent = "Wind Speed: " + data.wind.speed + " MPH";
    humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
  }

  // grabs data through functions to render current weather & 5 day forcast
  function GrabLocalWeather(city) {
    var citySearch =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      weatherAPIkey;
    fetch(citySearch)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        getFiveData(data);
      })
      .catch(function () {
        //catch errors
      });

    var currentWeatherSearch =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      weatherAPIkey;

    fetch(currentWeatherSearch)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        getTodayData(data);
      });
  }

  //button listener to render page and info upon submit
  searchBtnEl.addEventListener("click", function () {
    var city = cityNameRetriever.value.trim();
    GrabLocalWeather(city);
    forecastEl.classList.remove("d-none");
    //creates button for previous searches
    if (!searchHistory.includes(city)) {
      searchHistory.push(city);
      var newButton = document.createElement("button");
      newButton.classList.add("btn", "btn-primary", "old");
      newButton.type = "button";
      newButton.textContent = city;
      searchHistoryButtons.append(newButton);
    }
    localStorage.setItem("city", JSON.stringify(searchHistory));
  });

  // renders data on click of button from search history
  $(document).on("click", ".old", function () {
    var searchName = $(this).text();
    GrabLocalWeather(searchName);
  });
}

startPage();
