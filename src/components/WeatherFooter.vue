<template>
  <footer class="nasa-info">
    <button class="nasa-btn" type="submit" @click.prevent="getNasa">
      NASA Today
    </button>
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
  methods: {
    getNasa: async function () {
      const keyNasa = "NscA0buKrklyeIAikyUvalzPLnTqlQvJVssJIUgM";
      const nasaURL = `https://api.nasa.gov/planetary/apod?api_key=${keyNasa}`;
      const response = await fetch(nasaURL);
      const data = await response.json();
      console.log(data);

      this.nasa.imgLinkUrl = data.hdurl;
      this.nasa.imgUrl = data.url;
      this.nasa.title = data.title;
      this.nasa.description = data.explanation;
    },
  },
};
</script>

<style scoped>
.nasa-info {
  position: relative;
  padding: 25px 10px;
  background: rgba(59, 47, 64, 0.5);
  border: 2px solid #ffa400;
  border-radius: 4px;
  color: #fff;
}

.nasa-btn {
  position: absolute;
  top: -25px;
  right: 30px;
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: #ffa400;
  box-shadow: 2px 2px 10px #000;
  border: none;
  border-radius: 5px;
  font: bold 22px Raleway, sans-serif;
  cursor: pointer;
}

.nasa-btn:active {
  transform: scale(0.95);
  transition: all 0.5s ease-in;
  box-shadow: 3px 3px 10px #000;
}

.nasa {
  font-size: 16px;
  font-weight: normal;
  text-shadow: none;
}

.nasa-img {
  float: left;
  width: 200px;
  height: 200px;
  margin-right: 15px;
}
</style>
