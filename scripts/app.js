const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUi = (data) => {

  // const cityData = data.cityData;
  // const weatherData = data.weatherData;

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


//Without Ternery operator
 // let timeSrc = null;
 // if(weatherData.IsDayTime){
 //   timeSrc = 'img/day.svg';
 // }else{
 //   timeSrc = 'img/night.svg';
 // }

// with ternery operator
  let timeSrc = weatherData.IsDayTime ? 'img/day.svg' : 'img/night.svg';
 time.setAttribute('src',timeSrc);

}

const updateCity = async (city) => {
  const cityData = await getCity(city);
  const weatherData = await getWeather(cityData.Key);

/*
old way of object representation
when key and value are having diffrent names.
*/

  // return {
  //   cityData : cityData,
  //   weatherData : weatherData
  // }

/*
object short hand representation
it works when key and value both having the same name
*/

return {cityData, weatherData};

};

cityForm.addEventListener('submit', e => {
  // prevent formn default action
  e.preventDefault();

  // getting city name
  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city).then(data=>{
    updateUi(data);
    // console.log(data);
  }).catch(err=>{
    console.log(err);
  });

  //Adding Loacal Storage

  localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
  updateCity(localStorage.getItem('city')).then(data=>{
    updateUi(data);
  }).catch(err=>{
    console.log(err);
  });
}
