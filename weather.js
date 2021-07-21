const app_id = '2a2b6328681d2463f566b275840d493c';
const searchInput = document.querySelector('#city');

const local         = document.querySelector('.local');
const icon          = document.querySelector('#icon');
const condition     = document.querySelector('.condition');
const temperature   = document.querySelector('.temperature');
const humidity      = document.querySelector('.humidity');
const wind          = document.querySelector('.wind-speed');
const sunrise       = document.querySelector('.sunrise');
const sunset        = document.querySelector('.sunset');


function formattedTime(unix_timestamp) {
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;

}

searchInput.addEventListener('change', (even) =>{
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${even.target.value}&appid=${app_id}&units=metric&lang=en`)
    .then(async res =>{
        const data = await res.json();
        console.log('[searchInput]',data);
        
        local.innerHTML         = data.name || '---';
        condition.innerHTML     = data.weather[0].description ;
        temperature.innerHTML   = Math.round(data.main.temp);
        humidity.innerHTML      = data.main.humidity;
        wind.innerHTML          = (data.wind.speed * 3.6).toFixed(2);
        sunrise.innerHTML       = formattedTime(data.sys.sunrise);
        sunset.innerHTML        = formattedTime(data.sys.sunset);
        var weatherIcon         = data.weather[0].icon;
        switch(weatherIcon){
            case "01d":
            case "01n":
                icon.innerHTML = `<i class="far fa-sun fa-10x"></i>`;
                break;
            case "02d":
            case "02n": 
            case "03d":
            case "03n":
            case "04n":
            case "04d":
                icon.innerHTML = `<i class="fas fa-cloud-sun fa-9x"></i>`;
                break;
            case "09d":
                icon.innerHTML =`<i class="fas fa-cloud-showers-heavy fa-9x"></i>`;
                break;
            case "10d":
                icon.innerHTML = `<i class="fas fa-cloud-sun-rain fa-9x"></i>`;
                break;
            case "11d":
                icon.innerHTML = `<i class="fas fa-bolt fa-9x"></i>`;
                break;
            case "13d":
                icon.innerHTML = `<i class="far fa-snowflake fa-9x"></i>`;
                break;
            case "50n":
                icon.innerHTML = `<i class="fas fa-smog fa-9x"></i>`;
                break;
        }
    });
});