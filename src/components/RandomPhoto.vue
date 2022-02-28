<template>
  <div class="photo-wrapper">
    <div class="photo-container">
      <a :href="photo.links.html" target="_blank">
        <img :src="photo.urls.regular" />
      </a>
    </div>
    <p class="subtitle">
      <span>by</span>
      <a :href="photo.user.portfolio_url" target="_blank">
        {{ photo.user.name }}
      </a>
      <span>on Unsplash</span>
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
  margin-bottom: 1em;
}
.photo-container img:hover {
  filter: opacity(40%);
  border: 4px solid #ccd755;
  transition: all 0.7s ease-out;
}
.subtitle {
  display: flex;
  gap: 5px;
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
  cursor: pointer;
}
a:hover {
  color: #ccd755;
  font-weight: bold;
  transition: all 0.7s ease-out;
}
</style>
