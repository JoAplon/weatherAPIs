const apiKey = '1d59d123b21d759ac3f9305f57e76274';
const forecast = document.querySelector('.forecast-row');
const searchCity = document.querySelector('.searchCity');
const forecastContainer = document.querySelector('.forecast-row');

function weatherStats (){
    const queryUrl = `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
    
    fetch (queryUrl)
    .then(function(response){
        if(!response.ok) {
            throw new Error('Network not responding');
        }
        return response.json();
    })
    .then(function(data){
        console.log(data);
        forecastContainer.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const dayData = data.list[i * 8];
            
            const createElement = document.createElement('p');
            createElement.innerHTML = '<strong><br>City Name: </strong>' + city +
            '<strong><br> Current Weather: </strong>' + dayData.weather[0].main + '<strong><br>The temperature is: </strong>' +
            dayData.main.temp + '<strong><br>Min Temp: </strong>' + dayData.main.temp_min + '<strong><br>Max Temp: </strong>' + dayData.main.temp_max;
            
            forecastContainer.appendChild(createElement);
            // forecast.innerHTML = JSON.stringify(data);
        }
    })
    .catch(function(error) {
        console.error('There was an issue with the fetch.', error);
    })
}
weatherStats();


function searchWeather() {
    const city = searchCity.value.trim();
    if (city) {
        weatherStats(city);
    } else {
        console.error('Please enter a city name');
    }
}