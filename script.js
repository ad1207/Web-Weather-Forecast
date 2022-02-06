document.addEventListener("DOMContentLoaded", function () {
    let content = document.getElementById("content");
    let form = document.getElementById("form");
    let searchBox = document.getElementById("searchBox");
    async function getWeather(city) {
        //This function fetches the data from api and pass it to addWeather function and if any error occurs it alerts in window
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5dce5ada9425c4ae77fe7524f9f7ca35`).then(res => res.json()).then(data => addWeather(data)).catch((err) => {
            window.alert("Please Enter Valid Name")
            searchBox.value = ""
        });
    }
    function addWeather(data) {
        //This function adds the data to the content block
        var temperature = convert(data.main.temp);
        var weather = document.createElement('div')
        weather.classList.add('weather')
        weather.innerHTML = `<div id="information"><h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        ${temperature}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2><h3>${data.weather[0].main}</h3></div>  `;
        content.innerHTML = "";
        content.appendChild(weather)
    };
    function convert(K) {
        //This function converts temperature from Kelvin scale to celcius scale
        return Math.floor(K - 273.15);
    }
    form.addEventListener('submit', (e) => {
        //This function gets executed when form is submitted.
        //It gets value from inbox and pass it to getWeather function
        e.preventDefault();
        var city = searchBox.value
        if (city) {
            getWeather(city)
        }
    });
})