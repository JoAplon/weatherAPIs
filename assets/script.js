const apiKey = '1d59d123b21d759ac3f9305f57e76274';
const forecast = document.querySelector('.forecast-row');
const searchCity = document.querySelector('.searchCity');
const forecastContainer = document.querySelector('.forecast-row');

// function getFiveDayForecast(city) {
//     fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=1d59d123b21d759ac3f9305f57e76274&units=imperial")
//         .then(function (response) {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok!');
//             }
//             return response.json();
//         })
//         .then(function (data) {

//         });
// }


function weatherStats(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1d59d123b21d759ac3f9305f57e76274&units=imperial")
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network not responding');
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            const weatherBox = document.querySelector('.weatherBox')
            weatherBox.innerHTML = '';

            const createCard = document.createElement('div');
            createCard.classList.add('todaysWeather');

            const createHeader = document.createElement('h2');
            createHeader.textContent = city;

            const createP1 = document.createElement('p');
            createP1.textContent = "Current Weather: " + data.weather[0].main;

            const createP2 = document.createElement('p');
            createP2.textContent = "The temperature is: " + data.main.temp + "°F";

            const createP3 = document.createElement('p');
            createP3.textContent = "It Feels Like: " + data.main.feels_like + "°F";

            const createP4 = document.createElement('p');
            createP4.textContent = "Min Temp: " + data.main.temp_min + "°F";

            const createP5 = document.createElement('p');
            createP5.textContent = "Max Temp: " + data.main.temp_max + "°F";

            const createP6 = document.createElement('p');
            createP6.textContent = "Humidity: " + data.main.humidity + "%";

            createCard.appendChild(createHeader);
            createCard.appendChild(createP1);
            createCard.appendChild(createP2);
            createCard.appendChild(createP3);
            createCard.appendChild(createP4);
            createCard.appendChild(createP5);
            createCard.appendChild(createP6);

            weatherBox.appendChild(createCard);

        })
        .catch(function (error) {
            console.error('There was an issue with the fetch.', error);
        });
}
// weatherStats(city);


function searchWeather() {
    const cityInput = document.querySelector('.searchCity input')
    const city = cityInput.value.trim();

    if (city) {
        weatherStats(city);
    } else {
        console.error('Please enter a city name');
    }
}