<template>
  <div id="wrapper" v-bind:class="isDay ? 'day' : 'night'">
    <WeatherHeader />
    <main class="weather">
      <div class="container-weather">
        <h1 class="title">Weather Today</h1>
        <div class="search-form">
          <form class="get-location" @submit.prevent="getWeather">
            <input
              type="text"
              placeholder="Enter a city..."
              autocomplete="off"
              v-model="getLocation"
            />
          </form>
          <button class="search-btn" @click.prevent="getWeather">
            <img
              src="https://img.icons8.com/fluency-systems-regular/48/000000/search-location.png"
              alt="search"
            />
          </button>
        </div>
        <p class="error" v-if="errorCityFound">No city found</p>
      </div>
      <div class="weather-content">
        <div class="location-info">
          <h2 class="city">
            {{ weather.city }},
            <span class="country">{{ weather.country }}</span>
          </h2>
          <span class="current-time">
            Current time: {{ weather.currentTime }}
          </span>
        </div>

        <div class="weather-info">
          <div class="summary">
            <div class="temperature">
              <p class="temperature-now">{{ weather.temperature }}&deg;C</p>
              <p class="temperature-realfeel">
                Realfeel: {{ weather.temperatureRealfeel }} &deg;C
              </p>
            </div>
            <p class="wind">
              wind {{ weather.windDirect }}, {{ weather.windSpeed }} m/s
            </p>
            <p class="humidity">humidity {{ weather.humidity }}%</p>
            <p class="overcast">{{ weather.overcast }}</p>
          </div>
          <div class="image">
            <img
              :src="require('./assets/weather/' + icon.weather)"
              alt="weather"
            />
          </div>
        </div>
      </div>
    </main>
    <WeatherFooter />
  </div>
</template>

<script>
import WeatherHeader from "@/components/WeatherHeader";
import WeatherFooter from "@/components/WeatherFooter";

export default {
  components: {
    WeatherHeader,
    WeatherFooter,
  },

  data() {
    return {
      errorCityFound: false,
      isDay: true,
      getLocation: "",
      weather: {
        city: "",
        country: "",
        currentTime: "",
        temperature: "",
        temperatureRealfeel: "",
        windDirect: "",
        windSpeed: "",
        humidity: "",
        overcast: "",
      },
      icon: {
        weather: "Clouds.svg",
      },
    };
  },
  methods: {
    getWeather: async function () {
      // console.log(this.getLocation);
      const keyWeather = "36e0d61c301b666cc148f1050b14aab6";
      const baseURL = `http://api.openweathermap.org/data/2.5/weather?q=${this.getLocation}&appid=${keyWeather}&units=metric`;

      try {
        const response = await fetch(baseURL);
        const data = await response.json();
        console.log(data);
        this.getLocation = "";

        this.weather.city = data.name;
        this.weather.country = data.sys.country;

        //! время не точное!!!
        const getCurrTimeCity = () => {
          const currHours = data.timezone / 3600;
          let utcHours = new Date().toUTCString().slice(17, 19);
          let utcMin = new Date().toUTCString().slice(20, 22);
          let reasultHours = +utcHours + Math.round(+currHours);
          reasultHours > 23 ? (reasultHours = reasultHours - 24) : reasultHours;
          reasultHours < 0 ? (reasultHours = reasultHours + 24) : reasultHours;
          return `${
            reasultHours.toString().length === 1
              ? `0${reasultHours}`
              : reasultHours
          }:${utcMin}`;
        };

        this.weather.currentTime = getCurrTimeCity();
        this.weather.temperature = data.main.temp.toFixed(1);
        this.weather.temperatureRealfeel = data.main.feels_like.toFixed(1);

        const getWindDirection = () => {
          let wind = "";
          const windDir = data.wind.deg;
          if (
            (windDir >= 0 && windDir <= 10) ||
            (windDir >= 351 && windDir <= 360)
          ) {
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
          return wind;
        };

        this.weather.windDirect = getWindDirection();
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
        this.icon.weather = `${mainWeather}.svg`;
        if (mainWeather.includes("Clear")) {
          if (weatherIcon.includes("d")) {
            this.icon.weather = `${mainWeather}-day.svg`;
          } else {
            this.icon.weather = `${mainWeather}-night.svg`;
          }
        }

        this.errorCityFound = false;
      } catch (error) {
        this.errorCityFound = true;
      }
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
}

#wrapper > * {
  width: 90%;
  margin: 15px auto 25px;
}

.day {
  color: #071d2c;
  text-shadow: 2px 2px 10px #ccc;
  background: no-repeat 0 0 / cover
      radial-gradient(rgba(198, 222, 255, 0.2) 10%, rgba(21, 58, 84, 0.6) 85%),
    no-repeat 0 0 / cover url(./assets/Winter-day.jpg);
}

.night {
  color: #fff;
  text-shadow: 2px 2px 10px #153a54;
  background: no-repeat 0 0 / cover
      radial-gradient(rgba(198, 222, 255, 0.2) 10%, rgba(21, 58, 84, 0.6) 85%),
    no-repeat 0 0 / cover url(./assets/Winter-night.svg);
}

.weather {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin: 0 auto 35px;
}

.container-weather {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  margin-bottom: 15px;
  color: #ffa400;
  text-align: center;
  word-wrap: break-word;
  font-family: Calistoga;
  font-size: 50px;
  letter-spacing: 1.5px;
  text-shadow: 2px 2px 10px #2e3636;
}

.search-form {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

input {
  height: 40px;
  padding-left: 15px;
  border: 2px solid #071d2c;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
}

input:focus {
  background-color: rgba(255, 255, 255, 0.9);
}

input::-webkit-input-placeholder {
  font-family: Raleway;
  color: #153a54;
}

input::-webkit-input-placeholder {
  opacity: 1;
  transition: opacity 0.7s ease;
}

input:focus::-webkit-input-placeholder {
  opacity: 0;
  transition: opacity 0.7s ease;
}

.search-btn {
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid #071d2c;
  border-radius: 8px;
  cursor: pointer;
}

.search-btn:hover {
  background-color: #ffa400;
  transition: all 0.7s ease-in-out;
}

.search-btn:active {
  border: 2px solid #ffa400;
  transform: scale(0.95);
  box-shadow: 2px 2px 10px #071d2c;
  transition: all 0.7s ease-in-out;
}

.search-btn img {
  width: 36px;
  padding: 2px 4px;
}

.error {
  margin-bottom: 5px;
  font-size: 16px;
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
  color: #77c2e9;
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
</style>
