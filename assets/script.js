
    const apiKey = '1d59d123b21d759ac3f9305f57e76274';
    const searchCity = document.querySelector('.searchCity');
    const forecastContainer = document.querySelector('.weatherBox');
    const forecastDays = document.querySelector('.forecastDays');


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

                const weatherDescription = data.weather[0].description;
                let icon = '';

                if (weatherDescription) {
                    if (weatherDescription.includes('clear sky')) {
                        icon = '☀️';
                    } else if (weatherDescription.includes('few clouds')) {
                        icon = '⛅️';
                    } else if (weatherDescription.includes('overcast clouds') || weatherDescription.includes('broken clouds')) {
                        icon = '☁️';
                    } else if (weatherDescription.includes('rain') || weatherDescription.includes('shower rain')) {
                        icon = '🌧️';
                    } else if (weatherDescription.includes('thunderstorm')) {
                        icon = '⛈️';
                    } else if (weatherDescription.includes('snow')) {
                        icon = '❄️';
                    } else if (weatherDescription.includes('mist')) {
                        icon = '🌫️';
                    }
                }

                const weatherBox = document.querySelector('.weatherBox')
                weatherBox.innerHTML = '';

                const cityContainer = document.createElement('div');
                cityContainer.classList.add('cityContainer');

                const createHeader = document.createElement('h2');
                createHeader.textContent = city;

                const iconElement = document.createElement('span');
                iconElement.textContent = icon;

                cityContainer.appendChild(createHeader);
                cityContainer.appendChild(iconElement);

                const createCard = document.createElement('div');
                createCard.classList.add('todaysWeather');

                const createP1 = document.createElement('p');
                createP1.textContent = "Current Weather: " + data.weather[0].description;

                const createP2 = document.createElement('p');
                createP2.textContent = "The temperature is: " + data.main.temp + "°F";

                const createP3 = document.createElement('p');
                createP3.textContent = "Wind Speed: " + data.wind.speed + " MPH";

                const createP4 = document.createElement('p');
                createP4.textContent = "Humidity: " + data.main.humidity + "%";

                createCard.appendChild(cityContainer);
                createCard.appendChild(createP1);
                createCard.appendChild(createP2);
                createCard.appendChild(createP3);
                createCard.appendChild(createP4);

                weatherBox.appendChild(createCard);

            })
            .catch(function (error) {
                console.error('There was an issue with the fetch.', error);
            });
    }

    function getFiveDayForecast(city) {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=1d59d123b21d759ac3f9305f57e76274&units=imperial")
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok!');
                }
                return response.json();
            })
            .then(function (data) {
                const forecastDays = document.querySelector('.forecastDays');
                forecastDays.innerHTML = '';

                console.log(data);

                for (let i = 0; i < data.list.length; i += 8) {
                    const dayData = data.list[i];

                    const createCard = document.createElement('div');
                    createCard.classList.add('eachDayCards');

                    const dayElement = document.createElement('h3');
                    dayElement.textContent = new Date(dayData.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });

                    const createP1 = document.createElement('p');
                    createP1.textContent = "The temperature is: " + dayData.main.temp + "°F";

                    const createP2 = document.createElement('p');
                    createP2.textContent = "Wind Speed: " + dayData.wind.speed + "MPH";

                    const createP3 = document.createElement('p');
                    createP3.textContent = "Humidity: " + dayData.main.humidity + "%";

                    createCard.appendChild(dayElement);
                    createCard.appendChild(createP1);
                    createCard.appendChild(createP2);
                    createCard.appendChild(createP3);

                    forecastDays.appendChild(createCard);

                }

            })
            .catch(function (error) {
                console.error('Error fetching forecast data:', error);
            });
    }

    function searchWeather() {
        const cityInput = document.querySelector('.searchCity input')
        const city = cityInput.value.trim();

        if (city) {
            weatherStats(city);
            getFiveDayForecast(city);
            saveSearch(city);
            cityInput.value = '';
        } else {
            console.error('Please enter a city name');
        }
    }

    function saveSearch(city) {
        console.log('Saving search for:', city);
        let searches = JSON.parse(localStorage.getItem('weatherSearches')) || [];
        searches.push(city);
        localStorage.setItem('weatherSearches', JSON.stringify(searches));
        searchHistory();
    }

    function searchHistory() {
        const searchHistoryList = document.getElementById('searchHistoryList');
        searchHistoryList.innerHTML = '';

        let searches = JSON.parse(localStorage.getItem('weatherSearches')) || [];
        searches.forEach(city => {
            const listItem = document.createElement('li');
            listItem.textContent = city;

            listItem.addEventListener('click', function() {
                weatherStats(city);
            });
            searchHistoryList.appendChild(listItem);
        });
    }