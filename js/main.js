function getWeatherData(city = "cairo") {
  const apiKey = "2ffc4c5f1f0646caa83232854230208";
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
  const weatherContainerElement = document.getElementById("weather-container");
  const cityName = document.getElementById("cityName");

  fetch(apiUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      if (data) {
        // clear any previous weather cards from the weather container
        weatherContainerElement.innerHTML = "";
        cityName.innerText = `${data.location.country} => ${data.location.name}`;

        // create and style the weather card elements for the selected city
        for (let i = 0; i < 3; i++) {
          const date = data.forecast.forecastday[i].date;
          const day = new Date(date).toLocaleDateString(undefined, {
            weekday: "long",
          });
          const temp = data.forecast.forecastday[i].day.avgtemp_c;
          const desc = data.forecast.forecastday[i].day.condition.text;
          const iconUrl = data.forecast.forecastday[i].day.condition.icon;
          const wind = data.forecast.forecastday[i].day.maxwind_kph;
          const humidity = data.forecast.forecastday[i].day.avghumidity;
          const campus = data.forecast.forecastday[i].day.daily_will_it_rain;
          const weatherCardElement = document.createElement("div");
          weatherCardElement.classList.add("col-md-4");
          weatherCardElement.innerHTML = `
                      <div class="weather-card">
                          <img src="${iconUrl}" alt="Weather icon">
                          <div class="day">${day}</div>
                          <div class="date">${date}</div>
                          <div class="temp">${temp}&deg;C</div>
                          <div class="desc">${desc}</div>
                          <div class="wind">Wind: ${wind} km/h</div>
                          <div class="humidity">Humidity: ${humidity}%</div>
                          <div class="campus">${
                            campus ? "Rain: Yes" : "Rain: No"
                          }</div>
                      </div>
                `;
          weatherContainerElement.appendChild(weatherCardElement);
        }
      }
    });
}

// Call the function with default value when the page is loaded
getWeatherData();

// Attach event listener to the input field for the "keyup" event

document.getElementById("city-input").addEventListener("keyup", function (e) {
  getWeatherData(e.target.value);
});
