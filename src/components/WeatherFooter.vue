<template>
  <footer class="nasa-info">
    <div class="nasa-icon">
      NASA Today
      <img src="../assets/nasa.svg" alt="nasa-logo" />
    </div>
    <div class="nasa">
      <a class="nasa-link" target="_blank" :href="nasa.imgLinkUrl">
        <img class="nasa-img" :src="nasa.imgUrl" alt="nasa" />
      </a>
      <h3 class="nasa-title">{{ nasa.title }}</h3>
      <p class="nasa-description">{{ nasa.description }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      nasa: {
        imgLinkUrl: "",
        imgUrl: "",
        title: "",
        description: "",
      },
    };
  },
  created() {
    const keyNasa = "NscA0buKrklyeIAikyUvalzPLnTqlQvJVssJIUgM";
    const nasaURL = `https://api.nasa.gov/planetary/apod?api_key=${keyNasa}`;

    fetch(nasaURL)
      .then((response) => response.json())
      .then((data) => {
        this.nasa.imgLinkUrl = data.hdurl;
        this.nasa.imgUrl = data.url;
        this.nasa.title = data.title;
        this.nasa.description = data.explanation;
      });
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
