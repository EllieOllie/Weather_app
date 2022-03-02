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
        "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_NK47fkgNYSRDGpT9n9CZcFkKnMdrB",
    };
  },
  mounted() {
    this.getUserLoc();
  },
  methods: {
    getUserLoc() {
      this.gettingLocation = true;

      try {
        this.axios.get(this.apiIP).then((response) => {
          this.currentLocation = response.data.location.city;
          this.gettingLocation = false;

          this.$emit("getlocalWeather", this.currentLocation);
        });
      } catch (error) {
        this.gettingLocation = false;
        this.errorStr = error.message;
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
