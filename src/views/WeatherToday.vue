<template>
  <div class="wrapper" :class="isDay ? 'day' : 'night'" v-cloak>
    <WeatherHeader @getlocalWeather="getlocalWeather" />
    <main class="weather">
      <div class="container-weather">
        <h2 class="title">Weather Today</h2>
        <div class="search-form">
          <form class="get-location" @submit.prevent="getWeather">
            <input
              type="text"
              placeholder="Enter a city..."
              autofocus
              autocomplete="on"
              v-model="inputQuery"
            />
          </form>
          <button
            class="search-btn"
            v-if="inputQuery !== ''"
            @click.prevent="getWeather"
          >
            <img src="../assets/find-location.svg" alt="search" />
          </button>
        </div>
        <p class="error" v-if="errorCityFound">City not found!</p>
      </div>
      <div class="weather-content">
        <p v-if="errorWeatherInfo === true" class="no-info">
          Weather information...
        </p>
        <div v-if="errorWeatherInfo === false" class="info">
          <div class="location-info">
            <h2 class="city">
              {{ weather.name }},
              <span class="country">{{ weather.sys.country }}</span>
            </h2>
            <span class="current-time">
              Current time: {{ weather.currentTime }}
            </span>
          </div>
          <div class="weather-info">
            <div class="summary">
              <div class="temperature">
                <p class="temperature-now">
                  {{ weather.main.temp.toFixed(1) }}&deg;C
                </p>
                <p class="temperature-realfeel">
                  Realfeel: {{ weather.main.feels_like.toFixed(1) }} &deg;C
                </p>
              </div>
              <p class="wind">
                wind {{ weather.windDirect }},
                {{ Math.round(weather.wind.speed) }} m/s
              </p>
              <p class="humidity">
                humidity {{ Math.round(weather.main.humidity) }}%
              </p>
              <p class="overcast">{{ weather.weather[0].description }}</p>
            </div>
            <div class="image">
              <img
                :src="require('../assets/weather/' + weather.icon)"
                alt="weather"
              />
            </div>
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
      keyWeather: "36e0d61c301b666cc148f1050b14aab6",
      apiBaseURL: "http://api.openweathermap.org/data/2.5/",
      errorCityFound: false,
      errorWeatherInfo: true,
      isDay: true,
      inputQuery: "",
      weather: {
        currentTime: "",
        windDirect: "",
        icon: null,
      },
    };
  },
  mounted() {
    this.getlocalWeather();
  },
  methods: {
    getlocalWeather: async function (loc) {
      this.inputQuery = loc;
      try {
        const response = await fetch(
          `${this.apiBaseURL}weather?q=${this.inputQuery}&appid=${this.keyWeather}&units=metric`
        );
        const data = await response.json();
        this.inputQuery = "";
        this.weather = data;

        // время не точное!!!
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

        const weatherIcon = data.weather[0].icon;
        if (weatherIcon.includes("n")) {
          this.isDay = false;
        } else {
          this.isDay = true;
        }
        const mainWeather = data.weather[0].main;
        this.weather.icon = `${mainWeather}.svg`;
        if (mainWeather.includes("Clear")) {
          weatherIcon.includes("d")
            ? (this.weather.icon = `${mainWeather}-day.svg`)
            : (this.weather.icon = `${mainWeather}-night.svg`);
        }
        this.errorWeatherInfo = false;
      } catch (error) {
        this.errorWeatherInfo = true;
      }
    },
    getWeather: async function () {
      this.errorWeatherInfo = true;
      try {
        const response = await fetch(
          `${this.apiBaseURL}weather?q=${this.inputQuery}&appid=${this.keyWeather}&units=metric`
        );
        const data = await response.json();
        // console.log(data);
        this.inputQuery = "";
        this.weather = data;

        // время не точное!!!
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

        const weatherIcon = data.weather[0].icon;
        if (weatherIcon.includes("n")) {
          this.isDay = false;
        } else {
          this.isDay = true;
        }
        const mainWeather = data.weather[0].main;
        this.weather.icon = `${mainWeather}.svg`;
        if (mainWeather.includes("Clear")) {
          weatherIcon.includes("d")
            ? (this.weather.icon = `${mainWeather}-day.svg`)
            : (this.weather.icon = `${mainWeather}-night.svg`);
        }
        this.errorWeatherInfo = false;
        this.errorCityFound = false;
      } catch (error) {
        this.errorWeatherInfo = true;
        this.errorCityFound = true;
      }
    },
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1 1 auto;
}
.wrapper > * {
  width: 90%;
  margin: 0 auto 25px;
}
.day {
  color: #071d2c;
  text-shadow: 2px 2px 10px #ccc;
  background: no-repeat 0 0 / cover
      linear-gradient(rgba(77, 77, 77, 0.3) 10%, rgba(60, 68, 75, 0.6) 85%),
    no-repeat 2% 25% / cover url(../assets/Cold-day.svg);
}
.night {
  color: #fff;
  text-shadow: 2px 2px 10px #153a54;
  background: no-repeat 0 0 / cover
      radial-gradient(rgba(198, 222, 255, 0.2) 10%, rgba(21, 58, 84, 0.6) 85%),
    no-repeat 2% 20% / cover url(../assets/Cold-night.svg);
}
.weather {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 25px;
  flex: 1 1 auto;
}
.container-weather {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  margin-bottom: 1rem;
  color: #ffa400;
  text-align: center;
  word-wrap: break-word;
  font-family: Calistoga;
  font-size: 50px;
  letter-spacing: 1.5px;
  line-height: 50px;
  text-shadow: 2px 2px 10px #747679;
}
.search-form {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}
input {
  border-color: #071d2c;
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
  min-height: 300px;
  width: 450px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: inset 0 0 20px 10px #91a0b4;
  background: rgba(221, 220, 220, 0.55);
}
.no-info {
  display: flex;
  justify-content: center;
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
  top: -60px;
  right: -35px;
  width: 250px;
  z-index: 10;
}
@media (max-width: 420px) {
  .image img {
    top: 5px;
    right: -50px;
    width: 165px;
  }
}
</style>
