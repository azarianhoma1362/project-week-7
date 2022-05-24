function formatDate(timestamp) {
    let date = new Date (timestamp);
    let hours = date.getHours();
     if (hours <10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
       if (minutes <10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday" , "Monday" , "Tuesday" , "Wednsday" , "Thursday" , "Friday" , "Saturday"];
       let day = days[date.getDay()];
    return `${day} ${hours}:${minutes} `;
}
function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = [ "Sun" , "Mon" , "Tue", "Wed" , "Thu" , "Fri" , "Sat"]; 
 return days[day];
}
function displayforecast ( response){
    let forecast =  response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    
    forecast.forEach(function (forecastday , index) {
        if (index < 6) {
        forecastHTML =
         forecastHTML +
          ` 
              <div class="col-2">
                  <div class="weather-forecast-date">${formatDay(forecastday.dt)} </div>
                       <img src="http://openweathermap.org/img/wn/${forecastday.weather[0].icon}@2x.png" alt="" width="45"/>
                       <div class="weather-forecast-temperature">
                           <span class="weather-forecast-temperature-max"> ${ Math.round(forecastday.temp.max)}</span>
                           <span class=" weather-forecast-temperature-min">${Math.round(forecastday.temp.min)}</span>
                       </div>
                   </div>
                
          `; }}
          ) ;
    
          
          forecastHTML = forecastHTML+ `</div>`;
    forecastElement.innerHTML = forecastHTML;
    
}

function getforecast(coordinates) {
    
    let apiKey = "958c37267ad4d0560a6138a8d84e8ca7";
   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayforecast);
}
function displayTemperature(response) {
     let temperatureElement = document.querySelector ("#temperature");
     let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector ("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round (celsiusTemperature);
    cityElement.innerHTML= response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML =Math.round( response.data.wind.speed);
    dateElement.innerHTML = formatDate( response.data.dt *1000);
    iconElement.setAttribute ("src" , `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
    iconElement.setAttribute ("alt" , response.data.weather[0].description);
    console.log(response);

    getforecast (response.data.coord);
}


function search(city){
let apiKey = "958c37267ad4d0560a6138a8d84e8ca7";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get (apiUrl) .then(displayTemperature);

}


function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector ("#city-input");
    search (cityInputElement.value);

}
function displayfahrenheittemperature(event){
    event.preventDefault();
    celsiuslink.classList.remove("active");
    fahrenheitlink.classList.add ("active");
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = (celsiusTemperature * 9 ) / 5 +32;
    temperatureElement.innerHTML  = Math.round(fahrenheitTemperature);
}
function displaycelsiustemperature(event){
    event.preventDefault();
    celsiuslink.classList.add("active");
    fahrenheitlink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML  = Math.round(celsiusTemperature);

}

let celsiusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit" , handleSubmit);

let fahrenheitlink = document.querySelector ("#fahrenheit-link");
fahrenheitlink.addEventListener("click" , displayfahrenheittemperature);

let celsiuslink = document.querySelector ("#celsius-link");
celsiuslink.addEventListener("click" , displaycelsiustemperature);

search("New York");

