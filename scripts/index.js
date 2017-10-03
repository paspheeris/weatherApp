//cachedData will hold all the data retrieved from the API
let cachedData;
//default temp. scale is fahrenheit
let scale = "fahrenheit";

navigator.geolocation.getCurrentPosition(position => {
  lat = position.coords.latitude;
  long = position.coords.longitude;

  fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/502110c7a4981f8355529b2f656802e5/${lat},${long}`)
    .then(response => {
      return response.json();
    })
    .then(parsedData => {
      cachedData = parsedData;
      createCurrentTempDiv(parsedData, scale, currentTempDiv);
      setCurrentWeather(parsedData);
      createWeekWeatherDivs(parsedData, scale);
      registerToggleListener(cachedData, scale);
      return parsedData;
    })
    .catch(error => {
      console.log(error);
    });
}, err => { alert("Please allow geolocation") });
function getFormattedTemp(temperatureInF, scale) {
  return Math.floor(scale === "celsius"
    ? (temperatureInF - 32) * (5 / 9)
    : temperatureInF)
}
function createCurrentTempDiv(data, scale, domNode) {
  currentTime = new Date();
  const temperature = getFormattedTemp(data.currently.temperature, scale);
  domNode.innerHTML = currentTempDivMarkup(temperature, scale);
}

function createWeekWeatherDivs(data, scale) {
  weekDayWrapper.innerHTML = weekDayDivsMarkup(data, scale);

}