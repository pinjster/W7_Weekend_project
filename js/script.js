// const cityUrl = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
// const zipUrl = "https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}";

function kelvinToFahrenheit(n){
    return Math.round((n - 273.15) * 9/5 + 32)
}

const cityZipForm = document.getElementById('city-zip-form');
let flash = document.getElementById('flash-msg');
let currTempDisplay = document.getElementById('curr-temp-display');
let highTempDisplay = document.getElementById('high-temp-display');
let lowTempDisplay = document.getElementById('low-temp-display');
let forecastDisplay = document.getElementById('forecast-display');
let humidityDisplay = document.getElementById('humidity-display');
let bg = document.getElementById("img-background");

cityZipForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    flash.innerText = "";
    let city = document.querySelector('#city-form').value;
    let zip = document.querySelector('#zip-form').value;
    if(city && zip){
        flash.innerText = `Results for: ${zip}`;
        await getWeather(zip, "c");
    }
    else if(city && !zip){
        flash.innerText = `Results for: ${city}`;
        await getWeather(city, "c");
    }
    else if(!city && zip){
        flash.innerText = `Results for: ${zip}`;
        await getWeather(zip, "z");
    }
    else{
        flash.innerText = "This city/zip code is unavailable";
    }
});

async function getWeather(i, k){
    let response;
    if(k === 'c'){
        response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${i}&appid=${apiKey}`);
    }
    else if(k === 'z'){
        response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${i}&appid=${apiKey}`);
    }
    if(response.ok){
        const data = await response.json();
        console.log(data);
        let currTemp = data.main.temp;
        let highTemp = data.main.temp_max;
        let lowTemp = data.main.temp_min;
        let forecast = data.weather[0].description;
        let humidity = data.main.humidity;
        displayWeatherInfo(currTemp, highTemp, lowTemp, forecast, humidity)
    }
    else{
        flash.innerText += " --Could not find City-- ";
        resetWeatherInfo();
    }
}

function getWeatherByZip(i){
    let response = fetch()
}

function displayWeatherInfo(currTemp, highTemp, lowTemp, forecast, humidity){
    currTempDisplay.innerText = `Current Temperature: ${kelvinToFahrenheit(currTemp)}${String.fromCharCode(176)} F`;
    highTempDisplay.innerText = `High Temperature: ${kelvinToFahrenheit(highTemp)}${String.fromCharCode(176)} F`;
    lowTempDisplay.innerText = `Low Temperature: ${kelvinToFahrenheit(lowTemp)}${String.fromCharCode(176)} F`;
    forecastDisplay.innerText = `Forecast: ${forecast}`;
    humidityDisplay.innerText = `Humidity: ${humidity}%`;
    updateBackground(forecast);
}

function resetWeatherInfo(){
    currTempDisplay.innerText = "";
    highTempDisplay.innerText = "";
    lowTempDisplay.innerText = "";
    forecastDisplay.innerText = "";
    humidityDisplay.innerText = "";
}

function updateBackground(f){
    if(f.includes('cloud') || f.includes("clouds")){
        bg.classList.toggle("cloudy-forecast");
    }
    else if(f.includes("sun") || f.includes('clear')){
        bg.classList.toggle("sunny-forecast");
    }
    else if(f.includes("thunder") || f.includes("storm")){
        bg.classList.toggle("thunderstorm-forecast")
    }
    else if(f.includes("rain") || f.includes("rainy")){
        bg.classList.toggle("rain-forecast")
    }
    else{
        bg.classList.toggle("default-forecast")
    }
}