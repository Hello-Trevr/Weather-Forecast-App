const api = {
    key: "881a26f790ad62c5f6146556c11c374c",
    baseurl:"https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
const btn = document.getElementById('search-btn');
const overlay = document.querySelector('.overlay');
const input = document.getElementById('city');
const weatherData = document.getElementById('data');
const heroBG = document.getElementById('bg');
const weatherIcon = document.querySelector('.weather-icon');
const tempData_el = document.querySelector('.temp-data')

searchbox.addEventListener('keypress', setQuery);
btn.addEventListener('click', buttonHandler);

function buttonHandler(){
        heroBG.classList.remove('bg-height');
        weatherData.classList.add('show-text');
        getResults(searchbox.value);
        console.log(searchbox.value);
}

function setQuery(evt){
    if(evt.keyCode == 13){
        heroBG.classList.remove('bg-height');
        weatherData.classList.add('show-text');
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.baseurl}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }

  function displayResults(weather){

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    weatherHandler(weather_el.innerText);

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `Low ${Math.round(weather.main.temp_min)}°F High ${Math.round(weather.main.temp_max)}°F`;
}

// Adds corresponding weather image and icon for the type of weather in a city
function weatherHandler(weather){
    // let icon =""
    
    if(weather == "Clouds" && tempData_el.classList.contains('weather-clouds') == false){
        // icon = `<i class="fa-solid fa-cloud"></i>`
        tempData_el.classList.toggle('weather-clouds');
    } else if (weather == "Haze" && tempData_el.classList.contains('weather-haze') == false){
        tempData_el.classList.toggle('weather-haze')
    } else if(weather == "Clear" && tempData_el.classList.contains('weather-sunny') == false){
        tempData_el.classList.toggle('weather-sunny')
    } else if(weather == "Rain" && tempData_el.classList.contains('weather-rain') == false){
        tempData_el.classList.toggle('weather-rain')
    }
    // weatherIcon.innerHTML = icon;
}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date}, ${year}`;
}

// btn.addEventListener('click', () =>{
    
//     if(input.value != ''){
//         displayOverlay();
//     } else{
//         return 0;
//     }
    
// })

// function displayOverlay(){
//     overlay.style.display = 'grid';
//     overlay.classList.add('animate-overlay')
//     overlay.addEventListener('animationend', () =>{
//         overlay.classList.remove('animate-overlay');
//         overlay.style.display = 'none';
//     })
// }