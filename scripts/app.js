const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUi = (data) => {

  // destructring properties
  const {cityData, weatherData} = data;

  details.innerHTML = `
            <h5 class="my-3">${cityData.EnglishName}</h5>
              <div class="my-3">${weatherData.WeatherText}</div>
              <div class="display-4 my-4">
                <span>${weatherData.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>`

 if(card.classList.contains('d-none')){
   card.classList.remove('d-none');
 }

 //Update day and night and icons

 const iconSrc = `img/icons/${weatherData.WeatherIcon}.svg`;
 icon.setAttribute('src', iconSrc);

// with ternery operator
  let timeSrc = weatherData.IsDayTime ? 'img/day.svg' : 'img/night.svg';
 time.setAttribute('src',timeSrc);

}

cityForm.addEventListener('submit', e => {
  // prevent formn default action
  e.preventDefault();

  // getting city name
  const city = cityForm.city.value.trim();
  cityForm.reset();

  forecast.updateCity(city).then(data=>{
    updateUi(data);
    // console.log(data);
  }).catch(err=>{
    console.log(err);
  });

  //Adding Loacal Storage

  localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
  forecast.updateCity(localStorage.getItem('city')).then(data=>{
    updateUi(data);
  }).catch(err=>{
    console.log(err);
  });
}
