<template>
  <time class="time">{{ currentTime.time }}</time>
</template>

<script>
export default {
  data() {
    return {
      currentTime: {
        time: new Date().toLocaleTimeString().slice(0, -3),
      },
    };
  },
};
</script>

<style scoped>
.time {
  font-size: 50px;
}
</style>
