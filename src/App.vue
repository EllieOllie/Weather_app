<template>
  <div v-cloak>
    <WeatherToday />
  </div>
</template>

<script>
import WeatherToday from "@/views/WeatherToday";
export default {
  components: {
    WeatherToday,
  },
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
