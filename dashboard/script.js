
const clockElement = document.getElementById("clock");
const networkStatus = document.getElementById("network-status");
const neoStatus = document.getElementById("neo-status");
const batteryStatus = document.getElementById("battery-status");
const cpuStatus = document.getElementById("cpu-status");
const ramStatus = document.getElementById("ram-status");
const cpuFill = document.getElementById("cpu-fill");
const ramFill = document.getElementById("ram-fill");
const weatherTemp = document.getElementById("weather-temp");
const weatherCondition = document.getElementById("weather-condition");
const forecastContainer = document.getElementById("forecast-container");
const dateElement = document.getElementById("date");

console.log(forecastContainer);

function setNeoStatus(status){
    neoStatus.textContent = "NEO: " + status;
}

function updateNetworkStatus(){
    const isOnline = navigator.onLine;

    if(isOnline === true){
        networkStatus.textContent = "Network: Connected";
    } else {
        networkStatus.textContent = "Network: Offline";
    }
}

function updateClock(){
    const now = new Date();

    let hours = now.getHours();

    let minutes = now.getMinutes();

    let period;

    if(hours >= 12){
        period = "PM";
    }else{
        period = "AM";
    }

    if(hours > 12){
        hours -= 12;
    }

    if(hours === 0){
        hours = 12;
    }

    if(minutes < 10){
        minutes = "0" + minutes;
    }

    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    }

    clockElement.textContent = hours + ":" + minutes + " " + period;
    dateElement.textContent = now.toLocaleDateString("en-US", options);

}

function updateBatteryStatus(battery){
    const batteryLevel = Math.round(battery.level * 100);
    batteryStatus.textContent = "Battery: " + batteryLevel + "%";
}

function setupBattery(battery){
    updateBatteryStatus(battery);
    battery.addEventListener("levelchange", function(){
        updateBatteryStatus(battery);
    });
}

function updateCpuUsage(){
    //Fetching the CPU usage from Python
    fetch("http://localhost:5000/cpu")
        .then(function(response){
            if(response.ok === false){
                throw new Error("HTTP request failed");
            }
            return response.json();
        })
        .then(function(data){
            cpuStatus.textContent = "CPU: " + data.cpu + "%";
            cpuFill.style.width = data.cpu + "%";
        })
        .catch(function(error){
            cpuStatus.textContent = "CPU: Unavailable";
            cpuFill.style.width = 0 + "%";
        })
}

function updateRamUsage(){
    fetch("http://localhost:5000/ram")
        .then(function(response){
            if(response.ok === false){
                throw new Error("Http request failed");
            }
            return response.json();
        })
        .then(function(data){
            ramStatus.textContent = "RAM: " + data.ram + "%";
            ramFill.style.width = data.ram + "%";
        })
        .catch(function(error){
            ramStatus.textContent = "RAM: Unavailable";
            ramFill.style.width = 0 + "%";
            console.error(error);
        })
}

function getWeatherDescription(code){
    const weatherCodes = {
        0: "Clear Sky",
        1: "Mainly Clear",
        2: "Partly Cloudy",
        3: "Overcast",
        45: "Fog",
        61: "Slight Rain",
        63: "Moderate Rain",
        65: "Heavy Rain",
        71: "Slight Snowfall",
        73: "Moderate Snowfall",
        75: "Heavy Snowfall",
        95: "Thunderstorm"
    };
    return weatherCodes[code] ?? "Unknown";
}

function updateWeather(){
    fetch("https://api.open-meteo.com/v1/forecast?latitude=41.20426&longitude=-73.72708&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America%2FNew_York")
        .then(function(response){
            if(response.ok === false){
                throw new Error("Http request failed");
            }
            return response.json();
        })
        .then(function(data){
            console.log(data);
            weatherTemp.textContent = "Temperature: " + data.current.temperature_2m + "°F";
            weatherCondition.textContent = "Conditions: " + getWeatherDescription(data.current.weather_code);
        })
        .catch(function(error){
            console.error(error);
        })
}

function updateForecast(){
    const forecastURL = "https://api.open-meteo.com/v1/forecast?latitude=41.20426&longitude=-73.72708&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=7";
    fetch(forecastURL)
        .then(response => {
            if(!response.ok){
                throw new Error("Http request failed");
            }
            return response.json();
        })
        .then(data => {
            forecastContainer.textContent = "";
            for(let i = 0; i < data.daily.time.length; i++){
                const card = document.createElement("div");
                card.classList.add("forecast-card");
                card.textContent = data.daily.time[i] + ": High " + data.daily.temperature_2m_max[i] + "°F";
                forecastContainer.appendChild(card);
            }
        })
    console.log("Updating seven-day forecast...");
}

// Main Code
updateClock();
updateNetworkStatus();
setInterval(updateClock, 1000);

window.addEventListener("online", updateNetworkStatus);
window.addEventListener("offline", updateNetworkStatus);

setNeoStatus("ONLINE");

navigator.getBattery().then(setupBattery);

updateCpuUsage();
setInterval(updateCpuUsage, 2000);

updateRamUsage()
setInterval(updateRamUsage, 2000);

updateWeather();
updateForecast();


