const currentTempDiv = document.querySelector('.current-temp-div');
const currentWeatherDiv = document.querySelector('.current-weather-div');
const weekDaysNodeList = document.querySelectorAll('.day-box');
const weekDayWrapper = document.querySelector('.weekday-wrapper');
const dayStrRepArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function currentTempDivMarkup(temperature) {
  return `
    <div class="left">
        <div class="current-temp-value">
            ${Math.floor(temperature)}&#176
        </div>
        <div class="current-time">${currentTime.getHours()}:${currentTime.getMinutes()}</div>
    </div>
    <div class="right">
        <div class="toggle">
            F&#176<br /> C&#176
        </div>
        
    </div>
    `;

}
function registerToggleListener(cachedData, scale) {
  const toggle = document.querySelector('.toggle');
  toggle.addEventListener('click', function () {
    scale = scale === "fahrenheit"
      ? "celsius"
      : "fahrenheit"
    setCurrentTemp(cachedData, scale);
    createWeekWeatherDivs(cachedData, scale);
  });
}
function setCurrentTemp(cachedData, scale) {
  const currentTempValueDiv = document.querySelector('.current-temp-value');
  currentTempValueDiv.innerText = `${getFormattedTemp(cachedData.currently.temperature, scale)}°`
}
function setCurrentWeather(data) {
  currentWeatherDiv.innerHTML = `
        <img class="current-weather-image" src="./images/${data.currently.icon}.svg">
        <span class="current-weather-summary">${data.currently.summary}
        </span>
    `
}
function weekDayDivsMarkup(data, scale) {
  return data.daily.data.map(day => {
    const date = new Date(day.sunriseTime * 1000);
    console.dir(date.getDay());
    return `<div class="day-box day-box3">
              <span class="weekday">${dayStrRepArr[date.getDay()]}</span>
              <img src=./images/${day.icon}.svg> 
              <span class="temp-max">${getFormattedTemp(day.temperatureMax, scale)}</span> 
              <span class="temp-min">${getFormattedTemp(day.temperatureMin, scale)}</span>
            </div>`
  }).join('');
}
{/* <div class="day-box day-box3">
Mon
<img src="./images/cloudy.svg"> 70F 50F
</div> */}
  // weekDaysNodeList.forEach((day, index) => {
  //   let tempMax;
  //   (scale === "celsius") ? tempMax = (data.daily.data[index].temperatureMax - 32) * (5 / 9) : tempMax = data.daily.data[index].temperatureMax;
  //   let tempMin;
  //   (scale === "celsius") ? tempMin = (data.daily.data[index].temperatureMin - 32) * (5 / 9) : tempMin = data.daily.data[index].temperatureMin;
  //   //   day.innerHTML = `
  //   //       Mon
  //   //       <img src="./images/${data.daily.data[index].icon}.svg">
  //   //       <span class="max">${Math.floor(tempMax)}
  //   //       </span>
  //   //       ${Math.floor(tempMin)}
  //   //   `
  //   // })
  //   // weekDayWrapper.appendChild('di')
  // })