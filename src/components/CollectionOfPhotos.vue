<template>
  <div class="photo-container">
    <a :href="item.cover_photo.links.html" target="_blank">
      <img
        class="photo"
        :src="item.cover_photo.urls.regular"
        width="250"
        alt="item.title"
        :title="item.cover_photo.alt_description"
      />
    </a>
    <p class="caption">
      <span>by</span>
      <a :href="item.user.links.portfolio" target="_blank">
        <span
          ><b>{{ item.user.name }}</b>
        </span>
      </a>
      <span>on</span>
      <span>Unsplash</span>
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
a:hover {
  color: #ccd755;
  font-weight: bold;
  transition: all 0.7s ease-out;
}
.photo {
  display: flex;
  justify-content: center;
  height: 250px;
  object-fit: cover;
}
.photo:hover {
  opacity: 60%;
}
.caption {
  width: 250px;
  background: #0e1011;
  text-align: center;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 1.1px;
  word-break: break-word;
}
.caption > *:not(:first-child) {
  padding-left: 5px;
}
</style>
