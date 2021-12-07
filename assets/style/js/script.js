var temperature = document.getElementById("temperature");
var windSpeed = document.getElementById("windSpeed");
var gif = document.getElementById("gif");
var searchBtn = document.getElementById("search-button");
var formInput = document.querySelector(".form-input");
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
      displayWeather(data);
      getGif(data);
      // getOneCall(data.coord.lat , data.coord.lon);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// function getOneCall(lat, lon) {
//   var url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=538ed13f02e5d219c8e772c473392370&units=imperial`;

//   fetch(url)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data)
//       displayWeather(data)
//       console.log("!!!")
//     })
//     .catch(function (error) {
//       console.log(error)
//     });
//   ;
// }

function getGif(data) {
  // ZBs9xcD98EoukIlisPrNM7Uus5JLHOHH

  var url = `https://api.giphy.com/v1/gifs/search?q=${data.weather[0].main.toLowerCase()}&rating=pg&limit=5&api_key=ZBs9xcD98EoukIlisPrNM7Uus5JLHOHH`;
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
  temp.textContent = `${data.main.temp}`;
  // console.log(data.current.temp)
  temperature.appendChild(temp);

  var wind = document.createElement("h2");
  wind.textContent = `${data.wind.speed}`;
  windSpeed.appendChild(wind);
}

function displayGif(data) {
  var createImage = document.createElement("img");
  var randomGif = data.data[Math.floor(Math.random() * data.data.length)];
  createImage.src = randomGif.images.original.url;
  gif.appendChild(createImage);
}

searchBtn.addEventListener("click", getLocation);
