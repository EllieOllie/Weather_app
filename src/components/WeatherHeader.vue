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
      currentLocation: null,
      gettingLocation: false,
      errorStr: null,
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

        const url =
          "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
        const token = "40786c626ec6fe8d689c47e1c540c1cca57d148b";
        const query = { lat: `${latitude}`, lon: `${longitude}` };

        const options = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Token " + token,
          },
          body: JSON.stringify(query),
        };

        fetch(url, options)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            const locality = result.suggestions[0].data.city;
            console.log(locality);
          })
          .catch((error) => console.log("error", error));
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
