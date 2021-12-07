// var searchFormEl = document.querySelector('#search-form');

// function handleSearchFormSumbit(event) {
//     event.preventDefault();

//     var searchInputVal = document.querySelector('#search-input').val();
//     var formatInputVal = document.querySelector('#format-input').val();

//     if (!searchInputVal) {
//         console.error("Man you're too cool! We don't know this band!")
//         return;
//     }

//     var queryString = './results.html' + searchInputVal + '&format=' + formatInputVal;

//     location.assign(queryString);
// }

// searchFormEl.addEventListener('click' , handleSearchFormSumbit);
// // searchFormEl.addEventListener('sumbit' , handleSearchFormSumbit);
var weather = document.getElementById("results");
var searchBtn = document.getElementById("search-button");
var formInput = document.querySelector(".form-input");

function getLocation(event) {
  event.preventDefault();
  var searchCity = formInput.value.trim();
  console.log(searchCity);

  var url = `http://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=538ed13f02e5d219c8e772c473392370&units=imperial`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      getOneCall(data.coord.lat, data.coord.lon);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getOneCall(lat, lon) {
  var url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=538ed13f02e5d219c8e772c473392370&units=imperial`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayWeather(data);
      console.log("!!!");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function displayWeather(data) {
  var temp = document.createElement("h2");
  var wind = document.createElement("h2");
  var clouds = document.createElement("h2");

  temp.textContent = ("Temp: " + `${data.current.temp}`);
  wind.textContent = ("Wind: " + `${data.current.wind_speed}`);
  clouds.textContent = `${data.current.clouds}`;
  console.log(data.current.temp);
  weather.appendChild(temp);
  weather.appendChild(wind);
  weather.appendChild(clouds);
}

// function getGiphy() {
//   var url = ``
// }

searchBtn.addEventListener("click", getLocation);
