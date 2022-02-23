<template>
  <footer class="nasa-info">
    <div class="nasa-icon" :title="message">
      NASA Today
      <img src="../assets/nasa.svg" alt="nasa-logo" />
    </div>
    <div class="nasa">
      <a class="nasa-link" target="_blank" :href="nasa.hdurl">
        <img class="nasa-img" :src="nasa.url" alt="nasa" />
      </a>
      <h3 class="nasa-title">{{ nasa.title }}</h3>
      <p class="nasa-description">{{ nasa.explanation }}</p>
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
      keyNasa: "NscA0buKrklyeIAikyUvalzPLnTqlQvJVssJIUgM",
      nasaBaseURL: "https://api.nasa.gov/planetary/",
    };
  },
  created() {
    this.fetchNasaInfo();
  },
  methods: {
    fetchNasaInfo() {
      this.axios
        .get(`${this.nasaBaseURL}apod?api_key=${this.keyNasa}`)
        .then((response) => {
          this.nasa = response.data;
          // console.log(response.data);
        });
    },
  },
};
</script>

<style scoped>
.nasa-info {
  position: relative;
  padding: 25px 10px;
  background: rgba(47, 54, 78, 0.8);
  border: 2px solid #ffa400;
  border-radius: 4px;
}

.nasa-icon {
  position: absolute;
  top: -25px;
  right: 30px;
  padding: 10px 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #ffa400;
  box-shadow: 2px 2px 10px #000;
  border: none;
  border-radius: 5px;
  font: bold 22px Raleway, sans-serif;
}

.nasa-icon img {
  width: 35px;
}

.nasa {
  color: #fff;
  font-size: 16px;
  font-weight: normal;
  text-shadow: none;
}

.nasa-img {
  float: left;
  width: 200px;
  height: 200px;
  margin: 0 20px 5px 0;
}
</style>
