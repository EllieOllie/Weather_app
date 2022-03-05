<template>
  <div class="wrapper" :class="isDay ? 'day' : 'night'" v-cloak>
    <WeatherHeader @getlocalWeather="getlocalWeather" />
    <main class="weather">
      <div>
        <h2 class="title">Weather Today</h2>
        <WeatherSearchForm @getWeather="getWeather" />
      </div>
      <div class="weather-content">
        <p v-if="errorWeatherInfo === true" class="no-info">
          No weather information...
        </p>
        <div class="info" v-if="errorWeatherInfo === false">
          <div>
            <h2 class="city">
              {{ weather.name }},
              <span class="country">{{ weather.sys.country }}</span>
            </h2>
            <span class="current-time">
              Current time: {{ weather.currentTime }}
            </span>
          </div>
          <div class="weather-info">
            <div class="weather-info__summary">
              <div class="temperature">
                <p class="temperature__now">
                  {{ weather.main.temp.toFixed(1) }}&deg;C
                </p>
                <p class="temperature__realfeel">
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
            <div class="weather-info__icon">
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
import WeatherSearchForm from "@/components/WeatherSearchForm";
import WeatherHeader from "@/components/WeatherHeader";
import WeatherFooter from "@/components/WeatherFooter";
export default {
  components: {
    WeatherSearchForm,
    WeatherHeader,
    WeatherFooter,
  },
  data() {
    return {
      keyWeather: "36e0d61c301b666cc148f1050b14aab6",
      apiBaseURL: "https://api.openweathermap.org/data/2.5/",
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
  methods: {
    /**
     * Идея была - получение города по ip и передача его в инпут, затем - вызов функции, обрабатывающий этот запрос, при загрузке сайта.
     * Решение совсем не элегантное, это - костыль, по сути полностью дублирующая функция getWeather, но придумать, что-то более приемлемое и рабочее пока не получилось, к сожалению.
     */
    getlocalWeather: async function (loc) {
      this.inputQuery = loc;

      await this.axios
        .get(
          `${this.apiBaseURL}weather?q=${this.inputQuery}&appid=${this.keyWeather}&units=metric`
        )
        .then((response) => {
          this.weather = response.data;

          this.inputQuery = "";

          // время не точное!!!
          const getCurrTimeCity = () => {
            const currHours = this.weather.timezone / 3600;
            let utcHours = new Date().toUTCString().slice(17, 19);
            let utcMin = new Date().toUTCString().slice(20, 22);
            let reasultHours = +utcHours + Math.round(+currHours);
            reasultHours > 23
              ? (reasultHours = reasultHours - 24)
              : reasultHours;
            reasultHours < 0
              ? (reasultHours = reasultHours + 24)
              : reasultHours;
            return `${
              reasultHours.toString().length === 1
                ? `0${reasultHours}`
                : reasultHours
            }:${utcMin}`;
          };
          this.weather.currentTime = getCurrTimeCity();
          const getWindDirection = () => {
            let wind = "";
            const windDir = this.weather.wind.deg;
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

          const weatherIcon = this.weather.weather[0].icon;
          if (weatherIcon.includes("n")) {
            this.isDay = false;
          } else {
            this.isDay = true;
          }
          const mainWeather = this.weather.weather[0].main;
          this.weather.icon = `${mainWeather}.svg`;
          if (mainWeather.includes("Clear")) {
            weatherIcon.includes("d")
              ? (this.weather.icon = `${mainWeather}-day.svg`)
              : (this.weather.icon = `${mainWeather}-night.svg`);
          }
          this.errorWeatherInfo = false;
        })
        .catch((error) => {
          console.log(error);
          this.errorWeatherInfo = true;
        });
    },
    getWeather: async function (query) {
      this.imputQuery = query;

      await this.axios
        .get(
          `${this.apiBaseURL}weather?q=${query}&appid=${this.keyWeather}&units=metric`
        )
        .then((response) => {
          this.weather = response.data;

          // время не точное!!!
          const getCurrTimeCity = () => {
            const currHours = this.weather.timezone / 3600;
            let utcHours = new Date().toUTCString().slice(17, 19);
            let utcMin = new Date().toUTCString().slice(20, 22);
            let reasultHours = +utcHours + Math.round(+currHours);
            reasultHours > 23
              ? (reasultHours = reasultHours - 24)
              : reasultHours;
            reasultHours < 0
              ? (reasultHours = reasultHours + 24)
              : reasultHours;
            return `${
              reasultHours.toString().length === 1
                ? `0${reasultHours}`
                : reasultHours
            }:${utcMin}`;
          };
          this.weather.currentTime = getCurrTimeCity();
          const getWindDirection = () => {
            let wind = "";
            const windDir = this.weather.wind.deg;
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

          const weatherIcon = this.weather.weather[0].icon;
          if (weatherIcon.includes("n")) {
            this.isDay = false;
          } else {
            this.isDay = true;
          }
          const mainWeather = this.weather.weather[0].main;
          this.weather.icon = `${mainWeather}.svg`;
          if (mainWeather.includes("Clear")) {
            weatherIcon.includes("d")
              ? (this.weather.icon = `${mainWeather}-day.svg`)
              : (this.weather.icon = `${mainWeather}-night.svg`);
          }
          this.errorWeatherInfo = false;
          this.errorCityFound = false;
        })
        .catch((error) => {
          console.log(error);
          this.errorWeatherInfo = true;
          this.errorCityFound = true;
        });
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
      linear-gradient(rgba(100, 100, 100, 0.3) 10%, rgba(60, 68, 75, 0.6) 85%),
    no-repeat 2% 25% / cover url(../assets/svg/Cold-day.svg);
}
.night {
  color: #fff;
  text-shadow: 2px 2px 10px #153a54;
  background: no-repeat 0 0 / cover
      radial-gradient(rgba(198, 222, 255, 0.2) 10%, rgba(21, 58, 84, 0.6) 85%),
    no-repeat 2% 20% / cover url(../assets/svg/Cold-night.svg);
}
.weather {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 25px;
  flex: 1 1 auto;
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
.weather-content {
  min-height: 300px;
  width: 450px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: inset 0 0 20px 10px #91a0b4;
  background: rgba(221, 220, 220, 0.3);
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
.weather-info__summary {
  display: flex;
  flex-direction: column;
}
.temperature__now {
  color: #77c2e9;
  font-size: 56px;
  text-shadow: -3px 3px 6px #000;
}
.temperature__realfeel {
  font-size: 14px;
}
.weather-info__icon {
  position: relative;
}
.weather-info__icon img {
  position: absolute;
  top: -60px;
  right: -35px;
  width: 250px;
  z-index: 10;
}
@media (max-width: 500px) {
  .wrapper > * {
    margin: 0 auto 15px;
  }
  .title {
    font-size: 40px;
  }
  .weather-content {
    padding: 20px 20px;
  }
  .city {
    font-size: 26px;
    padding-bottom: 0.3em;
  }
  .current-time,
  .weather-info {
    font-size: 16px;
  }
  .temperature__now {
    font-size: 50px;
  }
  .weather-info__icon img {
    top: -25px;
    width: 205px;
  }
}
</style>
