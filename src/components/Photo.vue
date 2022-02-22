<template>
  <div class="photo-wrapper">
    <div class="photo-container">
      <a :href="photo.links.html" target="_blank">
        <img id="unsplashImage" :src="photo.urls.regular" />
      </a>
    </div>
    <p class="title">
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
  margin-bottom: 15px;
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
.title {
  color: #fff;
  background: #000;
  text-align: center;
  font-weight: normal;
}
a {
  text-decoration: none;
  color: #fff;
}
</style>
