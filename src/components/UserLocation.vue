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
      currentLocation: "",
      gettingLocation: false,
      errorStr: "",
      apiIP:
        "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_NK47fkgNYSRDGpT9n9CZcFkKnMdrB",
      userTimeZone: "",
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
          this.userTimeZone = response.data.location.timezone.slice(0, 3);
          this.gettingLocation = false;
        });
      } catch (error) {
        this.gettingLocation = false;
        this.errorStr = error.message;
      }
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
