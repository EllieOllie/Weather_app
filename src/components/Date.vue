<template>
  <time class="date">{{ currentDate.date }}</time>
</template>

<script>
export default {
  data() {
    return {
      currentDate: {
        date: new Date().toLocaleDateString(),
      },
    };
  },
};
</script>
