<template>
  <div class="photo-wrapper">
    <div class="photo-container">
      <a :href="photo.links.html" target="_blank">
        <img id="unsplashImage" :src="photo.urls.regular" />
      </a>
    </div>
    <p class="title">
      <span>
        {{ photo.location.name }}
      </span>
      by
      <a :href="photo.user.portfolio_url" target="_blank">
        {{ photo.user.name }}
      </a>
      on
      <a href="https://unsplash.com/" target="_blank">Unsplash</a>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.photo-wrapper {
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 15px;
}
.photo-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.photo-container img {
  width: 100%;
  border: 4px solid #000;
}
.photo-container img:hover {
  border: 4px solid #ccd755;
  transition: 0.7s ease-out;
}
.title {
  color: #fff;
  background: #000;
  text-align: center;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 1.1px;
}
a {
  text-decoration: none;
  color: #fff;
}
a:hover {
  color: #ccd755;
  font-weight: bold;
  transition: all 0.7s ease-out;
}
</style>
