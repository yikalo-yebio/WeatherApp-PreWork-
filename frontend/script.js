let cityTxtFld = document.getElementById("city-txtfld");
let searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", fetchData);

async function fetchData() {
    
    const cityName = cityTxtFld.ariaValueMax.trim();

    if (!cityName) {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(`/weather?city=${cityName}`);
        const data = await response.json();
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}