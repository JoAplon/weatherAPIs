const apiKey = '1d59d123b21d759ac3f9305f57e76274';
const forecast = document.querySelector('.forecast');
const searchCity = document.querySelector('.searchCity');
const city = 'Ukiah';

function weatherStats (city){
    const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}$&appid=${apiKey}`;
    
    fetch (queryUrl)
    .then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
    })
}
weatherStats(city);
