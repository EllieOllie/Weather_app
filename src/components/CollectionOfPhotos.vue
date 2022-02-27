<template>
  <div class="photos-wrapper">
    <!-- {{ item }} -->
    <li class="photo-container">
      <div class="photo">
        <a :href="item.links.html" target="_blank">
          <img :src="item.cover_photo.urls.regular" alt="item.title" />
        </a>
      </div>
      <p class="title">{{ item.title }}</p>
      <p class="subtitle">
        <span>by</span>
        <a :href="item.profile_image.medium" target="_blank">
          {{ item.user.name }}
        </a>
        <span>on</span>
        <a href="https://unsplash.com/" target="_blank">Unsplash</a>
      </p>
    </li>
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
