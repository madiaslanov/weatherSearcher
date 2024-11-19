const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weather = document.querySelector('.weather-show');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


function getWeatherData() {
  const apiKey = 'f848fbd98b033b095c727c4ff942e98f';
  const city = searchInput.value;

  if (city === '') {
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(json => {
      const image = document.querySelector('.weather-show img');
      const temperature = document.querySelector('.weather-show .weather-text');
      const description = document.querySelector('.weather-show .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      if(json.cod == '404'){
        container.style.height = '400px';
        error404.classList.add('active');
        weatherDetails.classList.remove('active');
        weather.classList.remove('active');
        return;
      }
        container.style.height = '555px';
        error404.classList.remove('active');
        weatherDetails.classList.add('active');
        weather.classList.add('active');


      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'img/clear.png';
          break;
        case 'Rain':
          image.src = 'img/rain.png';
          break;
        case 'Snow':
          image.src = 'img/snow.png';
          break;
        case 'Clouds':
          image.src = 'img/cloud.png';
          break;
        case 'Mist':
        case 'Haze':
          image.src = 'img/mist.png';
          break;
        default:
          image.src = 'img/cloud.png';
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = json.weather[0].description;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
    })
    .catch(error => {
      console.error('Ошибка при запросе:', error);
    });
}

searchButton.addEventListener('click', getWeatherData);



searchInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    getWeatherData();
  }
});
