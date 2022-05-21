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