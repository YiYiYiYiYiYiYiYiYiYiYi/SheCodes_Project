let time = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let currentDate = time.getDate();
let currentDay = days[time.getDay()];
let currentMonth = months[time.getMonth()];
let currentHour = time.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = time.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let dateInfo = document.querySelector(".dateInfo");
dateInfo.innerHTML = `${currentDay}, ${currentDate} ${currentMonth}`;

let timeInfo = document.querySelector("#update-time");
timeInfo.innerHTML = `${currentHour}:${currentMinute} `;

function showCity(response) {
  document.querySelector(".city").innerHTML = response.data.name;
}

function showTemperature(response) {
  let temp = document.querySelector("#temp");
  let updateT = Math.round(response.data.main.temp);
  temp.innerHTML = updateT;
}

function showHumidity(response) {
  let weather = document.querySelector(".humidity");
  weather.innerHTML = `Humidity: ${response.data.main.humidity}%`;
}

function showWind(response) {
  let speed = document.querySelector(".wind");
  let roundSpeed = Math.round(response.data.wind.speed);
  speed.innerHTML = `Wind: ${roundSpeed} km/h`;
}

function showDescription(response) {
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function updateCity(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#enterCity");
  let urlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(urlSearch).then(showCity);
  axios.get(urlSearch).then(showTemperature);
  axios.get(urlSearch).then(showHumidity);
  axios.get(urlSearch).then(showWind);
  axios.get(urlSearch).then(showDescription);
}
let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", updateCity);

function updateCelcius(event) {
  event.preventDefault();
  let celciusUpdate = document.querySelector(".temperature-update");
  celciusUpdate.innerHTML = updateT;
}
function updateFahrenheit(event) {
  event.preventDefault();
  let fahrenheitUpdate = document.querySelector(".temperature-update");
  fahrenheitUpdate.innerHTML = `(${updateT} * 9/5) + 32`;
}
let celcius = document.querySelector("#celsius-link");
let fahrenheit = document.querySelector("#fahrenheit-link");
celcius.addEventListener("click", updateCelcius);
fahrenheit.addEventListener("click", updateFahrenheit);

let apiKey = "17881ef8c7b51a3f397dbb41040ad179";

function updateWeather(response) {
  let cityUpdate = document.querySelector(".city");
  cityUpdate.innerHTML = response.data.name;
  let temp = document.querySelector("#temp");
  let updateT = Math.round(response.data.main.temp);
  temp.innerHTML = updateT;
  let weather = document.querySelector(".humidity");
  weather.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let speed = document.querySelector(".wind");
  let roundSpeed = Math.round(response.data.wind.speed);
  speed.innerHTML = `Wind: ${roundSpeed} km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function currentPosition(position) {
  navigator.geolocation.getCurrentPosition(currentPosition);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "17881ef8c7b51a3f397dbb41040ad179";
  let urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(urlCurrent).then(updateWeather);
}
let currentCity = document.querySelector("#current");
currentCity.addEventListener("click", currentPosition);
