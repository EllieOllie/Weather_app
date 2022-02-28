<template>
  <div class="photo-container">
    <a class="photo" :href="item.cover_photo.links.html" target="_blank">
      <img
        :src="item.cover_photo.urls.regular"
        width="250"
        alt="item.title"
        :title="
          item.cover_photo.alt_description + ', ' + item.cover_photo.description
        "
      />
    </a>
    <p class="subtitle">
      <span>by</span>
      <a :href="item.user.links.portfolio" target="_blank">
        <span>{{ item.user.name }}</span>
      </a>
      <span>on Unsplash</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    item: {
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
  align-items: center;
  gap: 15px;
  list-style-type: none;
}
.photo {
  display: flex;
  justify-content: center;
}
.photo img {
  height: 250px;
  object-fit: cover;
}
.photo img:hover {
  opacity: 60%;
}
.subtitle {
  width: 250px;
  color: #fff;
  background: #000;
  text-align: center;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 1.1px;
  word-break: break-word;
}
.subtitle > *:not(:first-child) {
  padding-left: 5px;
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
