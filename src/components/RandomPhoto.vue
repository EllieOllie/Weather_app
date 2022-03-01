<template>
  <div class="photo-container">
    <div>
      <a :href="photo.links.html" target="_blank">
        <img class="random-photo" :src="photo.urls.regular" width="450" />
      </a>
    </div>
    <p class="caption">
      <span>by</span>
      <a :href="photo.user.portfolio_url" target="_blank">
        <b>{{ photo.user.name }}</b>
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
.photo-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 15px;
}
a:hover {
  color: #ccd755;
  font-weight: bold;
  transition: all 0.7s ease-out;
}
.random-photo {
  border: 4px solid #0e1011;
}
.random-photo:hover {
  filter: opacity(40%);
  border: 4px solid #ccd755;
  transition: all 0.7s ease-out;
}
.caption {
  display: flex;
  gap: 5px;
  background: #0e1011;
  text-align: center;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 1.1px;
}
@media (max-width: 450px) {
  .random-photo {
    width: 100%;
  }
}
</style>
