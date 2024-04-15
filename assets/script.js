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
            forecastContainer.innerHTML = '';

            weatherBox.appendChild(createElement);


            const createCard = document.createElement('div');
            createCard.classList.add('todaysWeather');

            const createHeader = document.createElement('h2');
            createHeader.textContent = city;

            const createP1 = document.createElement('p');
            createP1.textContent = "<strong><br> Current Weather: </strong>" + data.weather[0].main;

            const createP2 = document.createElement('p');
            createP2.textContent = "<strong><br>The temperature is: </strong>" + data.main.temp;

            const createP3 = document.createElement('p');
            createP3.textContent = "<strong><br>Min Temp: </strong>" + data.main.temp_min;

            const createP4 = document.createElement('p');
            createP4.textContent = "<strong><br>Max Temp: </strong>" + data.main.temp_max;

            // const createP5 = document.createElement('p');
            // createP5.textContent = ;



            createCard.appendChild(createHeader);
            createCard.appendChild(createP1);
            createCard.appendChild(createP2);
            createCard.appendChild(createP3);
            createCard.appendChild(createP4);
            // createCard.appendChild(createP5);

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