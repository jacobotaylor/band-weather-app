var temperature = document.getElementById("temperature");
var windSpeed = document.getElementById("windSpeed");
var cityName = document.getElementById("city-name");
var gif = document.getElementById("gif-weather");

var searchBtn = document.getElementById("search-button");
var formInput = document.querySelector(".form-input");


function getLocation(event) {
  event.preventDefault();
  var searchCity = formInput.value.trim();
  console.log(searchCity);

  var url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=538ed13f02e5d219c8e772c473392370&units=imperial`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayWeather(data);
      getGif(data);
      // getOneCall(data.coord.lat , data.coord.lon);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getGif(data) {
  // ZBs9xcD98EoukIlisPrNM7Uus5JLHOHH

  var url = `https://api.giphy.com/v1/gifs/search?q=${data.weather[0].main.toLowerCase()}&rating=pg&limit=50&api_key=ZBs9xcD98EoukIlisPrNM7Uus5JLHOHH`;
  console.log(url);

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayGif(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function displayWeather(data) {
  var temp = document.createElement("h2");
  temperature.innerHTML = "";
  temp.textContent = `${data.main.temp}`;
  // console.log(data.current.temp)
  temperature.appendChild(temp);

  var wind = document.createElement("h2");
  windSpeed.innerHTML = "";
  wind.textContent = `${data.wind.speed}`;
  windSpeed.appendChild(wind);

}

function displayGif(data) {
  var createImage = document.createElement("img");
  var randomGif = data.data[Math.floor(Math.random() * data.data.length)];
  gif.innerHTML = "";
  createImage.src = randomGif.images.original.url;
  gif.appendChild(createImage);
}

searchBtn.addEventListener("click", getLocation);

