<template>
  <form class="search-form" @submit.prevent="checkForm">
    <div class="search__input">
      <input
        type="text"
        placeholder="Enter..."
        autofocus
        v-model.trim="inputQuery"
      />
      <p class="error" v-if="errorInput">
        Value should not be empty!<br />Please, enter only words.
      </p>
    </div>
    <button class="search__btn" type="submit" @click="setQuery">
      <img src="../assets/svg/find.svg" alt="search" />
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      inputQuery: "",
      errorInput: false,
    };
  },
  methods: {
    checkForm() {
      !this.inputQuery.length
        ? (this.errorInput = true)
        : (this.errorInput = false);
    },
    setQuery() {
      this.$emit("getPhotosCollection", this.inputQuery);
      this.inputQuery = "";
    },
  },
};
</script>

<style scoped>
.search-form {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.search__input {
  display: flex;
  flex-direction: column;
}
input {
  border-color: #ccd755;
}
.search__btn {
  height: 40px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid #0e1011;
  border-radius: 8px;
  cursor: pointer;
}
.search__btn:hover {
  background-color: #ccd755;
  transition: all 0.7s ease-in-out;
}
.search__btn:active {
  border: 2px solid #ccd755;
  transform: scale(0.95);
  box-shadow: 2px 2px 10px #0e1011;
  transition: all 0.7s ease-in-out;
}
.search__btn img {
  width: 36px;
  padding: 2px 4px;
}
.error {
  color: #0e1011;
  text-align: center;
  font-size: 14px;
}
</style>
