<template>
  <header class="user-info">
    <div class="location">
      <span v-if="errorStr">
        Sorry, but the following error occurred: {{ errorStr }}
      </span>
      <span v-if="gettingLocation">
        <b class="search-location">Getting<br />your<br />location...</b>
      </span>
      <span v-if="currentLocation">
        {{ currentLocation }}
      </span>
    </div>
    <time class="time">{{ getCurrentTime }}</time>
    <time class="date">{{ getCurrentDate }}</time>
  </header>
</template>

<script>
export default {
  data() {
    return {
      currentLocation: "",
      gettingLocation: false,
      errorStr: "",
      apiIP:
        "https://geo.ipify.org/api/v2/country,city?apiKey=at_GIBsBMEVaVrD3ob8ONS0coeAjIkd8",
    };
  },
  mounted() {
    this.getUserLoc();

    if (localStorage.currentLocation) {
      this.currentLocation = localStorage.currentLocation;
      this.gettingLocation = false;
    }
  },
  watch: {
    currentLocation(newCurrentLocation) {
      localStorage.currentLocation = newCurrentLocation;
    },
  },
  methods: {
    getUserLoc: async function () {
      this.gettingLocation = true;
      try {
        const response = await this.axios(this.apiIP);
        this.currentLocation = await response.data.location.city;
        this.$emit("getlocalWeather", this.currentLocation);
      } catch (error) {
        this.gettingLocation = false;
        this.errorStr = error.message;
      } finally {
        this.gettingLocation = false;
      }
    },
  },
  computed: {
    getCurrentTime() {
      return new Date().toLocaleTimeString().slice(0, -3);
    },
    getCurrentDate() {
      return new Date().toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.user-info {
  min-height: 70px;
  margin: 0 auto 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 25px;
  font-size: 22px;
  letter-spacing: 2px;
}
.search-location {
  display: flex;
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.5px;
  line-height: 16px;
}
.time {
  font-size: 50px;
}
@media (max-width: 500px) {
  .user-info {
    gap: 15px;
    font-size: 18px;
  }
  .time {
    font-size: 35px;
  }
}
</style>
