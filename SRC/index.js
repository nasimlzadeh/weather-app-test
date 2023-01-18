let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function changeInfo(event) {
  event.preventDefault();
  let now = new Date();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let day = now.getDay();
  let todayTime = document.querySelector("#time");
  console.log(todayTime);
  todayTime.innerHTML = `${days[day]}  ${hour}:${minute}`;
}
function cityInfo(event) {
  let city = document.querySelector("#fav-city").value;
  console.log(city);
  let newCity = document.querySelector("#currentCity");
  console.log(newCity);
  newCity.innerHTML = city;
  let apiKey = "d44a337dcba067ff8eff53da085f3633";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showInfo);
}
function showInfo(response) {
  console.log(response);
  console.log(response.data.wind.speed);
  console.log(response.data.main.humidity);
  console.log(response.data.weather[0].main);
  let currentDeg = document.querySelector("#degree");
  currentDeg.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  let weather = document.querySelector("#weather");
  weather.innerHTML = `${response.data.weather[0].main}`;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  let wind = document.querySelector("#windy");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} Km/h`;
}
function getLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let newCity = document.querySelector("#currentCity");
  newCity.innerHTML = "tehran";
  let apiKey = "d44a337dcba067ff8eff53da085f3633";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showInfo);
}
function myPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let search = document.querySelector("#search");
search.addEventListener("click", changeInfo);
search.addEventListener("click", cityInfo);
// let celDeg = document.querySelector("#degree");
// celDeg.addEventListener("click", showCel);
let locate = document.querySelector("#locate");
locate.addEventListener("click", changeInfo);
locate.addEventListener("click", myPosition);
