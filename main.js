document.addEventListener('DOMContentLoaded', function() {
    const weatherForm = document.getElementById('weatherForm');
    const temperatureDiv = document.getElementById('temperature');
    const windDiv = document.getElementById('wind');
    const descriptionDiv = document.getElementById('description');
    weatherForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const cityInput = document.getElementById('cityInput');
        const city = cityInput.value.trim();
        if (city) {
            await fetchWeather(city);
        } else {
            displayErrorMessage('Please enter a city name.');
        }
    });
    async function fetchWeather(city) {
        const url = `https://goweather.herokuapp.com/weather/${city}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            updateWeatherInfo(data);
        } catch (error) {
            console.error('Error fetching weather:', error);
            displayErrorMessage('Failed to fetch weather data. Please try again later.');
        }
    }
    function updateWeatherInfo(data) {
        temperatureDiv.textContent = `Temperature: ${data.temperature}`;
        windDiv.textContent = `Wind: ${data.wind}`;
        descriptionDiv.textContent = `Description: ${data.description}`;
    }
    function displayErrorMessage(message) {
        temperatureDiv.textContent = message;
        windDiv.textContent = '';
        descriptionDiv.textContent = '';
    }
});

