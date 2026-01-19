let cityTxtFld = document.getElementById("city-txtfld");
let searchBtn = document.getElementById("search-btn");
let showCity = document.getElementById("show-city");
let showTime = document.getElementById("show-time");
let windSpeed = document.getElementById("wind-speed");
let windDirection = document.getElementById("wind-direction");
let humidity = document.getElementById("humidity");
let tempIncel = document.getElementById("temp-in-cel");
let descriptionJs = document.getElementById("description");
let iconImg = document.getElementById("icon-img");

searchBtn.addEventListener("click", fetchData);

async function fetchData() {
    const cityName = cityTxtFld.value.trim();
    if (!cityName) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`/weather?city=${cityName}`);
        const data = await response.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        const tempInCelsius = kelvinToCelsius(data.main.temp);
        tempIncel.innerHTML = tempInCelsius;

      
        showCity.innerHTML = data.name;

        windSpeed.innerHTML = data.wind.speed ?? "N/A";
        windDirection.innerHTML = data.wind.deg ?? "N/A";
        humidity.innerHTML = data.main.humidity ?? "N/A";


        descriptionJs.innerHTML = data.weather[0].description;
        iconImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      
        const localDate = new Date(Date.now() + data.timezone * 1000);
        const hours = localDate.getUTCHours().toString().padStart(2, "0");
        const minutes = localDate.getUTCMinutes().toString().padStart(2, "0");
        const seconds = localDate.getUTCSeconds().toString().padStart(2, "0");
        showTime.innerHTML = `${hours}:${minutes}:${seconds}`;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data.");
    }
}

function kelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(2);
}
