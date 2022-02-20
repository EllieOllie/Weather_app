<template>
  <header class="local-info">
    <UserLocation />
    <Time />
    <Date />
  </header>
</template>

<script>
import UserLocation from "@/components/UserLocation";
import Time from "@/components/Time";
import Date from "@/components/Date";

export default {
  components: {
    UserLocation,
    Time,
    Date,
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
</style>
