<template>
  <header class="local-info">
    <UserLocation />
    <time class="time">{{ getCurrentTime }}</time>
    <time class="date">{{ getCurrentDate }}</time>
  </header>
</template>

<script>
import UserLocation from "@/components/UserLocation";

export default {
  components: {
    UserLocation,
  },
  computed: {
    getCurrentTime() {
      return new Date().toLocaleTimeString().slice(0, -3);
    },
    getCurrentDate() {
      return new Date().toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.local-info {
  min-height: 70px;
  margin: 0 auto 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 25px;
  font-size: 22px;
  letter-spacing: 2px;
}
.time {
  font-size: 50px;
}
</style>
