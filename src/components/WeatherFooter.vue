<template>
  <footer class="nasa">
    <div class="nasa-icon" :title="message">
      NASA Today
      <img src="../assets/svg/nasa.svg" width="35" alt="nasa-logo" />
    </div>
    <p v-if="errorMsg" class="nasa-error">Ooops... something went wrong</p>
    <div v-else class="nasa-info">
      <a class="nasa-info__img" target="_blank" :href="nasa.hdurl">
        <img :src="nasa.url" width="250" height="250" alt="nasa" />
      </a>
      <h3 class="nasa-info__title">{{ nasa.title }}</h3>
      <p class="nasa-info__caption">{{ nasa.explanation }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      nasa: {},
      message:
        "Image of the day from NASA (" +
        new Date().toLocaleString().slice(0, 10) +
        ")",
      errorMsg: false,
      keyNasa: "NscA0buKrklyeIAikyUvalzPLnTqlQvJVssJIUgM",
      nasaBaseURL: "https://api.nasa.gov/planetary/",
    };
  },
  created() {
    this.fetchNasaInfo();
  },
  methods: {
    fetchNasaInfo: async function () {
      try {
        await this.axios
          .get(`${this.nasaBaseURL}apod?api_key=${this.keyNasa}`)
          .then((response) => {
            this.nasa = response.data;
            this.errorMsg = false;
          });
      } catch (error) {
        this.errorMsg = true;
      }
    },
  },
};
</script>

<style scoped>
.nasa {
  position: relative;
  padding: 25px 10px;
  background: rgba(47, 60, 78, 0.8);
  border: 2px solid #ffa400;
  border-radius: 4px;
}
.nasa-icon {
  position: absolute;
  top: -25px;
  right: 30px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #ffa400;
  box-shadow: 2px 2px 10px #000;
  border: none;
  border-radius: 5px;
  font: bold 22px Raleway, sans-serif;
}
.nasa-error {
  color: #fff;
  letter-spacing: 1.2px;
}
.nasa-info {
  color: #fff;
  font-size: 16px;
  font-weight: normal;
  text-shadow: none;
}
.nasa-info__img {
  float: left;
  margin: 0 20px 5px 0;
}
@media (max-width: 500px) {
  .nasa-icon {
    padding: 6px 14px;
    font-size: 18px;
  }
  .nasa-info__img {
    display: flex;
    justify-content: center;
    float: none;
    margin: 0 0 5px;
  }
  .nasa-info__title {
    text-align: center;
    padding-bottom: 10px;
  }
}
</style>
