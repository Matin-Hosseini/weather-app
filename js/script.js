const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const errorMessege = document.querySelector(".error-messege");
const weatherContent = document.querySelector(".weather-content");
const currentDateElem = document.querySelector(".current-month");
const currentDayElem = document.querySelector(".current-day");
const cityName = document.querySelector(".city-name");
const temprature = document.querySelector(".temprature");
const weatherConditionElem = document.querySelector(".weather-condition");
const humidityElem = document.querySelector(".humidity");
const windElem = document.querySelector(".wind");
const weatherImage = document.querySelector(".weather-image img");
const minTempElem = document.querySelector(".min-temp");
const maxTempElem = document.querySelector(".max-temp");

//showing current day and current date
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDate = new Date();

let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let currentDay = currentDate.getDate();
const currentDayText = days[currentDate.getDay()];

let currentDateText = `${currentDay} ${months[currentMonth]} ${currentYear}`;

currentDateElem.innerHTML = currentDateText;
currentDayElem.innerHTML = currentDayText;

async function getWeather(userCity) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=b15b4d5a25062642af14e614356819bb&units=metric`
  );
  let data = await response.json();

  if (response.status === 404) {
    errorMessege.classList.remove("d-none");
    weatherContent.className = "weather-content d-none";
  } else {
    errorMessege.className = "weather-condition d-none text-danger";
    let country = data.sys.country;
    let city = data.name;
    let temp = data.main.temp;
    let weatherCondition = data.weather[0].main;
    let humidity = data.main.humidity;
    let windSpeed = data.wind.speed;

    let minTemp = data.main.temp_min;
    let maxTemp = data.main.temp_max;

    let WeatherImageName = null;

    if (weatherCondition === "Clouds") {
      WeatherImageName = "clouds.png";
    } else if (weatherCondition === "Rain") {
      WeatherImageName = "rain.png";
    } else if (weatherCondition === "Drizzle") {
      WeatherImageName = "drizzle.png";
    } else if (weatherCondition === "Mist") {
      WeatherImageName = "drizzle.png";
    } else if (weatherCondition === "Clear") {
      WeatherImageName = "clear-sky.png";
    }

    cityName.innerHTML = `${city}, ${country}`;
    weatherImage.src = `assets/imges/${WeatherImageName}`;
    temprature.innerHTML = `${Math.round(temp)}°C`;
    weatherConditionElem.innerHTML = weatherCondition;
    minTempElem.innerHTML = `${minTemp}°C`;
    maxTempElem.innerHTML = `${maxTemp}°C`;
    humidityElem.innerHTML = `${humidity}%`;
    windElem.innerHTML = `${windSpeed} km/h`;

    weatherContent.className = "weather-content d-flex flex-column flex-md-row";
  }

  let country = data.sys.country;
  let city = data.name;
  let temp = data.main.temp;
  let weatherCondition = data.weather[0].main;
  let humidity = data.main.humidity;
  let windSpeed = data.wind.speed;

  let minTemp = data.main.temp_min;
  let maxTemp = data.main.temp_max;

  let WeatherImageName = null;

  if (weatherCondition === "Clouds") {
    WeatherImageName = "clouds.png";
  } else if (weatherCondition === "Rain") {
    WeatherImageName = "rain.png";
  } else if (weatherCondition === "Drizzle") {
    WeatherImageName = "drizzle.png";
  } else if (weatherCondition === "Mist") {
    WeatherImageName = "drizzle.png";
  } else if (weatherCondition === "Clear") {
    WeatherImageName = "clear-sky.png";
  } else if (weatherCondition === "Thunderstorm") {
    WeatherImageName = "thunder.png";
  }

  cityName.innerHTML = `${city}, ${country}`;
  weatherImage.src = `assets/imges/${WeatherImageName}`;
  temprature.innerHTML = `${Math.round(temp)}°C`;
  weatherConditionElem.innerHTML = weatherCondition;
  minTempElem.innerHTML = `${Math.round(minTemp)}°C`;
  maxTempElem.innerHTML = `${Math.round(maxTemp)}°C`;
  humidityElem.innerHTML = `${humidity}%`;
  windElem.innerHTML = `${windSpeed} km/h`;

  weatherContent.classList.remove("d-none");
}

searchBtn.addEventListener("click", () => {
  getWeather(searchInput.value);
});
document.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    getWeather(searchInput.value);
    searchInput.value = "";
  }
});
