<template>
  <header class="local-date-info">
    <span class="local">{{ currentLocation.loc }}</span>
    <time class="time">{{ currentDate.time }}</time>
    <time class="date">{{ currentDate.date }}</time>
  </header>
</template>

<script>
export default {
  data() {
    return {
      geoLocation: "",
      currentLocation: {
        loc: "Tomsk",
      },
      currentDate: {
        time: new Date().toLocaleTimeString().slice(0, -3),
        date: new Date().toLocaleDateString(),
      },
    };
  },
  methods: {
    getUserGeoLocation: async function () {
      const successCallback = (position) => {
        console.log(position);
      };

      const errorCallback = (error) => {
        console.error(error);
      };

      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    },
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
