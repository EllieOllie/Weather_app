<template>
  <header class="local-date-info">
    <div class="user-location">
      <span class="local" v-if="errorStr">
        Sorry, but the following error occurred: {{ errorStr }}
      </span>
      <span class="local" v-if="gettingLocation">
        <i>Getting your location...</i>
      </span>
      <span class="local" v-if="currentLocation">
        {{ currentLocation.coords.latitude }},
        {{ currentLocation.coords.longitude }}
      </span>

      <!-- <span class="local">{{ currentLocation.loc }}</span> -->
    </div>
    <time class="time">{{ currentDate.time }}</time>
    <time class="date">{{ currentDate.date }}</time>
  </header>
</template>

<script>
export default {
  data() {
    return {
      currentLocation: "",
      gettingLocation: false,
      errorStr: "",
      currentDate: {
        time: new Date().toLocaleTimeString().slice(0, -3),
        date: new Date().toLocaleDateString(),
      },
    };
  },
  created() {
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
        this.currentLocation = pos;
        console.log(pos);

        const latitude = pos.coords.latitude;
        console.log(latitude);
        const longitude = pos.coords.longitude;
        console.log(longitude);

        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

        fetch(url)
          .then((response) => response.json())
          .then((res) => {
            pos = res;
            console.log(pos);
            console.log(pos.address.city);
          });
      },
      (err) => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );
  },
};
</script>

<style scoped>
.local-date-info {
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

.time {
  font-size: 50px;
}
</style>
