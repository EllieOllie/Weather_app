<template>
  <div class="container">
    <div class="search-form">
      <form @submit.prevent="getQuery">
        <input
          type="text"
          placeholder="Enter a city..."
          autofocus
          autocomplete="on"
          v-model="inputQuery"
        />
      </form>
      <button
        class="search-btn"
        v-if="inputQuery !== ''"
        @click.prevent="getQuery"
      >
        <img src="../assets/find-location.svg" alt="search" />
      </button>
    </div>
    <p class="error" v-if="errorCityFound">City not found!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorCityFound: false,
      inputQuery: "",
    };
  },
  methods: {
    getQuery() {
      this.$emit("getWeather", this.inputQuery);
      this.inputQuery = "";
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-form {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}
input {
  border-color: #071d2c;
}
.search-btn {
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid #071d2c;
  border-radius: 8px;
  cursor: pointer;
}
.search-btn:hover {
  background-color: #ffa400;
  transition: all 0.7s ease-in-out;
}
.search-btn:active {
  border: 2px solid #ffa400;
  transform: scale(0.95);
  box-shadow: 2px 2px 10px #071d2c;
  transition: all 0.7s ease-in-out;
}
.search-btn img {
  width: 36px;
  padding: 2px 4px;
}
.error {
  margin-bottom: 5px;
  font-size: 16px;
}
</style>
