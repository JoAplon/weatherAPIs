const apiKey = '1d59d123b21d759ac3f9305f57e76274';
const forecast = document.querySelector('.forecast-row');
const searchCity = document.querySelector('.searchCity');
const city = 'Ukiah';

function weatherStats (city){
    const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    fetch (queryUrl)
    .then(function(response){
        if(!response.ok) {
            throw new Error('Network not responding');
        }
        return response.json();
    })
    .then(function(data){
        console.log(data);
        forecast.innerHTML = JSON.stringify(data);
    })
    .catch(function(error) {
        console.error('There was an issue with the fetch.', error);
    })
}
weatherStats(city);


function searchWeather() {
    const city = searchCityInput.value.trim();
    if (city) {
        weatherStats(city);
    } else {
        console.error('Please enter a city name');
    }
}