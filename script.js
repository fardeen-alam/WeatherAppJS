let weather = {
    "apiKey" : "4e484330f804fa5e8f1bb2161565d09c",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".temp").innerHTML = temp + "°C";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity+"%";
        document.querySelector(".wind").innerHTML = "Wind speed: "+speed+"km/h";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

        document.querySelector(".weather").classList.remove("loading");

        document.body.style.backgroundImage = "url('https://source.unsplash.com/featured/1600x900/?" +name+"')";
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(e) {
    if(e.key == "Enter"){
        weather.search();
    }
});
