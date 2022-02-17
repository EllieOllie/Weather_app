<template>
  <div id="wrapper" v-bind:class="isDay ? 'day' : 'night'">
    <header class="local-date-info">
      <span class="local">Tomsk</span>
      <time class="time">{{ weather.time }}</time>
      <time class="date">{{ weather.date }}</time>
    </header>
    <main class="weather">

      <h1 class="title">Weather App</h1>

      <form class="get-location" @submit.prevent="getWeather">
        <input
          type="text"
          placeholder="city..."
          autocomplete="off"
          v-model="getLocation"
        />
      </form>

      <div class="weather-content">
        <div class="location-info">
          <h2 class="city">
            {{ weather.city }},
            <span class="country">{{ weather.country }}</span>
          </h2>
        </div>

        <div class="weather-info">
          <div class="summary">
            <div class="temperature">
              <p class="temperature-now">{{ weather.temperature }}&deg;C</p>
              <p class="temperature-realfeel">Realfeel: {{ weather.temperatureRealfeel }} &deg;C</p>
            </div>
            <p class="wind">wind {{ weather.windDirect }}, {{ weather.windSpeed }} m/s</p>
            <p class="humidity">humidity {{ weather.humidity }}%</p>
            <p class="overcast">{{ weather.overcast }}</p>
          </div>
          <div class="image">
            <img :src="icons.icon" :alt="icons.name">
          </div>
        </div>
      </div>
    </main>
    <footer class="nasa-info">
      <button class="nasa-btn" type="submit" @click.prevent="getNasa">NASA Today</button>
      <div class="nasa">
        <a class="nasa-link" target="_blank" href="https://apod.nasa.gov/apod/image/2202/Chamaeleon_RobertEder.jpg">
          <img class="nasa-img" src="https://apod.nasa.gov/apod/image/2202/Chamaeleon_RobertEder1024.jpg" alt="nasa" />
        </a>
        <div class="nasa-text">
          <h3 class="nasa-title">{{ nasa.title }}</h3>
          <p class="nasa-description">{{ nasa.description }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      isDay: true,
      getLocation: "",
      weather: {
        city: "Tomsk",
        country: "Russia",
        time: new Date().toLocaleTimeString().slice(0, -3),
        date: new Date().toLocaleDateString(),
        temperature: -16,
        temperatureRealfeel: -20,
        windDirect: "north",
        windSpeed: 3,
        humidity: 83,
        overcast: "mainly cloudy",
      },
      icons: [
        {name: "Cloudy", icon: require("@/assets/animated/cloudy.svg")},
        {name: "Snow", icon: require("@/assets/animated/snowy-6.svg")},
      ],
      nasa: {
        imgUrl: "https://apod.nasa.gov/apod/image/2202/Chamaeleon_RobertEder1024.jpg",
        title: "Chamaeleon I Molecular Cloud",
        description: "Dark markings and bright nebulae in this telescopic southern sky view are telltale signs of young stars and active star formation. They lie a mere 650 light-years away, at the boundary of the local bubble and the Chamaeleon molecular cloud complex. Regions with young stars identified as dusty reflection nebulae from the 1946 Cederblad catalog include the C-shaped Ced 110 just above and left of center, and bluish Ced 111 below it. Also a standout in the frame, the orange tinted V-shape of the Chamaeleon Infrared Nebula (Cha IRN) was carved by material streaming from a newly formed low-mass star. The well-composed image spans 1.5 degrees. That's about 17 light-years at the estimated distance of the nearby Chamaeleon I molecular cloud.",
      },
    };
  },
  methods: {
    getWeather: async function () {
      // console.log(this.getLocation);
      const keyWeather = "36e0d61c301b666cc148f1050b14aab6";
      const baseURL = `http://api.openweathermap.org/data/2.5/weather?q=${this.getLocation}&appid=${keyWeather}&units=metric`;
      const response = await fetch(baseURL);
      const data = await response.json();
      console.log(data);
      this.getLocation = "";

      this.weather.city = data.name;
      this.weather.country = data.sys.country;
      this.weather.temperature = data.main.temp.toFixed(1);
      this.weather.temperatureRealfeel = data.main.feels_like.toFixed(1);

      let wind = "";
      const windDir = data.wind.deg;
      if (windDir >= 0 && windDir <= 10 || windDir >= 351 && windDir <=360) {
        wind = "north";
      } else if (windDir >= 11 && windDir <= 80) {
        wind = "NE";
      } else if (windDir >= 81 && windDir <= 100) {
        wind = "east";
      } else if (windDir >= 101 && windDir <= 170) {
        wind = "SE";
      } else if (windDir >= 171 && windDir <= 190) {
        wind = "south";
      } else if (windDir >= 191 && windDir <= 260) {
        wind = "SW";
      } else if (windDir >= 261 && windDir <= 280) {
        wind = "west";
      } else if (windDir >= 281 && windDir <= 350) {
        wind = "NW";
      }

      this.weather.windDirect = wind;
      this.weather.windSpeed = Math.round(data.wind.speed);
      this.weather.humidity = Math.round(data.main.humidity);
      this.weather.overcast = data.weather[0].description;

      const weatherIcon = data.weather[0].icon;
      if (weatherIcon.includes("n")) {
        this.isDay = false;
      } else {
        this.isDay = true;
      }

      const mainWeather = data.weather[0].main;
      // console.log(mainWeather);
      if (mainWeather.includes("Clouds")) {
        icons.name
      }


      this.isVisible = true;
    },
    getNasa: async function () {
      const keyNasa = "NscA0buKrklyeIAikyUvalzPLnTqlQvJVssJIUgM";
      const nasaURL = `https://api.nasa.gov/planetary/apod?api_key=${keyNasa}`;
      const response = await fetch(nasaURL);
      const data = await response.json();
      // console.log(data);

      this.nasa.imgUrl = data.url;
      this.nasa.title = data.title;
      this.nasa.description = data.explanation;

      this.isVisible = true;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main,
footer {
  width: 90%;
  margin: 0 auto;
}

#app {
  display: flex;
  margin: 0 auto;
  color: #fff;
  font-family: Raleway, Verdana, sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
}

#wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  color: #071d2c;
}

.day {
  background: no-repeat 0 0 / cover
      radial-gradient(rgba(198, 222, 255, 0.2) 10%, rgba(21, 58, 84, 0.6) 85%),
    no-repeat 0 0 / cover url(./assets/Winter-day.jpg);
}

.night {
  background: no-repeat 0 0 / cover
      radial-gradient(rgba(198, 222, 255, 0.2) 10%, rgba(21, 58, 84, 0.6) 85%),
    no-repeat 0 0 / cover url(./assets/Winter-night.svg);
}

.local-date-info {
  width: 60%;
  min-height: 70px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
}

.weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
}

.title {
  margin-bottom: 10px;
  color: #ffa400;
  font-size: 42px;
  text-shadow: 2px 2px 10px #2e3636;
}

input {
  height: 30px;
  margin-bottom: 15px;
  border: 2px solid #071d2c;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.5);
}

input:focus {
  background-color: rgba(255, 255, 255, 0.9);
}

input::-webkit-input-placeholder {
  padding-left: 5px;
  font-family: Raleway;
  color: #071d2c;
}

input::-webkit-input-placeholder {
  opacity: 1;
  transition: opacity 0.7s ease;
}

input:focus::-webkit-input-placeholder {
  opacity: 0;
  transition: opacity 0.7s ease;
}

.weather-content {
  min-width: 450px;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: inset 0 0 20px 10px #91a0b4;
  background: rgba(255, 255, 255, 0.15);
}

.city {
  font-size: 32px;
  text-align: center;
}

.weather-info {
  display: flex;
  justify-content: space-between;
}

.summary {
  display: flex;
  flex-direction: column;
}

.temperature-now {
  color: #56a0ee;
  font-size: 56px;
  text-shadow: -3px 3px 6px #000;
}

.temperature-realfeel {
  font-size: 14px;
}

.image {
  position: relative;
}

.image img {
  position: absolute;
  top: -40px;
  right: -15px;
  width: 250px;
  height: 250px;
  z-index: 10;
  /* background: no-repeat 50% 50% / 170% url(assets/animated/cloudy.svg); */
}

.nasa-info {
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.3);
  border: 2px solid #ffa400;
  border-radius: 4px;
}

.nasa-btn {
  position: absolute;
  top: -25px;
  right: 75px;
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: #ffa400;
  box-shadow: 2px 2px 10px #000;
  border: none;
  border-radius: 5px;
  font: bold 22px Raleway, sans-serif;
  cursor: pointer;
}

.nasa-btn:active {
  transform: scale(0.95);
  transition: all 0.5s ease-in;
  box-shadow: 3px 3px 10px #000;
}

.nasa {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.nasa-img {
  width: 200px;
  height: 200px;
}

.nasa-text {
  font-size: 16px;
  font-weight: normal;
}

</style>
