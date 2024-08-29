document.getElementById('getWeather').addEventListener('click', fetchWeather);

function fetchWeather() {
    const city = document.getElementById('cityInput').value.trim();


    console.log(city);
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2df1c7f5de7ed1d8247d05b07f4078e1&units=metric`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found: ${response.statusText}`);


            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            displayError(error.message);
        });
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weatherResult');
    const errorContainer = document.getElementById('error');

    weatherContainer.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;

    errorContainer.innerHTML = ''; // Clear any previous error
}

function displayError(errorMessage) {
    const errorContainer = document.getElementById('error');
    const weatherContainer = document.getElementById('weatherResult');

    errorContainer.innerHTML = `Error: ${errorMessage}`;
    weatherContainer.innerHTML = ''; // Clear any previous weather data
}
