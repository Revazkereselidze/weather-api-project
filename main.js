async function getWeather() {
    const cityName = document.getElementById('cityInput').value;
    const apiKey = 'a4a124e50fb3663c6d39aff3a3734368'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather data not found');
        const data = await response.json();
        updateWeatherDisplay(data);
    } catch (error) {
        console.error(error);
        alert('Failed to fetch weather data');
    }
}

function mapWeatherToIcon(weatherCondition) {
    const iconMap = {
        'Clear': { class: 'fa-sun', colorClass: 'icon-clear' },
        'Clouds': { class: 'fa-cloud', colorClass: 'icon-clouds' },
        'Rain': { class: 'fa-cloud-rain', colorClass: 'icon-rain' },
        'Drizzle': { class: 'fa-cloud-rain', colorClass: 'icon-drizzle' },
        'Thunderstorm': { class: 'fa-bolt', colorClass: 'icon-thunderstorm' },
        'Snow': { class: 'fa-snowflake', colorClass: 'icon-snow' },
        'Mist': { class: 'fa-smog', colorClass: 'icon-mist' },
        'Smoke': { class: 'fa-smog', colorClass: 'icon-smoke' },
        'Haze': { class: 'fa-smog', colorClass: 'icon-haze' },
        'Dust': { class: 'fa-smog', colorClass: 'icon-dust' },
        'Fog': { class: 'fa-smog', colorClass: 'icon-fog' },
        'Sand': { class: 'fa-smog', colorClass: 'icon-sand' },
        'Ash': { class: 'fa-smog', colorClass: 'icon-ash' },
        'Squall': { class: 'fa-wind', colorClass: 'icon-squall' },
        'Tornado': { class: 'fa-poo-storm', colorClass: 'icon-tornado' }
    };
    return iconMap[weatherCondition] || { class: 'fa-smog', colorClass: 'icon-default' };
}

function updateWeatherDisplay(weatherData) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.innerHTML = ''; 

    const { class: iconClass, colorClass } = mapWeatherToIcon(weatherData.weather[0].main);

    
    const iconElement = document.createElement('i');
    iconElement.className = `fas ${iconClass} weather-icon ${colorClass}`;
    weatherDisplay.appendChild(iconElement);

    
    const details = `
        <p>Temperature: ${weatherData.main.temp.toFixed(1)}°C</p>
        <p>Condition: ${weatherData.weather[0].description}</p>
        <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
    `;
    weatherDisplay.insertAdjacentHTML('beforeend', details);
}

document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});