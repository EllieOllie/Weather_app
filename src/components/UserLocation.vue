<template>
  <div class="user-location">
    <span class="local" v-if="errorStr">
      Sorry, but the following error occurred: {{ errorStr }}
    </span>
    <span class="local" v-if="gettingLocation">
      <b>Getting<br />your<br />location...</b>
    </span>
    <span class="local" v-if="currentLocation">
      {{ currentLocation }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiBaseUrl: "https://nominatim.openstreetmap.org/reverse?format=jsonv2",
      currentLocation: "",
      gettingLocation: false,
      errorStr: "",
    };
  },
  mounted() {
    this.getUserLoc();
  },
  methods: {
    getUserLoc() {
      //do we support geolocation
      if (!("geolocation" in navigator)) {
        this.errorStr = "Geolocation is not available!";
        return;
      }
      this.gettingLocation = true;
      // get position
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.gettingLocation = false;

          fetch(
            `${this.apiBaseUrl}&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
          )
            .then((response) => response.json())
            .then((data) => (this.currentLocation = data.address.city));
        },
        (err) => {
          this.gettingLocation = false;
          this.errorStr = err.message;
        }
      );
    },
  },
};
</script>

<style scoped>
.local b {
  display: flex;
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.5px;
  line-height: 16px;
}
</style>
