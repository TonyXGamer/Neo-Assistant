
const clockElement = document.getElementById("clock");
const networkStatus = document.getElementById("network-status");
const neoStatus = document.getElementById("neo-status");
const batteryStatus = document.getElementById("battery-status");
const cpuStatus = document.getElementById("cpu-status");
const ramStatus = document.getElementById("ram-status");

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

    clockElement.textContent = hours + ":" + minutes + " " + period;
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
        })
        .catch(function(error){
            cpuStatus.textContent = "CPU: Unavailable";
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
        })
        .catch(function(error){
            ramStatus.textContent = "RAM: Unavailable";
            console.error(error);
        })
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


